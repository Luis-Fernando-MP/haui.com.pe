/**
 * Ejecuta async mappers con un tope de concurrencia (evita saturar FS/red en Windows).
 */
export async function mapPool<T, R>(items: T[], concurrency: number, mapper: (item: T, index: number) => Promise<R>) {
  if (items.length === 0) return [] as R[]

  const results = new Array<R>(items.length)
  let next = 0
  const workers = Math.min(Math.max(1, concurrency), items.length)

  await Promise.all(
    Array.from({ length: workers }, async () => {
      while (true) {
        const index = next++
        if (index >= items.length) return
        results[index] = await mapper(items[index], index)
      }
    })
  )

  return results
}
