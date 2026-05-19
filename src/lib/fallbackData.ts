import type { HomePageContent, Project, SiteSettings } from "@/types";

export const FALLBACK_SETTINGS: SiteSettings = {
  studioName: "Canji Studio",
  footerTagline: "Precision in Digital Craft.",
};

export const FALLBACK_HOME: HomePageContent = {
  heroTagline: "Criamos Experiências que Conectam.",
  heroTitle: "Bem-vindo a Canji.",
  heroDescription:
    "Na Canji, acreditamos que o design é a alma de qualquer product digital. Nossa missão é transformar suas ideias em experiências digitais que encantam e conectam. Especializados em UX/UI Design e desenvolvimento de sites e apps, estamos prontos para levar seu projeto ao próximo nível.",
  heroPrimaryButtonText: "Quero saber mais",
  heroSecondaryButtonText: "Ver Portfólio",
  solutionCards: [
    {
      icon: "brush",
      title: "UX/UI Design",
      description:
        "Criamos sistemas visuais que respiram inovação. Nossa abordagem foca na fluidez do movimento e na clareza da informação, garantindo que cada toque do usuário seja uma descoberta.",
    },
    {
      icon: "code",
      title: "Desenvolvimento de Sites e Apps",
      description:
        "Engenharia de software com foco em performance e escalabilidade. Traduzimos designs sofisticados em código limpo, rápido e preparado para o futuro do mercado global.",
    },
  ],
  serviceCards: [
    {
      icon: "search",
      title: "Pesquisa de Usuário",
      description:
        "Entendemos o comportamento real do seu público para criar estratégias baseadas em dados concretos.",
    },
    {
      icon: "layers",
      title: "Prototipagem e Testes",
      description:
        "Validação rápida de hipóteses através de protótipos interativos de alta fidelidade antes do desenvolvimento.",
    },
    {
      icon: "web",
      title: "Desenvolvimento Web",
      description:
        "Websites modernos, responsivos e otimizados para conversão com tecnologias de ponta.",
    },
    {
      icon: "support_agent",
      title: "Manutenção e Suporte",
      description:
        "Cuidado contínuo para garantir que seu produto digital opere sempre em máxima performance.",
    },
  ],
  ctaTitle: "Vamos Conversar?",
  ctaDescription:
    "Dê o próximo passo para transformar sua visão em realidade digital. Nossa equipe de especialistas está pronta para ouvir seu desafio.",
  ctaButtonText: "Iniciar um Projeto",
};

