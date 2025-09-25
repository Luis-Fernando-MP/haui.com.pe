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
    logo: '/assets/work-experience/grafica-Concepcion.webp',
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
