export type TechName = (typeof technologies)[number]['name']
export type TechProps = (typeof technologies)[number]

export const technologies = [
  {
    name: 'NextJs',
    src: '/assets/code/nextjs.webp',
    level: 'Aprendiendo',
    color: '#fff',
    categories: ['framework'],
    stack: ['fullstack'],
    favoriteFor: ['frontend'],
    notionPage: 'https://www.notion.so/mis-apuntes-nextjs-abc123'
  },
  {
    name: 'AstroJs',
    src: '/assets/code/astro.webp',
    level: 'Incursionando',
    color: '#E33A91',
    categories: ['framework'],
    stack: ['frontend']
  },
  {
    name: 'ReactJs',
    src: '/assets/code/react.webp',
    level: 'Aprendiendo',
    color: '#5FD4F5',
    categories: ['library'],
    stack: ['frontend'],
    notionPage: 'https://www.notion.so/react-handbook-ha234'
  },
  {
    name: 'Sass',
    src: '/assets/code/sass.webp',
    level: 'Aprendiendo',
    color: '#CD669A',
    categories: ['style', 'preprocessor'],
    stack: ['frontend'],
    favoriteFor: ['frontend']
  },
  {
    name: 'Tailwind',
    src: '/assets/code/tailwind.webp',
    level: 'Incursionando',
    color: '#007ACC',
    categories: ['style', 'framework', 'utility-first'],
    stack: ['frontend']
  },
  {
    name: 'HTML',
    src: '/assets/code/html.webp',
    level: 'Aprendiendo',
    color: '#E44D26',
    categories: ['markup', 'web-standard'],
    stack: ['frontend']
  },
  {
    name: 'CSS',
    src: '/assets/code/css.webp',
    level: 'Aprendiendo',
    color: '#842cddff',
    categories: ['style', 'web-standard'],
    stack: ['frontend']
  },
  {
    name: 'JavaScript',
    src: '/assets/code/javascript.webp',
    level: 'Aprendiendo',
    color: '#F0DB4F',
    categories: ['language', 'web-standard', 'scripting'],
    stack: ['fullstack']
  },
  {
    name: 'TypeScript',
    src: '/assets/code/typescript.webp',
    level: 'Aprendiendo',
    color: '#007ACC',
    categories: ['language', 'superset', 'scripting'],
    stack: ['fullstack'],
    favoriteFor: ['frontend', 'backend'],
    notionPage: 'https://www.notion.so/typescript-diary-834ab'
  },
  {
    name: 'Python',
    src: '/assets/code/python.webp',
    level: 'Incursionando',
    color: '#FFDF5B',
    categories: ['language', 'scripting'],
    stack: ['fullstack']
  },
  {
    name: 'Java',
    src: '/assets/code/java.webp',
    level: 'Incursionando',
    color: '#73A1FB',
    categories: ['language', 'scripting'],
    stack: ['backend']
  },
  {
    name: 'NestJs',
    src: '/assets/code/nestjs.webp',
    level: 'Aprendiendo',
    color: '#DD234D',
    categories: ['framework', 'api'],
    stack: ['backend'],
    favoriteFor: ['backend'],
    notionPage: 'https://www.notion.so/nest-api-design-92fa4'
  },
  {
    name: 'NodeJs',
    src: '/assets/code/nodejs.webp',
    level: 'Aprendiendo',
    color: '#539E43',
    categories: ['runtime'],
    stack: ['fullstack']
  },
  {
    name: 'Redis',
    src: '/assets/code/redis.webp',
    level: 'Incursionando',
    color: '#C6302B',
    categories: ['database', 'nosql'],
    stack: ['fullstack'],
    favoriteFor: ['backend']
  },
  {
    name: 'Prisma',
    src: '/assets/code/prisma.webp',
    level: 'Aprendiendo',
    color: '#04BEA4',
    categories: ['ORM', 'library'],
    stack: ['fullstack'],
    favoriteFor: ['backend', 'frontend']
  },
  {
    name: 'TypeORM',
    src: '/assets/code/typeorm.webp',
    level: 'Aprendiendo',
    color: '#fe00009d',
    categories: ['ORM', 'library'],
    stack: ['backend'],
    favoriteFor: ['backend']
  },
  {
    name: 'GraphQl',
    src: '/assets/code/graphql.webp',
    level: 'Incursionando',
    color: '#E535AB',
    categories: ['query-language'],
    stack: ['backend']
  },
  {
    name: 'MySQL',
    src: '/assets/code/mysql.webp',
    level: 'Aprendiendo',
    color: '#21748E',
    categories: ['database', 'sql'],
    stack: ['backend'],
    favoriteFor: ['backend'],
    notionPage: 'https://www.notion.so/mysql-crud-queries-1108a'
  },
  {
    name: 'PostgreSQL',
    src: '/assets/code/postgresql.webp',
    level: 'Incursionando',
    color: '#2D74AD',
    categories: ['database', 'sql'],
    stack: ['backend']
  },
  {
    name: 'Docker',
    src: '/assets/code/docker.webp',
    level: 'Incursionando',
    color: '#099CEC',
    categories: ['container', 'devops'],
    stack: ['backend'],
    favoriteFor: ['backend'],
    notionPage: 'https://www.notion.so/docker-containers-cursos-88213'
  },
  {
    name: 'Git',
    src: '/assets/code/git.webp',
    level: 'Aprendiendo',
    color: '#F05033',
    categories: ['VCS'],
    stack: ['Kit'],
    favoriteFor: ['backend', 'frontend']
  },
  {
    name: 'GitHub',
    src: '/assets/code/github.webp',
    level: 'Aprendiendo',
    color: '#343336',
    categories: ['VCS', 'hosting'],
    stack: ['Kit'],
    favoriteFor: ['frontend', 'backend']
  },
  {
    name: 'Postman',
    src: '/assets/code/postman.webp',
    level: 'Aprendiendo',
    color: '#EE6D3F',
    categories: ['testing', 'api'],
    stack: ['Kit']
  },
  {
    name: 'Vite',
    src: '/assets/code/vite.webp',
    level: 'Aprendiendo',
    color: '#BD34FE',
    categories: ['build-tool'],
    stack: ['fullstack']
  },
  {
    name: 'ViteTest',
    src: '/assets/code/vitest.webp',
    level: 'Incursionando',
    color: '#729B1B',
    categories: ['testing'],
    stack: ['backend']
  },
  {
    name: 'Figma',
    src: '/assets/code/figma.webp',
    level: 'Aprendiendo',
    color: '#F041FF',
    categories: ['design', 'editor'],
    stack: ['Kit'],
    favoriteFor: ['frontend']
  },
  {
    name: 'VSCode',
    src: '/assets/code/vscode.webp',
    level: 'Aprendiendo',
    color: '#42ABF2',
    categories: ['editor', 'IDE'],
    stack: ['Kit']
  },
  {
    name: 'Linux',
    src: '/assets/code/linux.webp',
    level: 'Incursionando',
    color: '#F0BA1E',
    categories: ['OS'],
    stack: ['Kit']
  },
  {
    name: 'Scrum',
    src: '/assets/code/scrum.webp',
    level: 'Incursionando',
    color: '#1B849A',
    categories: ['methodology'],
    stack: ['Kit']
  },
  {
    name: 'Angular',
    src: '/assets/code/angular.webp',
    level: 'Incursionando',
    color: '#DD0031',
    categories: ['framework', 'superset'],
    stack: ['frontend']
  },
  {
    name: 'AWS',
    src: '/assets/code/aws.webp',
    level: 'Incursionando',
    color: '#FF9900',
    categories: ['devops', 'cloud'],
    stack: ['Kit']
  },
  {
    name: 'Bootstrap',
    src: '/assets/code/bootstrap.webp',
    level: 'Incursionando',
    color: '#7952B3',
    categories: ['framework', 'style'],
    stack: ['frontend']
  },
  {
    name: 'Bulma',
    src: '/assets/code/bulma.webp',
    level: 'Incursionando',
    color: '#00D1B2',
    categories: ['framework', 'style'],
    stack: ['frontend']
  },
  {
    name: 'Bun',
    src: '/assets/code/bun.webp',
    level: 'Incursionando',
    color: '#FABBD1',
    categories: ['runtime'],
    stack: ['backend']
  },
  {
    name: 'Cloudflare',
    src: '/assets/code/cloudflare.webp',
    level: 'Incursionando',
    color: '#F38020',
    categories: ['devops', 'cloud'],
    stack: ['Kit']
  },
  {
    name: 'Firebase',
    src: '/assets/code/firebase.webp',
    level: 'Incursionando',
    color: '#FFCA28',
    categories: ['database', 'nosql'],
    stack: ['fullstack']
  },
  {
    name: 'Hostinger',
    src: '/assets/code/hostinger.webp',
    level: 'Incursionando',
    color: '#983cf4',
    categories: ['devops', 'hosting', 'cloud'],
    stack: ['Kit']
  },
  {
    name: 'MongoDB',
    src: '/assets/code/mongodb.webp',
    level: 'Incursionando',
    color: '#4DB33D',
    categories: ['database', 'nosql'],
    stack: ['backend']
  },
  {
    name: 'Notion',
    src: '/assets/code/notion.webp',
    level: 'Aprendiendo',
    color: '#000000',
    categories: ['editor'],
    stack: ['Kit']
  },
  {
    name: 'PHP',
    src: '/assets/code/php.webp',
    level: 'Incursionando',
    color: '#777BB3',
    categories: ['language', 'scripting'],
    stack: ['backend']
  },
  {
    name: 'Portainer',
    src: '/assets/code/portainer.webp',
    level: 'Incursionando',
    color: '#2477FF',
    categories: ['devops', 'container'],
    stack: ['Kit']
  },
  {
    name: 'Supabase',
    src: '/assets/code/supabase.webp',
    level: 'Incursionando',
    color: '#3ECF8E',
    categories: ['database', 'sql'],
    stack: ['fullstack']
  },
  {
    name: 'Skeleton',
    src: '/assets/code/skeleton.webp',
    level: 'Incursionando',
    color: '#fff',
    categories: ['framework', 'style'],
    stack: ['frontend']
  },
  {
    name: 'Termius',
    src: '/assets/code/termius.webp',
    level: 'Incursionando',
    color: '#267CCA',
    categories: ['devops'],
    stack: ['Kit']
  },
  {
    name: 'Vivaldi',
    src: '/assets/code/vivaldi.webp',
    level: 'Incursionando',
    color: '#EF3939',
    categories: ['editor', 'browser'],
    stack: ['Kit']
  },
  {
    name: 'Cursor',
    src: '/assets/code/cursor.webp',
    level: 'Incursionando',
    color: '#fff',
    categories: ['editor', 'IDE'],
    stack: ['Kit']
  },
  {
    name: 'Vercel',
    src: '/assets/code/vercel.webp',
    level: 'Incursionando',
    color: '#fff',
    categories: ['devops', 'cloud', 'hosting'],
    stack: ['Kit']
  },
  {
    name: 'Beekeeper',
    src: '/assets/code/beekeeper.webp',
    level: 'Aprendiendo',
    color: '#E0C03A',
    categories: ['IDE', 'editor'],
    stack: ['Kit']
  },
  {
    name: 'phpMyAdmin',
    src: '/assets/code/phpMyAdmin.webp',
    level: 'Aprendiendo',
    color: '#F99C0E',
    categories: ['IDE', 'editor'],
    stack: ['Kit']
  },
  {
    name: 'MySQL Workbench',
    src: '/assets/code/workbench.webp',
    level: 'Aprendiendo',
    color: '#25567C',
    categories: ['IDE', 'database', 'sql'],
    stack: ['Kit']
  },
  {
    name: 'Microsoft PowerPoint',
    src: '/assets/code/powerPoint.webp',
    level: 'Aprendiendo',
    color: '#D65130',
    categories: ['presentation'],
    stack: ['Kit']
  },
  {
    name: 'Microsoft Word',
    src: '/assets/code/word.webp',
    level: 'Aprendiendo',
    color: '#1759BB',
    categories: ['presentation'],
    stack: ['Kit']
  },
  {
    name: 'Microsoft Excel',
    src: '/assets/code/excel.webp',
    level: 'Aprendiendo',
    color: '#1DA364',
    categories: ['spreadsheet'],
    stack: ['Kit']
  },
  {
    name: 'WordPress',
    src: '/assets/code/wordPress.webp',
    level: 'Aprendiendo',
    color: '#0D8EBF',
    categories: ['CMS', 'hosting'],
    stack: ['frontend']
  }
] as const