export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "neobank",
    title: "NeoBank App",
    slug: { current: "neobank-app" },
    categories: ["Mobile", "UI/UX"],
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAb9toObu770y9Ee1-3xJS1OAMc4Q8tRWqCWwCoIfgyq8xvCiR4uccP7yGofsG_58rMAkpr5n4jDVFg4H49oul7P6Ia2jKwW2nXekV7lzQKPtOuuowewTb3xPL4Xabtg9_Io3ZNgmGgqU0FOjj8cD024tMGW4B_YjmPj2L01dpbihBqgPp5K4ND5KuLD7wdCNdC2T8RLYWyEdVj2u5I8VSiWe9pq-dRPWlD8TyRVIL4xBkPuWlApLryH1GAWTkYlw3AL7g2xtwVKD0",
    shortDescription:
      "Sistema bancário digital completo com foco em segurança biométrica e gestão de ativos.",
    heroDescription:
      "Redefinindo a experiência bancária digital com uma interface minimalista e um core tecnológico de alta precisão focado na transparência financeira.",
    heroBackgroundUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGdSoTVkw0wofQ3kFOolE5K9CC3G2JFf7gFAwQQZVydZfSitGESQlCzbKt18UVGuAR6AT8pf0WrHFjYrxCTXyOhBrvX38oBRQeIBXEHIetmxzwvTDmmTM4Aefbs7AL3gP5mV0JnWl8hgT3xpf7It7Uv_odeHxZyWZRtros54rMjj31AijjL1RoECeA6D8G7j5Ewh1KXH0MJDMraGS1zAlAVXoBgyf4rAGsa21zztolGDsfXUxhhelLgwTQOxt-o0HdTVu1CLZTQb4",
    client: "NeoFinance Group",
    year: "2023 - 2024",
    services: ["Digital Product Design", "Brand Identity", "Mobile Development"],
    visualExplorationTitle: "Exploração Visual",
    visualExplorationDescription:
      "Cada tela foi projetada seguindo uma grade geométrica rigorosa, utilizando o azul primário como âncora visual para navegação e ações críticas.",
    gallery: [
      {
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBvYzXutEq5sk6O94hB_GVo_Q8I1y2zqM5Ry-N4YmLy3aP9WEF6g0bwnKi_HxeA0gaEKD69rKA1mIIf_e5sMkvHnplGIFRrV0w7YPpaYLUU5bDLWQeLucP-tgB9cDAljMf3ZIc4HxhGt-sj_-FQEnROwOfz0YBOPw08sp9eSLSEd1d_JYgSBhPk39s6wEgO0xgnVCHhnUcJ0Gb9R_RcO1WMQIRQKunfAVgmWi4OBmbidbQAvyw5l4xglaRgOKtOjZ3E32Mj4Kcl5yo",
        alt: "Fintech app interface on smartphone",
        caption: "Dashboard principal e controle de fluxo",
      },
      {
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBMt8BYW58jjHG65rJ9QMKWHZF09mTJcvOgAJ4gUXoBATCeni3qqTa0wW-fxMnxaDrFRIc8coBDAI04ER2qjEkbpSJ03JkHbbOuVoF44yF7KcNdLP8QyDC9FcmiFCxGaFiKclD2jsKaN7Raomqi3ROzV_W-gwL0G4-jQu0txmHuOfpGwMdi-sKOVe-mWpQUdopnKp8unI4qfADHNJUhY7uqCSuJ7MgoX8W8B5sTsHSfcdRkkXJyFd2VMkbtinMFNHeI2WCnZLZq5vA",
        alt: "Data visualization dashboard",
      },
      {
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCoZDMFQyRDhlU9VkOmi798OYgQyycq-l42mBxkfOKx4ZIkNo3FLSPy36VSwaRtKkrZ1WiH_-0WSyW4HB5VbM5Dqe9taBc2ajVXxalXlohQJKx-Q8OuR9TqbYGjQWAA6aeTzFk6NsCWTo3wV-z6BbdzWjCROZ26u_2-LqhtVNpWD76tSG3YIYYLquiYw3OSNfG892GREvEgbayR28cQEOfK28QHDRC94qs2maZUyep39_D5-VLBoXyFTu8zWbj8Mts29EXjLVUTQZ4",
        alt: "App UI components showcase",
      },
    ],
    publishedAt: "2024-01-01",
  },
  {
    _id: "cyberflow",
    title: "CyberFlow Website",
    slug: { current: "cyberflow-website" },
    categories: ["Web Dev", "SaaS"],
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYv7Wu8N96QzTH6B7FzetacH8SDOIlmX-Kv4OOIpOGO6xf36caeKdgPR3k9jlTtljMOmNp0nookcu9UlnyWPGBwPObo0HDB4JxA6zZ-1qHiHwtHe7YImrGWL-PKndLbGoP20IKxTIysD6AH6SGVlKTb30D2S6-4Fu7ghgv9pYb9jQ1he8b_2RIFWP00gaGFfZPpNFdALvIkIwTsCmS06JVTtIwL6E9tQDuFjYdyk99pVmvBtvW_9ndEz6M2PgrisDUNbuD7wMBhxk",
    shortDescription:
      "Website institucional para plataforma de monitoramento de ameaças em tempo real.",
    publishedAt: "2023-06-01",
  },
  {
    _id: "lumina",
    title: "Lumina Branding",
    slug: { current: "lumina-branding" },
    categories: ["Branding", "Visual Identity"],
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhAeHd_PoO8x2hw3722ZJ_R_qPBUMvPdbXlAIaU5WYOhdhoRrOlhpfgpk_Y9t8jIjIWs-plfAfqXOjPsKfgKNIuLvGZtW1EBZtCBs7jgxCE4o4QwhbLuXzkc_ehZg_YigQdVjLJx-j4snqShFiObMPK4gkw_vQp9aR4t2QpB69N30gCWc-pkaBt4JvkmXu9gy4-2j6MlcElvXyXpXc2wezcEE1KN51TYurFId2UyBIJfBdDW3Mo9r22DflrNuwLatYz09z92fY5wE",
    shortDescription:
      "Redefinição da identidade visual para estúdio de iluminação inteligente de alto padrão.",
    publishedAt: "2023-03-01",
  },
];
