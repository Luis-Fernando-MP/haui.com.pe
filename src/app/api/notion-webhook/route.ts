import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    console.log(JSON.stringify(payload, null, 2))

    if (payload.verification_token) return NextResponse.json({ ok: true })
    if (payload.type !== 'comment.created') return NextResponse.json({ ok: true })

    const ownerId = process.env.NOTION_OWNER_ID
    const authorId = payload.authors?.[0]?.id as string | undefined
    if (!ownerId || authorId !== ownerId) return NextResponse.json({ ok: true })

    const commentId = payload.entity?.id as string | undefined
    const pageId = payload.data?.page_id as string | undefined
    if (!commentId || !pageId) return NextResponse.json({ error: 'missing ids' }, { status: 400 })

    const token = process.env.NOTION_TOKEN
    const deployHook = process.env.DEPLOY_VERCEL_HOOK
    if (!token || !deployHook) return NextResponse.json({ error: 'env missing' }, { status: 500 })

    const notion = new Client({ auth: token })
    const { results } = await notion.comments.list({ block_id: pageId })
    const comment = results.find(c => c.id === commentId)
    if (!comment) return NextResponse.json({ error: 'comment not found' }, { status: 404 })
    if (comment.created_by?.id !== ownerId) return NextResponse.json({ ok: true })

    const text = comment.rich_text
      .map(t => t.plain_text)
      .join('')
      .trim()
      .toUpperCase()
    if (!text.includes('DEPLOY')) return NextResponse.json({ ok: true })

    const res = await fetch(deployHook, { method: 'POST' })
    console.log('response deploy', res)
    if (!res.ok) return NextResponse.json({ error: 'deploy failed' }, { status: 502 })

    await notion.comments.create({
      parent: { page_id: pageId },
      discussion_id: comment.discussion_id,
      rich_text: [
        {
          type: 'text',
          text: { content: '🚀 Deploy disparado en Vercel — build en camino.' }
        }
      ]
    })

    return NextResponse.json({ ok: true, deployed: true })
  } catch {
    return NextResponse.json({ error: 'error' }, { status: 500 })
  }
}
