export type WorkLocale = "pt-BR" | "en";
export type Localized = Record<WorkLocale, string>;
export type LocalizedList = Record<WorkLocale, string[]>;

type MediaBase = { caption: Localized };

/** A still presented within the gallery sheet, with its original dimensions and framing. */
export type ImageMedia = MediaBase & {
  kind: "image";
  src: string;
  alt: Localized;
  width: number;
  height: number;
  fit?: "cover" | "contain";
};

/** Reserved slot: neutral editorial surface until approved real media is dropped in. */
export type PlaceholderMedia = MediaBase & { kind: "placeholder" };

export type WorkMedia = ImageMedia | PlaceholderMedia;

export type CaseHighlight = {
  title: Localized;
  description: Localized;
};

export type CaseStudy = {
  challenge: {
    title: Localized;
    paragraphs: LocalizedList;
  };
  solution: {
    title: Localized;
    paragraphs: LocalizedList;
    highlights?: CaseHighlight[];
  };
  impact: {
    title: Localized;
    paragraphs: LocalizedList;
  };
  scope: LocalizedList;
  confidentialityNotice?: Localized;
};

export type WorkProject = {
  /** Used in the URL (?case=slug), DOM ids and asset folder (public/work/<slug>/). */
  slug: string;
  visibility: "public" | "confidential";
  year: string;
  /** Plain-text name. Always present (accessible name, fallback when there is no wordmark). */
  name: string;
  wordmark?: { src: string; darkSrc?: string; width: number; height: number; scale?: number };
  category: Localized;
  /** One line. The listing never tells the whole story. */
  summary: Localized;
  media: WorkMedia[];
  caseStudy: CaseStudy;
};

const image = (
  slug: string,
  file: string,
  alt: Localized,
  caption: Localized,
  presentation: Pick<ImageMedia, "width" | "height" | "fit"> = { width: 1440, height: 900 }
): ImageMedia => ({
  kind: "image",
  src: `/work/${slug}/gallery/${file}.webp`,
  ...presentation,
  alt,
  caption,
});

