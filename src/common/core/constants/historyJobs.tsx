import { TechName } from './technologies'

export type HistoryJob = {
  name: string
  logo: string
  position: string
  period: string
  year: string
  usedTools: TechName[]

  websiteUrl: string
  facebookUrl?: string
  externalUrl?: string

  Activities: React.ReactNode
  Extra: React.ReactNode
}

export const HISTORY_JOBS: HistoryJob[] = [
  {
    name: 'Bluepoint AI S.A.C.S.',
    logo: '/assets/work-experience/bluepoint_ai.webp',
    position: 'Ingeniero de software',
    period: 'Mar 2025 — Actualidad',
    year: '2026',
    usedTools: [
      'NextJs',
      'TypeScript',
      'ReactJs',
      'Tailwind',
      'NestJs',
      'Prisma',
      'PostgreSQL',
      'Docker',
      'Cloudflare',
      'GitHub',
      'Git',
      'Cursor',
      'NodeJs'
    ],

    websiteUrl: 'https://bluepoint.ai/',
    externalUrl: 'https://bluepoint.ai/nosotros/',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong> Bluepoint AI (Miraflores, Lima) tiene más de <time dateTime='2011'>15 años</time>{' '}
          desarrollando soluciones de <strong>inteligencia artificial</strong>, <strong>machine learning</strong> y agentes
          cognitivos para empresas en Perú y Latinoamérica. Los productos en los que participo están orientados a{' '}
          <strong>retail</strong> y <strong>manufactura</strong>, con volúmenes de datos muy altos.
        </li>
        <li>
          <strong>Mi experiencia:</strong> Me siento muy a gusto en Bluepoint. Mi día a día está más centrado en el{' '}
          <strong>frontend</strong> —que la aplicación se sienta clara y usable para el cliente—, pero también entro al backend, a
          microservicios y a revisar que los datos cuadren cuando toca. Al inicio no me costó tanto integrarme con el equipo; lo
          que sí me demandó fue entender cómo está armada toda la información y cómo se conecta la aplicación completa. Todavía
          hay módulos que voy descubriendo, pero ya manejo varios con seguridad. Acá aprendí de verdad lo que pesa la{' '}
          <strong>puntualidad</strong> (un minuto cuenta) y la <strong>responsabilidad</strong>: si te comprometes, cumples, y si
          no se pudo, se explica con claridad. También me marcaron mucho la cultura de <strong>iniciativa</strong>: si tienes una
          idea, plásmala; si falla, se entiende y se corrige, lo importante es atreverse. El equipo es unido, el líder técnico
          domina el sistema y el negocio, y siempre siento que puedo preguntar sin miedo. Me gusta mucho trabajar en físico —
          hojas, rayones, gráficos— y las reuniones con lápiz y papel; como dicen, las palabras se pierden más rápido en la mente
          que en la hoja. Me retan a crecer no solo como programador, sino a <strong>entender el negocio</strong>. Por eso sigo
          aquí: me siento cómodo, apoyado y retado a la vez, y de momento no busco cambiar.
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          Desarrollo de interfaces avanzadas con <strong>Next.js</strong>, monorepos y micro frontends.
        </li>
        <li>
          Implementación de comunicación en tiempo real con <strong>WebSockets</strong>, <strong>SSE</strong>, APIs{' '}
          <abbr title='Representational State Transfer'>REST</abbr>, <strong>Web Workers</strong> (Comlink) y{' '}
          <strong>Broadcast Channel</strong>.
        </li>
        <li>
          Optimización de renderizados pesados mediante virtualización de componentes, caching y gestión de estado con{' '}
          <strong>Zustand</strong>.
        </li>
        <li>
          Manejo de datos masivos y tablas complejas utilizando <strong>React Query</strong>, <strong>React Table</strong>,{' '}
          <strong>Immer</strong>, <strong>Apache Arrow</strong> y compresión <strong>Deflate</strong>.
        </li>
        <li>
          Construcción de sistemas de UI y componentes con <strong>Tailwind CSS</strong>, <strong>shadcn/ui</strong>,{' '}
          <strong>Storybook</strong> y <strong>Turbopack</strong>.
        </li>
        <li>
          Creación de microservicios con <strong>NestJS</strong>, <strong>Prisma ORM</strong>, <strong>Swagger</strong>,{' '}
          <strong>WebSockets</strong> y colas con <strong>p-queue</strong>.
        </li>
        <li>
          Administración de bases de datos <strong>PostgreSQL</strong> con <strong>DBeaver</strong> y <strong>Prisma</strong>.
        </li>
        <li>
          Integración de servicios cloud para assets y seguridad con <strong>Cloudinary</strong> y <strong>Cloudflare</strong>.
        </li>
        <li>
          Automatización de flujos <abbr title='Continuous Integration / Continuous Delivery'>CI/CD</abbr> con{' '}
          <strong>GitHub Actions</strong> y contenedorización con <strong>Docker</strong>.
        </li>
        <li>
          Escaneo de vulnerabilidades y seguridad de código con <strong>Trivy</strong>.
        </li>
        <li>
          Uso de herramientas de IA, agentes, Specs y Skills con <strong>Claude</strong>, <strong>Cursor</strong>,{' '}
          <strong>MiniMax</strong>, <strong>Trae</strong> y <strong>OpenCode</strong>.
        </li>
      </>
    )
  },
  {
    name: 'Fragote Software Factory S.A.C.',
    logo: '/assets/work-experience/fragote.webp',
    position: 'Ingeniero de software',
    period: 'Dic 2024 — Mar 2025',
    year: '2025',
    usedTools: ['NextJs', 'TypeScript', 'ReactJs', 'Docker', 'GitHub', 'Git', 'Cursor', 'NodeJs'],

    websiteUrl: 'https://fragote.com/',
    externalUrl: 'https://fragote.com/en/',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong> FraGoTe Software Factory es una fábrica de software en Lima enfocada en desarrollo a
          medida, MVPs, aplicaciones web y móviles, integraciones e inteligencia artificial. Trabajan con metodologías ágiles y
          partners empresariales; ahí participé en el proyecto operativo de la mina de <strong>Ferreyros</strong>.
        </li>
        <li>
          <strong>Mi experiencia:</strong> En Fragote me sentí parte de un equipo que de verdad se compromete. Cubría{' '}
          <strong>frontend y backend</strong>: la pista 3D con <strong>Three.js</strong> / <strong>React Three Fiber</strong> y el
          backend que recibía e integraba la data de Ferreyros. Había presión —como en cualquier entrega importante—, pero el
          ambiente era cordial y me llevé buenos amigos. Me marcó mucho ver cómo el equipo se quedaba a rematar cuando hacía
          falta, y eso me empujó a <strong>dar un poco más</strong> de mí para sacar el proyecto adelante. También guardo con
          cariño las explicaciones del líder: gráficos, lluvia de ideas y espacio para preguntar hasta que a todos nos quedara
          claro. Fragote fue una etapa bonita; me sentí cómodo, apoyado y con ganas de aportar. No tengo nada que omitir ni
          suavizar: me gustó de verdad.
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          Desarrollo de aplicaciones complejas en <strong>Next.js</strong> con integración e interactividad 3D utilizando{' '}
          <strong>Three.js</strong> y <strong>React Three Fiber</strong>.
        </li>
        <li>
          Administración de bases de datos <strong>SQL Server</strong> mediante <strong>Azure Data Studio</strong> y{' '}
          <strong>TablePlus</strong>, procesando archivos <strong>Parquet</strong>.
        </li>
        <li>
          Construcción de pipelines <abbr title='Continuous Integration / Continuous Delivery'>CI/CD</abbr> automatizados con{' '}
          <strong>GitHub Actions</strong> y contenedorización con <strong>Docker</strong>.
        </li>
        <li>
          Implementación de autenticación segura con <strong>Better Auth</strong> y gestión de sesiones por inactividad con{' '}
          <strong>Idle.js</strong>.
        </li>
        <li>
          Desarrollo de backend en <strong>Next.js</strong> integrando <strong>WebSockets</strong>, APIs{' '}
          <abbr title='Representational State Transfer'>REST</abbr>, <strong>Web Workers</strong> y{' '}
          <strong>Broadcast Channel</strong> para la sincronización en tiempo real de datos y vistas de la mina de{' '}
          <strong>Ferreyros</strong>.
        </li>
        <li>
          Uso de herramientas asistidas por IA como <strong>Kiro</strong> y <strong>Cursor</strong> para la aceleración del
          desarrollo y debugging.
        </li>
        <li>
          Gestión de sprints, tareas y colaboración de equipo mediante <strong>Makaha</strong>, <strong>GitLab</strong>,{' '}
          <strong>Slack</strong> y <strong>Microsoft Teams</strong>.
        </li>
      </>
    )
  },
  {
    name: 'LEXIA LEGALTECH S.A.C.',
    logo: '/assets/work-experience/lexia.webp',
    position: 'Ingeniero de software',
    period: 'Oct 2024 — Nov 2024',
    year: '2024',
    usedTools: [
      'NextJs',
      'TypeScript',
      'ReactJs',
      'PostgreSQL',
      'Beekeeper',
      'Docker',
      'Cloudflare',
      'AWS',
      'GitHub',
      'Git',
      'GraphQl',
      'Cursor'
    ],

    websiteUrl: 'https://www.lexia.lat',
    externalUrl: 'https://www.lexia.lat/about',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong> Lexia Legaltech desarrolla <strong>LexIA</strong>, una plataforma{' '}
          <abbr title='Software as a Service'>SaaS</abbr> de asistente legal con IA para abogados, estudiantes y equipos
          jurídicos. Apoya consultas y borradores sin reemplazar la asesoría legal.
        </li>
        <li>
          <strong>Mi experiencia:</strong> Llegué a LexIA cerca del <strong>MVP 2</strong>, cuando tocaba modernizar el sistema:
          roles, espacios de trabajo, créditos, pagos, agentes y módulos de IA. En alrededor de dos meses armamos unos{' '}
          <strong>10–12 módulos</strong>; aporté en streaming de IA, pasarelas de pago, despliegues y la base serverless. Al
          inicio el ambiente se sentía un poco frío, pero con el tiempo se volvió más cercano y colaborativo, con buen apoyo de
          los líderes. Ahí aprendí de verdad a trabajar bajo la <strong>presión de una startup</strong> que debe entregar: ritmo
          alto, fallos que se corrigen rápido y foco en sacar producto. Cuando llegó el <strong>MVP 3</strong> con los primeros
          clientes, el modo pasó de crear sin pausa a mantenimiento y soporte, y se sintió más ameno. Me gustaba LexIA, aprendí
          mucho y me llevo una etapa intensa pero valiosa.
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          Desarrollo de plataformas <abbr title='Software as a Service'>SaaS</abbr> avanzadas en <strong>Next.js</strong> para
          módulos integrados con IA, gestión de caché y sesiones con <strong>Better Auth</strong>, <strong>React Query</strong> y{' '}
          <strong>Apollo Client</strong>.
        </li>
        <li>
          Administración de bases de datos relacionales <strong>PostgreSQL</strong> mediante <strong>DBeaver</strong> y{' '}
          <strong>Beekeeper Studio</strong>.
        </li>
        <li>
          Construcción de canalizaciones <abbr title='Continuous Integration / Continuous Delivery'>CI/CD</abbr> con{' '}
          <strong>GitHub Actions</strong>, <strong>Docker</strong>, <strong>Cloudflare Workers</strong>,{' '}
          <strong>Cloudflare Pages</strong>, <strong>Cloudflare D1</strong> y <strong>Cloudflare Hyperdrive</strong>.
        </li>
        <li>
          Creación de microservicios backend serverless en <strong>Cloudflare Workers</strong>, implementando middlewares y
          plugins de integración con <strong>Polar Client</strong> y <strong>Better Auth</strong>.
        </li>
        <li>
          Gestión de infraestructura e instancias en <abbr title='Amazon Web Services'>AWS</abbr> junto con despliegues de workers
          en <strong>Cloudflare</strong>.
        </li>
        <li>
          Desarrollo de microservicios backend ultrarrápidos con <strong>Hono</strong>, <strong>WebSockets</strong> y{' '}
          <strong>SSE</strong> para streaming en módulos de IA.
        </li>
        <li>
          Integración de pasarelas de pago y monetización mediante <strong>Polar.sh</strong> y <strong>Better Auth</strong>.
        </li>
      </>
    )
  },
  {
    name: 'DevDatep Consulting E.I.R.L',
    logo: '/assets/work-experience/devdatep-consulting.webp',
    position: 'Web Database Intern & Web Development Leader',
    period: 'Jun 2024 — Sep 2024',
    year: '2024',
    usedTools: [
      'MySQL',
      'AWS',
      'Git',
      'ReactJs',
      'TypeScript',
      'Beekeeper',
      'phpMyAdmin',
      'MySQL Workbench',
      'Termius',
      'HTML',
      'Tailwind',
      'GitHub',
      'Hostinger',
      'JavaScript',
      'PHP'
    ],

    websiteUrl: 'https://devdatep.com',
    facebookUrl: 'https://www.facebook.com/DevdatepConsulting/',
    externalUrl: 'https://www.datosperu.org/empresa-devdatep-consulting-eirl-20609480905.php',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong> Es una agencia de consultoría y diseño fundada en <time dateTime='2022'>2022</time>,
          especializada en el desarrollo software a medida, diseño web y soluciones digitales personalizadas.
        </li>
        <li>
          <strong>Mi experiencia en: </strong>DevDatep Consulting fue estimulante y desafiante. Agradezco haber sido parte de un
          equipo de trabajo tan profesional y comprometido. Gracias a esta oportunidad, no solo pude aplicar mis conocimientos en
          un entorno real, sino también aprender nuevas tecnologías y metodologías que me han permitido crecer tanto profesional
          como personalmente.
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          <strong>Bases de datos: </strong>
          Gestioné bases de datos relacionales, incluyendo la creación, mantenimiento, eliminación y modificación de tablas.
          Además, implementé <strong>procedimientos almacenados</strong>, <strong>triggers</strong> y{' '}
          <strong>
            funciones{' '}
            <abbr title='Structured Query Language'>
              <em>SQL</em>
            </abbr>
          </strong>
          {''}, junto con otros elementos solicitados por el área de backend para optimizar procesos internos.
        </li>
        <li>
          <strong>Infraestructura y control de versiones: </strong>
          <strong>
            Gestioné el servidor{' '}
            <abbr title='Amazon Web Services'>
              <em>AWS</em>
            </abbr>
          </strong>{' '}
          de la empresa, enfocándome en{' '}
          <strong>
            <abbr title='Identity and Access Management'>IAM</abbr>
          </strong>{' '}
          y{' '}
          <strong>
            <abbr title='Elastic Compute Cloud'>EC2</abbr>
          </strong>
          {''}. <strong>Monitoreé y resolví errores</strong>, además <strong>realicé despliegues de los proyectos</strong> desde{' '}
          <em>GitHub</em> al hosting. Asimismo, <strong>revisé y unifiqué los cambios del equipo de frontend</strong> para
          garantizar una integración fluida y sin errores.
        </li>
        <li>
          <strong>Metodologías ágiles: </strong>
          <strong>Propuse mejorar el flujo tradicional</strong> sugiriendo <em>Scrum</em>, aunque finalmente se adoptó{' '}
          <em>Kanban</em> para la gestión de procedimientos y reuniones internas. Colaboré estrechamente con el líder de
          desarrollo web y otras áreas para implementar correctamente esta metodología.
        </li>
        <li>
          <strong>Herramientas</strong>: Para la administración y gestión de bases de datos <strong>MySQL</strong> utilicé{' '}
          <strong>Beekeeper Studio</strong>, <strong>phpMyAdmin</strong> y <strong>MySQL Workbench</strong>. Por otro lado, manejé
          el servidor de{' '}
          <abbr title='Amazon Web Services'>
            <em>AWS</em>
          </abbr>{' '}
          <strong>
            <abbr title='Amazon Elastic Compute Cloud'>EC2</abbr>
          </strong>{' '}
          a través de <strong>Termius</strong> (accediendo vía <abbr title='Secure Shell Protocol'>SSH</abbr>), para gestionar
          archivos y llevar a cabo despliegues. Además, empleé <strong>Git</strong> y <strong>GitHub</strong> para el control de
          versiones, lo que facilitó la coordinación con el equipo de frontend y aseguró un despliegue correcto de los proyectos
          en el hosting de <em>Hostinger</em>.
        </li>
      </>
    )
  },
  {
    name: 'AVS Consultores Informáticos',
    logo: '/assets/work-experience/avs-consultores.webp',
    position: 'Web Development Intern',
    period: 'Abr 2023 — Oct 2023',
    year: '2023',
    usedTools: ['JavaScript', 'HTML', 'CSS', 'ReactJs', 'PHP', 'NestJs', 'WordPress'],

    websiteUrl: 'http://www.avsconsultores.com',
    facebookUrl: 'https://www.facebook.com/avsconsultoresinformaticos.edu.pe/',
    externalUrl: 'https://noticiashuancayo.com/avs-consultores-inform%C3%A1ticos-huancayo-analistas-de-sistemas',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong>
          Es una empresa peruana ubicada en Huancayo,{' '}
          <strong>especializada en ofrecer soluciones tecnológicas personalizadas</strong> que se adaptan a las necesidades
          específicas de cada cliente. Brinda servicios de <strong>consultoría en sistemas de información</strong>,{' '}
          <strong>desarrollo de software a medida</strong>, implementación y soporte técnico de plataformas informáticas, así como{' '}
          <strong>auditorías tecnológicas</strong> para mejorar la eficiencia de los negocios.
        </li>
        <li>
          <strong>Mi experiencia en: </strong>AVS Consultores Informáticos fue gratificante, ya que me permitió adentrarme en el
          mundo laboral tecnológico y desarrollar habilidades técnicas y profesionales que hoy forman parte de mi base sólida en
          este campo. Agradezco la oportunidad de haber compartido estadía con mis compañeros y de haber formado parte de la
          empresa.
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          <strong>Mantenimiento de plataformas internas: </strong>
          Mejore dos de las plataformas clave para la empresa. La primera fue <strong>Alhen SAC</strong>, donde colaboré en
          optimizar funcionalidades e implementar nuevas características para la página. La segunda se basó en mejoras
          incrementales del software de <strong>Casa Verde</strong>, para lo cual construí nuevos componentes y realicé
          refactorizaciones en el código.
        </li>
        <li>
          <strong>Herramientas</strong>: Durante mi estadía, utilicé <strong>JavaScript</strong>,{' '}
          <strong>
            <abbr title='HyperText Markup Language'>HTML</abbr>
          </strong>
          ,{' '}
          <strong>
            <abbr title='Cascading Style Sheets'>CSS</abbr>
          </strong>{' '}
          y <strong>ReactJS</strong> para las mejoras en las páginas web, y <strong>PHP</strong> para algunos cambios en la página
          central de{' '}
          <strong>
            <abbr title='Content Management System'>WordPress</abbr>
          </strong>
          {''}. Además, <strong>propuse trabajar con monorepositorios y</strong> un backend más controlado con{' '}
          <strong>NestJS</strong>, tecnologías que luego implementaron en proyectos futuros. También utilicé{' '}
          <strong>Microsoft Teams</strong> para coordinar reuniones virtuales y gestionar el calendario.
        </li>
      </>
    )
  },
  {
    name: 'Municipalidad Distrital de San Agustín de Cajas',
    logo: '/assets/work-experience/municipalidad-cajas.webp',
    position: 'Computer Technical Assistant',
    period: 'Abr 2021 — Oct 2021',
    year: '2021',
    usedTools: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Java', 'Linux'],

    websiteUrl: 'https://munisanagustin.gob.pe/inicio',
    facebookUrl: 'https://www.facebook.com/MunicipalidadDistritalSanAgustin',
    externalUrl: 'https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=11102',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong>
          Es una institución pública ubicada en la provincia de Huancayo, región Junín, Perú. Su misión es{' '}
          <strong>promover el desarrollo sostenible del distrito</strong> mediante una gestión participativa, moderna y eficiente,
          brindando servicios de calidad a la población. Se enfoca en áreas como la <strong>agricultura</strong>, el{' '}
          <strong>turismo</strong> y la mejora de la infraestructura local, con el objetivo de mejorar la calidad de vida de sus
          habitantes.
        </li>
        <li>
          <strong>Mi experiencia en: </strong>Mi experiencia en la Municipalidad Distrital de San Agustín de Cajas fue
          enriquecedora y desafiante . Me permitió aplicar mis conocimientos técnicos en un entorno real donde el trabajo bajo
          presión era continuo. Agradezco la oportunidad de haber formado parte de un equipo comprometido y de contribuir al
          desarrollo digital de la institución.{' '}
          <strong>
            Esta vivencia me brindó una perspectiva más amplia sobre el impacto de la tecnología en el sector público.
          </strong>
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          <strong>Portal de transparencia: </strong>
          Ayudé a gestionar y organizar documentos e información importante que posteriormente fueron publicados en el portal de
          transparencia, facilitando el acceso a la información pública para la población.
        </li>
        <li>
          <strong>Mantenimiento de sistemas: </strong>
          Realicé el <strong>mantenimiento preventivo y correctivo de los sistemas operativos</strong>,{' '}
          <strong>aplicaciones</strong> y algo de <strong>infraestructura</strong> en las distintas áreas de la municipalidad,
          asegurando el buen funcionamiento de los equipos. Con el tiempo, identifiqué oportunidades para mejorar la eficiencia
          operativa mediante la implementación de sistemas operativos más ligeros en equipos informáticos antiguos. Por ello,{' '}
          <strong>
            propuse la implementación de <em>Linux Mint</em>
          </strong>{' '}
          en equipos con hardware limitado, lo cual se llevó a cabo en algunos computadores, lo que resultó en un mejor
          rendimiento de las máquinas.
        </li>
        <li>
          <strong>Herramientas</strong>: Utilicé herramientas ofimáticas como{' '}
          <strong>
            <abbr title='Microsoft Word'>Word</abbr>
          </strong>{' '}
          ,{' '}
          <strong>
            <abbr title='Microsoft PowerPoint'>PowerPoint</abbr>
          </strong>{' '}
          y{' '}
          <strong>
            <abbr title='Microsoft Excel'>Excel</abbr>
          </strong>{' '}
          para la creación y presentación de documentos, así como para el manejo de datos. Además, desarrollé pequeñas
          aplicaciones en <strong>Java</strong> para automatizar tareas y mejorar procesos solicitados.
        </li>
      </>
    )
  },
  {
    name: 'Industria Gráfica Inmaculada Concepción',
    logo: '/assets/work-experience/grafica-concepcion.webp',
    position: 'Graphic Design Intern',
    period: 'Abr 2019 — Dic 2019',
    year: '2019',
    usedTools: ['Figma', 'HTML', 'CSS', 'JavaScript'],

    websiteUrl: 'https://pe.todosnegocios.com/gr%C3%A1fica-inmaculada-concepci%C3%B3n-955-806-691',
    facebookUrl: 'https://www.facebook.com/p/Gr%C3%A1fica-Inmaculada-Concepci%C3%B3n-100063979424969/Facebook',
    externalUrl: 'https://pe.todosnegocios.com/gr%C3%A1fica-inmaculada-concepci%C3%B3n-955-806-691',

    Extra: (
      <>
        <li>
          <strong>Sobre la empresa:</strong>
          Es una empresa dedicada a ofrecer servicios de impresión y diseño gráfico en Concepción, Junín. Se especializa en la
          creación de materiales publicitarios como folletos, tarjetas de presentación, carteles y otros productos impresos
          personalizados. Fue establecida en <time dateTime='1997'>1997</time> con el estado de
          <q>persona natural con negocio</q>, actualmente destaca como uno de los referentes más confiables en la industria
          gráfica de la localidad.
        </li>
        <li>
          <strong>Mi experiencia en: </strong>Industria Gráfica Inmaculada Concepción
          <em>
            <q>fue mucho más que una simple práctica; fue un verdadero punto de partida en mi carrera profesional.</q>
          </em>{' '}
          El ambiente de trabajo, aunque tradicional, estaba lleno de una energía creativa y un sentido de familiaridad.{' '}
          <strong>
            Trabajar al lado de personas tan exigentes y comprometidas me impulsó a superarme y aprender con disciplina.
          </strong>
          Fueron los primeros en acercarme al mundo tecnológico, por lo que sentaron en mí las bases de mis habilidades actuales.
          Por eso,{' '}
          <q>
            siempre guardaré un profundo respeto y cariño por esta etapa y por quienes me guiaron,{' '}
            <em>los considero como mi primera casa profesional</em>
          </q>
          {''}, un lugar donde aprendí no solo técnicas, sino también valores y pasión por el trabajo bien hecho.
        </li>
      </>
    ),
    Activities: (
      <>
        <li>
          <strong>Diseño de materiales impresos: </strong>
          Participé en la creación de folletos, tarjetas de presentación, ilustraciones personalizadas y sellos, siguiendo los
          estándares de diseño establecidos por la empresa. Además, apoyé en la atención al cliente para comprender sus
          necesidades gráficas y ayudar a traducirlas en propuestas visuales efectivas.
        </li>
        <li>
          <strong>Herramientas</strong>: Utilicé principalmente <strong>CorelDRAW</strong>, dada su predominancia en los diseños
          preestablecidos de la empresa, pero también empleé <strong>Figma</strong> para desarrollar nuevos diseños gráficos.
          Paralelamente, diseñé una propuesta para una página web responsiva con el objetivo de ampliar la base de clientes. Para
          ello, elaboré los mockups en Figma y sugerí tecnologías como{' '}
          <strong>
            <abbr title='HyperText Markup Language'>HTML</abbr>
          </strong>
          {''},
          <strong>
            <abbr title='Cascading Style Sheets'>CSS</abbr>
          </strong>
          {''},
          <strong>
            <abbr title='JavaScript'>JavaScript</abbr>
          </strong>{' '}
          o<strong>WordPress</strong> para su implementación.
        </li>
      </>
    )
  }
]