export const projects: WorkProject[] = [
  {
    slug: "route",
    visibility: "public",
    year: "2026",
    name: "Route Security",
    wordmark: {
      src: "/work/route/route-wordmark.svg",
      darkSrc: "/work/route/route-wordmark-dark.svg",
      width: 1320,
      height: 455,
      scale: 1.3,
    },
    category: {
      "pt-BR": "Website · Experiência digital",
      en: "Website · Digital Experience",
    },
    summary: {
      "pt-BR": "Uma presença digital criada para traduzir engenharia, tecnologia e operação de segurança em uma experiência clara e marcante.",
      en: "A digital presence built to turn security engineering, technology and operations into a clear, memorable experience.",
    },
    media: [
      image(
        "route",
        "01-hero",
        {
          "pt-BR": "Hero do site da Route Security com tipografia marcante e streaks de luz sobre fundo escuro.",
          en: "Route Security website hero with bold typography and light streaks on a dark background.",
        },
        { "pt-BR": "Abertura editorial", en: "Editorial opening" }
      ),
      image(
        "route",
        "02-processo",
        {
          "pt-BR": "Seção operacional da Route Security detalhando as etapas do serviço e rigor de monitoramento.",
          en: "Route Security operational section detailing service stages and monitoring rigor.",
        },
        { "pt-BR": "Processo & Operação", en: "Process & Operation" }
      ),
      image(
        "route",
        "03-camera",
        {
          "pt-BR": "Seção Rigor Técnico da Route Security com apresentação de hardware de câmera e especificações.",
          en: "Route Security Technical Rigor section presenting camera hardware and specifications.",
        },
        { "pt-BR": "Rigor técnico", en: "Technical rigor" }
      ),
      image(
        "route",
        "04-clientes",
        {
          "pt-BR": "Seção de clientes e ecossistema de infraestrutura de monitoramento patrimonial.",
          en: "Clients section and asset monitoring infrastructure ecosystem.",
        },
        { "pt-BR": "Ecossistema & Confiança", en: "Ecosystem & Trust" }
      ),
    ],
    caseStudy: {
      challenge: {
        title: {
          "pt-BR": "O desafio de comunicar engenharia e segurança patrimonial",
          en: "The challenge of communicating engineering and physical security",
        },
        paragraphs: {
          "pt-BR": [
            "A Route Security atua no segmento de segurança e engenharia de monitoramento patrimonial de alta precisão. O setor é frequentemente marcado por apresentações institucionais genéricas, repletas de clichês visuais que não transmitem o verdadeiro rigor técnico envolvido.",
            "O objetivo foi construir uma presença digital imersiva e contemporânea que traduzisse a seriedade da operação física, os componentes de hardware dedicados e a infraestrutura tecnológica que protege condomínios e empresas.",
          ],
          en: [
            "Route Security operates in high-precision physical security and monitoring engineering. The sector is often dominated by generic corporate pages filled with visual clichés that fail to convey genuine technical rigor.",
            "The goal was to build an immersive, contemporary digital presence that translates the seriousness of on-the-ground operations, dedicated hardware components, and the technology infrastructure protecting properties and enterprises.",
          ],
        },
      },
      solution: {
        title: {
          "pt-BR": "Direção de arte precisa e engenharia de interface",
          en: "Precise art direction and interface engineering",
        },
        paragraphs: {
          "pt-BR": [
            "Criamos uma experiência que equilibra estética editorial sofisticada com detalhamento técnico profundo. A narrativa visual conduz o usuário da visão estratégica à engenharia de cada sensor e câmera.",
            "A interface explora superfícies escuras com iluminação direcional, tipografia técnica calibrada e visualizações de hardware que colocam a tecnologia proprietária em evidência sem ruídos desnecessários.",
          ],
          en: [
            "We crafted an experience balancing sophisticated editorial aesthetics with in-depth technical detail. The visual narrative guides users from strategic overview to the engineering of individual sensors and cameras.",
            "The interface leverages dark surfaces with directional lighting, calibrated technical typography, and hardware visualizations that put proprietary technology front and center without unnecessary clutter.",
          ],
        },
        highlights: [
          {
            title: { "pt-BR": "Narrativa Técnica", en: "Technical Narrative" },
            description: {
              "pt-BR": "Apresentação da esteira de monitoramento e protocolos operacionais com clareza imediata.",
              en: "Presentation of monitoring workflows and operational protocols with immediate clarity.",
            },
          },
          {
            title: { "pt-BR": "Exposição de Hardware", en: "Hardware Exhibition" },
            description: {
              "pt-BR": "Visualização explodida de componentes, sensores e arquitetura física de segurança.",
              en: "Exploded visualization of components, sensors, and physical security architecture.",
            },
          },
          {
            title: { "pt-BR": "Desempenho & Fluidez", en: "Performance & Fluidity" },
            description: {
              "pt-BR": "Construído sobre Next.js moderno com carregamento sob demanda e zero jank visual.",
              en: "Built on modern Next.js with on-demand loading and zero visual jank.",
            },
          },
        ],
      },
      impact: {
        title: {
          "pt-BR": "Autoridade imediata e percepção de valor",
          en: "Immediate authority and value perception",
        },
        paragraphs: {
          "pt-BR": [
            "O novo site estabeleceu a Route Security como referência em engenharia de segurança no mercado nacional, gerando reconhecimento imediato junto a tomadores de decisão e clientes corporativos de grande porte.",
          ],
          en: [
            "The new site established Route Security as a benchmark in security engineering across the market, driving immediate recognition among corporate decision-makers and high-value clients.",
          ],
        },
      },
      scope: {
        "pt-BR": [
          "Direção de arte & Design de interface (UX/UI)",
          "Estruturação de conteúdo e redação técnica",
          "Desenvolvimento de interface e interatividade",
          "Otimização de carregamento e performance visual",
          "Experiência adaptada para desktop e mobile",
        ],
        en: [
          "Art direction & Interface design (UX/UI)",
          "Content structuring and technical copywriting",
          "Interface development and interactivity",
          "Loading optimization and visual performance",
          "Full desktop and mobile responsive experience",
        ],
      },
    },
  },
  {
    slug: "owl",
    visibility: "public",
    year: "2026",
    name: "OWL",
    wordmark: {
      src: "/work/owl/owl-wordmark.svg",
      darkSrc: "/work/owl/owl-wordmark-dark.svg",
      width: 440,
      height: 160,
      scale: 1.15,
    },
    category: {
      "pt-BR": "Produto · Rastreamento & Telemetria",
      en: "Product · Tracking & Telemetry",
    },
    summary: {
      "pt-BR": "Software operacional e hardware para rastreamento de ativos e pessoas em tempo real com alertas perimetrais e geofences.",
      en: "Operational software and hardware for real-time asset and personnel tracking with perimeter alerts and geofences.",
    },
    media: [
      image(
        "owl",
        "01-hero",
        {
          "pt-BR": "Apresentação da plataforma OWL e visão do produto de localização em tempo real.",
          en: "OWL platform presentation and real-time location product overview.",
        },
        { "pt-BR": "Visão do produto", en: "Product overview" }
      ),
      image(
        "owl",
        "02-servico",
        {
          "pt-BR": "Interface de monitoramento em tempo real com rastreamento contínuo e zonas operacionais.",
          en: "Real-time monitoring interface with continuous tracking and operational zones.",
        },
        { "pt-BR": "Monitoramento em tempo real", en: "Real-time monitoring" }
      ),
      image(
        "owl",
        "03-tecnologia",
        {
          "pt-BR": "Seção de tecnologia e telemetria de alta frequência com precisão métrica de posicionamento.",
          en: "High-frequency technology and telemetry section with metric positioning accuracy.",
        },
        { "pt-BR": "Telemetria & Dados", en: "Telemetry & Data" }
      ),
      image(
        "owl",
        "04-hardware-anchor",
        {
          "pt-BR": "Âncora industrial UWB/BLE para posicionamento em ambientes internos de alta densidade.",
          en: "Industrial UWB/BLE anchor for positioning in high-density indoor environments.",
        },
        { "pt-BR": "Hardware · Âncora industrial", en: "Hardware · Industrial anchor" }
      ),
      image(
        "owl",
        "05-hardware-tag",
        {
          "pt-BR": "Tag de localização para rastreamento de ativos industriais e proteção de colaboradores.",
          en: "Location tag for industrial asset tracking and personnel safety.",
        },
        { "pt-BR": "Hardware · Tag de rastreamento", en: "Hardware · Tracking tag" }
      ),
    ],
    caseStudy: {
      challenge: {
        title: {
          "pt-BR": "Rastreamento métrico em ambientes industriais complexos",
          en: "Metric-accurate tracking in complex industrial environments",
        },
        paragraphs: {
          "pt-BR": [
            "Galpões de logística, fábricas e instalações de alta complexidade sofrem perdas operacionais diárias causadas por tempo excessivo gasto na localização de frotas, equipamentos críticos e controle de áreas de risco.",
            "O desafio da OWL exigia uma solução de ponta a ponta: hardware de campo resistente (âncoras e tags) comunicando-se em baixa latência com uma interface web robusta capaz de renderizar centenas de posições simultâneas sem degradação visual ou de performance.",
          ],
          en: [
            "Logistics warehouses, manufacturing plants, and high-complexity facilities face daily operational losses searching for vehicles, critical tools, and managing high-risk zones.",
            "The OWL challenge required an end-to-end solution: rugged field hardware (anchors and tags) communicating at low latency with a robust web interface capable of rendering hundreds of concurrent positions without performance degradation.",
          ],
        },
      },
      solution: {
        title: {
          "pt-BR": "Plataforma operacional web integrada ao hardware de campo",
          en: "Operational web platform integrated with field hardware",
        },
        paragraphs: {
          "pt-BR": [
            "Desenvolvemos a camada web operacional da OWL, estruturando visualizações vetoriais de mapas de alta precisão, demarcação interativa de geofences e painéis analíticos com atualização contínua.",
            "A experiência foi concebida para operadores em salas de controle: contraste calibrado para longas jornadas de trabalho, alertas sonoros e visuais discretos para violações de zona e histórico detalhado de movimentação com auditoria temporal.",
          ],
          en: [
            "We developed OWL's operational web tier, structuring high-precision vector map visualizations, interactive geofence demarcation, and analytical dashboards with continuous data streaming.",
            "The experience was engineered for control-room operators: calibrated contrast for long shifts, discrete visual and audio notifications for zone breaches, and detailed motion history with time-auditing capabilities.",
          ],
        },
        highlights: [
          {
            title: { "pt-BR": "Geofences & Alertas", en: "Geofences & Alerts" },
            description: {
              "pt-BR": "Criação vetorial de perímetros de segurança com detecção instantânea de violações.",
              en: "Vector-based security perimeter drawing with instantaneous breach detection.",
            },
          },
          {
            title: { "pt-BR": "Integração Física", en: "Physical Integration" },
            description: {
              "pt-BR": "Conexão direta com âncoras e tags UWB/BLE transmitindo telemetria em tempo real.",
              en: "Direct link with UWB/BLE anchors and tags transmitting real-time telemetry.",
            },
          },
          {
            title: { "pt-BR": "Landing Page Corporativa", en: "Corporate Landing Page" },
            description: {
              "pt-BR": "Presença pública de alta conversão para demonstração do produto e captação de clientes.",
              en: "High-conversion public presence demonstrating the product to industrial clients.",
            },
          },
        ],
      },
      impact: {
        title: {
          "pt-BR": "Eficiência e segurança operacional comprovadas",
          en: "Proven operational efficiency and workplace safety",
        },
        paragraphs: {
          "pt-BR": [
            "A solução permitiu que plantas industriais operassem com visibilidade contínua de seus ativos, reduzindo drasticamente o tempo de busca e eliminando incidentes em zonas perigosas monitoradas.",
          ],
          en: [
            "The platform gave industrial facilities continuous visibility over their assets, drastically cutting search times and preventing safety incidents in hazardous monitored zones.",
          ],
        },
      },
      scope: {
        "pt-BR": [
          "Interface web da plataforma operacional",
          "Mapas interativos, setores e zonas virtuais",
          "Identidade de produto e telas para salas de controle",
          "Website institucional e páginas de captação",
          "Painel de telemetria e rastreamento em tempo real",
        ],
        en: [
          "Operational web platform interface",
          "Interactive maps, sectors, and virtual zones",
          "Product identity and control-room screens",
          "Corporate website and acquisition pages",
          "Real-time telemetry and tracking dashboard",
        ],
      },
    },
  },
  {
    slug: "psicologia",
    visibility: "public",
    year: "2026",
    name: "Acompanhamento Terapêutico",
    category: {
      "pt-BR": "Software operacional · Plataforma clínica",
      en: "Operational software · Clinical platform",
    },
    summary: {
      "pt-BR": "Plataforma privada de evolução clínica com trilha 3D lúdica, relatórios contextuais e diálogo seguro entre psicóloga e famílias.",
      en: "Private clinical progress platform featuring a playful 3D journey, contextual reports, and secure dialogue between therapist and families.",
    },
    media: [
      image(
        "psicologia",
        "01-trilha-3d",
        {
          "pt-BR": "Trilha terapêutica tridimensional com ilhas flutuantes em camadas e navegação de câmera suave.",
          en: "Three-dimensional therapeutic trail with layered floating islands and smooth rail camera navigation.",
        },
        { "pt-BR": "Trilha terapêutica 3D", en: "3D therapeutic journey" }
      ),
      image(
        "psicologia",
        "02-relatorio-mensal",
        {
          "pt-BR": "Painel de relatório mensal com observações clínicas, destaques da etapa e diálogo contextual com a família.",
          en: "Monthly report panel with clinical observations, phase highlights, and contextual family dialogue.",
        },
        { "pt-BR": "Relatório mensal & Diálogo", en: "Monthly report & Dialogue" }
      ),
      image(
        "psicologia",
        "03-alternancia-filhos",
        {
          "pt-BR": "Gestão multifamiliar com alternância fluida entre múltiplos filhos e histórico independente de evolução.",
          en: "Multi-child family management with seamless switching and independent therapeutic history.",
        },
        { "pt-BR": "Gestão multifamiliar", en: "Multi-child family view" }
      ),
      image(
        "psicologia",
        "04-avatar-customizer",
        {
          "pt-BR": "Editor tridimensional de avatares com renderização em tempo real de traços, penteados e roupas infantis.",
          en: "3D avatar editor with real-time rendering of facial features, hairstyles, and children's clothing.",
        },
        { "pt-BR": "Personalização de avatar 3D", en: "3D avatar customizer" }
      ),
      image(
        "psicologia",
        "05-catalogo-avatares",
        {
          "pt-BR": "Design system e catálogo de avatares com suporte a ampla diversidade e combinações não estereotipadas.",
          en: "Avatar design system and catalog supporting broad diversity and non-stereotypical combinations.",
        },
        { "pt-BR": "Sistema de avatares", en: "Avatar design system" }
      ),
    ],
    caseStudy: {
      challenge: {
        title: {
          "pt-BR": "Aproximar famílias da terapia sem transformar evolução em cobrança",
          en: "Connecting families to therapy without turning progress into pressure",
        },
        paragraphs: {
          "pt-BR": [
            "O acompanhamento terapêutico infantil depende de cooperação constante entre a psicóloga e os responsáveis familiares. Tradicionalmente, essa ponte ocorre através de conversas esparsas ou relatórios em papel que não engajam os pais nem respeitam o ritmo de desenvolvimento da criança.",
            "O desafio era construir uma plataforma digital privada para a psicóloga Andressa Novaes que tornasse a evolução visível, acolhedora e participativa, com uma premissa fundamental de produto: não transformar a terapia em um jogo com 'linha de chegada' ou competição.",
          ],
          en: [
            "Children's therapeutic progress relies on constant collaboration between therapist and families. Traditionally, this bridge happens through sparse catch-ups or paper reports that fail to engage parents or respect the child's natural pace.",
            "The challenge was to build a private digital platform for psychologist Andressa Novaes that makes clinical progress visible, warm, and collaborative, with a core product principle: never turning therapy into a competitive gamified race with a 'finish line'.",
          ],
        },
      },
      solution: {
        title: {
          "pt-BR": "Trilha 3D espacial e comunicação contextual segura",
          en: "Spatial 3D journey and secure contextual communication",
        },
        paragraphs: {
          "pt-BR": [
            "Projetamos uma interface onde cada mês concluído se torna uma ilha orgânica flutuante em um mar de nuvens, interligada por pedras pelas quais o avatar personalizado da criança caminha suavemente. O cenário adapta-se dinamicamente ao período do dia e às estações.",
            "A experiência oferece relatórios mensais estruturados, destaques comportamentais, download de documentos auditados e uma área de diálogo contextual vinculada a cada relatório, permitindo que a família tire dúvidas diretamente com a psicóloga.",
          ],
          en: [
            "We designed an interface where each completed month becomes a floating organic island above clouds, connected by stepping stones along which the child's customized avatar gently walks. The environment dynamically adapts to time of day and seasons.",
            "The experience delivers structured monthly reports, behavioral highlights, audited document downloads, and a contextual dialogue area tied to each report, enabling families to discuss progress directly with the therapist.",
          ],
        },
        highlights: [
          {
            title: { "pt-BR": "Trilha 3D em WebGL", en: "WebGL 3D Trail" },
            description: {
              "pt-BR": "Renderização espacial fluida com Three.js e React Three Fiber, com fallback gracioso sem WebGL.",
              en: "Fluid spatial rendering with Three.js and React Three Fiber, with graceful non-WebGL fallback.",
            },
          },
          {
            title: { "pt-BR": "Editor de Avatar 3D", en: "3D Avatar Editor" },
            description: {
              "pt-BR": "Centenas de combinações de tons de pele, cabelos, roupas e acessórios sem restrições de gênero.",
              en: "Hundreds of combinations of skin tones, hair, clothing, and accessories with zero gender lock.",
            },
          },
          {
            title: { "pt-BR": "Privacidade & LGPD", en: "Privacy & LGPD" },
            description: {
              "pt-BR": "Arquitetura com isolamento rigoroso de pacientes, criptografia de ponta a ponta e auditoria de leitura.",
              en: "Rigorous patient data isolation, end-to-end encryption, and audited reading receipts.",
            },
          },
        ],
      },
      impact: {
        title: {
          "pt-BR": "Engajamento familiar e validação clínica de ponta a ponta",
          en: "Family engagement and end-to-end clinical validation",
        },
        paragraphs: {
          "pt-BR": [
            "Mais de 400 testes automatizados cobrem a integridade dos fluxos. A plataforma transformou a relação entre famílias e o consultório, oferecendo transparência afetiva sobre a evolução de cada criança.",
          ],
          en: [
            "Over 400 automated tests cover workflow integrity. The platform transformed the clinic-family dynamic, delivering warm transparency into each child's personal milestones.",
          ],
        },
      },
      scope: {
        "pt-BR": [
          "Plataforma digital integrada e ambiente seguro",
          "Experiência visual imersiva e interativa",
          "Identidade visual e biblioteca de componentes exclusiva",
          "Portal administrativo e área privativa das famílias",
          "Conformidade com privacidade e proteção de dados",
        ],
        en: [
          "Integrated digital platform and secure environment",
          "Immersive and interactive visual experience",
          "Exclusive visual identity and component library",
          "Administrative portal and private family area",
          "Healthcare privacy and data protection compliance",
        ],
      },
    },
  },
  {
    slug: "computer-vision",
    visibility: "confidential",
    year: "2026",
    name: "Computer Vision",
    category: {
      "pt-BR": "Inteligência artificial · Detecção de objetos",
      en: "Artificial intelligence · Object detection",
    },
    summary: {
      "pt-BR": "Visão computacional para detectar e classificar objetos: de veículos e placas a produtos em linha de produção e pessoas em espaços urbanos.",
      en: "Computer vision for object detection and classification, from vehicles and license plates to products on production lines and people in urban spaces.",
    },
    media: [
      image(
        "computer-vision",
        "01-veiculo-placa",
        {
          "pt-BR": "Carro branco em uma via com caixas amarelas delimitando o veículo e a placa, acompanhado de um rótulo de identificação.",
          en: "White car on a road with yellow bounding boxes around the vehicle and license plate, accompanied by an identification label.",
        },
        { "pt-BR": "Veículo e placa · Exemplo ilustrativo", en: "Vehicle and license plate · Illustrative example" },
        { width: 800, height: 541, fit: "contain" }
      ),
      image(
        "computer-vision",
        "02-objetos-producao",
        {
          "pt-BR": "Maçãs em uma esteira de produção, com caixas roxas delimitando os objetos individualmente.",
          en: "Apples on a production conveyor with purple bounding boxes marking individual objects.",
        },
        { "pt-BR": "Objetos em produção · Exemplo ilustrativo", en: "Objects in production · Illustrative example" },
        { width: 800, height: 640, fit: "contain" }
      ),
      image(
        "computer-vision",
        "03-deteccao-urbana",
        {
          "pt-BR": "Rua com pedestres e veículos, com caixas ciano para pessoas e caixas verdes para carros, acompanhadas de rótulos de classe.",
          en: "Street scene with pedestrians and vehicles, showing cyan boxes for people and green boxes for cars with class labels.",
        },
        { "pt-BR": "Detecção multiclasse urbana · Exemplo ilustrativo", en: "Urban multiclass detection · Illustrative example" },
        { width: 1600, height: 900, fit: "contain" }
      ),
    ],
    caseStudy: {
      confidentialityNotice: {
        "pt-BR": "Alguns detalhes deste projeto foram preservados por confidencialidade. As imagens são exemplos ilustrativos de aplicações de visão computacional.",
        en: "Some details of this project have been preserved for confidentiality. The images are illustrative examples of computer vision applications.",
      },
      challenge: {
        title: {
          "pt-BR": "Reconhecer objetos em diferentes contextos de operação",
          en: "Recognizing objects across operational contexts",
        },
        paragraphs: {
          "pt-BR": [
            "Veículos em circulação, produtos em uma esteira e pessoas em uma rua exigem leituras diferentes de uma mesma fonte de informação: a imagem. Cada contexto define quais objetos importam e como suas posições e classes devem ser apresentadas.",
            "O desafio foi estruturar a detecção de objetos para esses cenários, organizando caixas delimitadoras e rótulos de classe em uma leitura visual útil à operação, sem limitar a solução à detecção de pessoas.",
          ],
          en: [
            "Vehicles on the road, products on a conveyor, and people on a street call for different readings of the same source of information: the image. Each context determines which objects matter and how their positions and classes should be presented.",
            "The challenge was to structure object detection across these scenarios, organizing bounding boxes and class labels into a useful operational view, extending beyond person detection.",
          ],
        },
      },
      solution: {
        title: {
          "pt-BR": "Detecção, classificação e leitura visual por contexto",
          en: "Detection, classification, and contextual visualization",
        },
        paragraphs: {
          "pt-BR": [
            "O trabalho reúne processamento de imagens, localização de objetos e classificação conforme o contexto de uso. A visualização associa cada detecção à sua região na imagem, tornando a leitura das classes e dos elementos detectados mais direta.",
            "Os exemplos ilustram três aplicações: identificação de veículos e da região da placa; localização de produtos, como frutas, em linhas de produção; e detecção multiclasse de pessoas e veículos em espaços urbanos.",
          ],
          en: [
            "The work brings together image processing, object localization, and classification for each use case. The visualization links each detection to its region in the image, making classes and detected elements easier to interpret.",
            "The examples illustrate three applications: identifying vehicles and license plate regions; locating products, such as fruit, on production lines; and multiclass detection of people and vehicles in urban spaces.",
          ],
        },
        highlights: [
          {
            title: { "pt-BR": "Veículos e placas", en: "Vehicles and license plates" },
            description: {
              "pt-BR": "Localização do veículo e da região da placa para apoiar sua identificação na imagem.",
              en: "Locating vehicles and license plate regions to support identification within the image.",
            },
          },
          {
            title: { "pt-BR": "Objetos em produção", en: "Objects in production" },
            description: {
              "pt-BR": "Detecção individual de produtos em esteiras, com delimitação dos objetos presentes na cena.",
              en: "Detecting individual products on conveyors, with bounding boxes around objects in the scene.",
            },
          },
          {
            title: { "pt-BR": "Detecção multiclasse", en: "Multiclass detection" },
            description: {
              "pt-BR": "Pessoas e veículos diferenciados por classes e rótulos em um mesmo espaço urbano.",
              en: "People and vehicles distinguished by classes and labels within the same urban space.",
            },
          },
        ],
      },
      impact: {
        title: {
          "pt-BR": "Da imagem à informação operacional",
          en: "From images to operational information",
        },
        paragraphs: {
          "pt-BR": [
            "A leitura por objetos e classes organiza o conteúdo visual para apoiar análise de circulação, acompanhamento de produtos e observação de espaços. Os exemplos mostram como a visão computacional pode servir a diferentes operações com uma linguagem visual comum: localização, classe e contexto.",
          ],
          en: [
            "Reading images through objects and classes organizes visual information to support circulation analysis, product monitoring, and observation of spaces. The examples show how computer vision can serve different operations through a shared visual language: location, class, and context.",
          ],
        },
      },
      scope: {
        "pt-BR": [
          "Processamento de imagens e detecção de objetos",
          "Localização de veículos e regiões de placas",
          "Detecção de produtos em linhas de produção",
          "Classificação de pessoas e veículos em espaços urbanos",
          "Visualização de caixas delimitadoras e rótulos de classe",
        ],
        en: [
          "Image processing and object detection",
          "Vehicle and license plate region localization",
          "Product detection on production lines",
          "People and vehicle classification in urban spaces",
          "Bounding box and class label visualization",
        ],
      },
    },
  },
];
