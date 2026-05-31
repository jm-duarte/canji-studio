/**
 * Script de seed do Sanity CMS — Canji Studio
 *
 * Pré-requisitos:
 *   1. Projeto Sanity criado em https://www.sanity.io/manage
 *   2. .env.local configurado com NEXT_PUBLIC_SANITY_PROJECT_ID
 *   3. Token de escrita: crie em Manage > API > Tokens (Editor ou Admin)
 *      e exporte como variável: export SANITY_API_TOKEN=seu-token
 *
 * Uso:
 *   node scripts/seed.mjs
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error(
    "❌ NEXT_PUBLIC_SANITY_PROJECT_ID não definido.\n" +
      "   Configure o arquivo .env.local com o ID do seu projeto Sanity."
  );
  process.exit(1);
}

if (!token) {
  console.error(
    "❌ SANITY_API_TOKEN não definido.\n" +
      "   Crie um token de escrita em https://www.sanity.io/manage\n" +
      "   e exporte-o: export SANITY_API_TOKEN=seu-token"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-01-01",
});

/** Converte texto simples em um array de blocos PortableText */
function toBlocks(text) {
  return text.split("\n\n").map((paragraph, i) => ({
    _type: "block",
    _key: `block-${i}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${i}`,
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }));
}

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    studioName: "Canji Studio",
    whatsappNumber: "5511999999999",
    footerTagline: "Precision in Digital Craft.",
    socialLinks: {
      linkedin: "https://linkedin.com/company/canjistudio",
      dribbble: "https://dribbble.com/canjistudio",
    },
  },
  {
    _id: "homePageContent",
    _type: "homePageContent",
    heroTagline: "Criamos Experiências que Conectam.",
    heroTitle: "Bem-vindo a Canji.",
    heroDescription:
      "Na Canji, acreditamos que o design é a alma de qualquer product digital. Nossa missão é transformar suas ideias em experiências digitais que encantam e conectam. Especializados em UX/UI Design e desenvolvimento de sites e apps, estamos prontos para levar seu projeto ao próximo nível.",
    heroPrimaryButtonText: "Quero saber mais",
    heroSecondaryButtonText: "Ver Portfólio",
    solutionCards: [
      {
        _key: "solution-1",
        icon: "brush",
        title: "UX/UI Design",
        description:
          "Criamos sistemas visuais que respiram inovação. Nossa abordagem foca na fluidez do movimento e na clareza da informação, garantindo que cada toque do usuário seja uma descoberta.",
      },
      {
        _key: "solution-2",
        icon: "code",
        title: "Desenvolvimento de Sites e Apps",
        description:
          "Engenharia de software com foco em performance e escalabilidade. Traduzimos designs sofisticados em código limpo, rápido e preparado para o futuro do mercado global.",
      },
    ],
    serviceCards: [
      {
        _key: "service-1",
        icon: "search",
        title: "Pesquisa de Usuário",
        description:
          "Entendemos o comportamento real do seu público para criar estratégias baseadas em dados concretos.",
      },
      {
        _key: "service-2",
        icon: "layers",
        title: "Prototipagem e Testes",
        description:
          "Validação rápida de hipóteses através de protótipos interativos de alta fidelidade antes do desenvolvimento.",
      },
      {
        _key: "service-3",
        icon: "web",
        title: "Desenvolvimento Web",
        description:
          "Websites modernos, responsivos e otimizados para conversão com tecnologias de ponta.",
      },
      {
        _key: "service-4",
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
  },
  {
    _id: "project-lumina-saas",
    _type: "project",
    title: "Lumina SaaS: Precificação Dinâmica",
    slug: { _type: "slug", current: "lumina-saas-precificacao-dinamica" },
    categories: ["Web Design", "UI/UX", "SaaS"],
    thumbnailUrl: "/portfolio/lumina-saas-10.png",
    shortDescription:
      "Repensando a jornada de compra B2B: como transformamos a complexidade de preços em uma experiência interativa e voltada para conversão.",
    heroDescription:
      "Repensando a jornada de compra B2B: como transformamos a complexidade de preços em uma experiência interativa, transparente e voltada para conversão.",
    heroBackgroundUrl: "/portfolio/lumina-saas-10.png",
    client: "Projeto Conceito (Lumina)",
    year: "2024",
    services: ["UI/UX Design", "Desenvolvimento Front-end", "Estratégia de Conversão (CRO)"],
    challenge: toBlocks(
      "Plataformas de software (SaaS) frequentemente sofrem com a complexidade na hora de apresentar seus planos. Para o projeto da Lumina (um software de base de conhecimento), o obstáculo central era conseguir exibir a variação de preço conforme o número de usuários, sem poluir a tela com tabelas gigantescas ou confundir o cliente.\n\nO desafio era criar uma interface capaz de atender desde pequenas startups (10 usuários) até operações de nível enterprise (mais de 1.000 usuários), mantendo a carga cognitiva baixa e deixando o valor do produto extremamente claro logo no primeiro contato."
    ),
    solution: toBlocks(
      "Abandonamos o modelo tradicional de blocos de texto estáticos. Em vez disso, implementamos uma arquitetura focada na interação através de um slider dinâmico central.\n\nEm vez de calcular mentalmente, o visitante simplesmente ajusta o controle para o tamanho exato da sua equipe, e os preços dos três planos são atualizados em tempo real. Além disso, criamos gatilhos visuais de \"gamificação\": conforme o usuário arrasta o slider para números maiores, o sistema destaca visualmente o desbloqueio de descontos progressivos (10%, 30% e ofertas especiais). Isso transforma o atrito da escolha de preços em uma experiência de descoberta que incentiva o upsell."
    ),
    visualExplorationTitle: "Exploração Visual",
    visualExplorationDescription:
      "Optamos por uma paleta focada em dark mode para transmitir modernidade e tecnologia. Utilizamos o azul primário para elementos de controle e cores quentes (laranja e rosa) para criar contraste e guiar o olhar do usuário diretamente para os planos de maior valor (Plus e Pro), facilitando a tomada de decisão rápida.",
    gallery: [
      {
        _key: "gallery-1",
        imageUrl: "/portfolio/lumina-saas-10.png",
        alt: "Lumina SaaS — slider em 10 usuários, preços padrão",
        caption: "Plano base com 10 usuários — preço inicial",
      },
      {
        _key: "gallery-2",
        imageUrl: "/portfolio/lumina-saas-500.png",
        alt: "Lumina SaaS — slider em 500 usuários, 10% de desconto liberado",
        caption: "10% de desconto liberado ao atingir 100 usuários",
      },
      {
        _key: "gallery-3",
        imageUrl: "/portfolio/lumina-saas-1000.png",
        alt: "Lumina SaaS — slider em 1000 usuários, oferta especial enterprise",
        caption: "Oferta especial enterprise desbloqueada para 1.000+ usuários",
      },
    ],
    publishedAt: "2024-06-01",
  },
  {
    _id: "project-sagas-fortkamp",
    _type: "project",
    title: "Sagás & Fortkamp: Autoridade Digital",
    slug: { _type: "slug", current: "sagas-fortkamp-autoridade-digital" },
    categories: ["Web Design", "Institucional"],
    thumbnailUrl: "/portfolio/sagas-fortkamp-1.jpg",
    shortDescription:
      "Lançamento ágil e estratégico de um portal institucional em WordPress para posicionar um novo escritório de advocacia focado em Direito Médico.",
    heroDescription:
      "Lançamento ágil e estratégico de um portal institucional em WordPress para posicionar um novo escritório de advocacia focado em Direito Médico.",
    heroBackgroundUrl: "/portfolio/sagas-fortkamp-1.jpg",
    client: "Sagás & Fortkamp",
    year: "2024",
    services: ["UI/UX Design", "Desenvolvimento WordPress", "Estratégia Institucional"],
    challenge: toBlocks(
      "A Sagás & Fortkamp nasceu como um novo escritório especializado em uma área muito delicada: o Direito Médico e da Saúde. Por ser uma operação nova, o principal desafio era o tempo. As fundadoras precisavam de uma presença digital rápida para começar a prospectar clientes e transmitir confiança imediata, sem abrir mão da sofisticação e da clareza institucional.\n\nPrecisávamos criar do zero um ambiente que equilibrasse a seriedade e o rigor técnico da advocacia com a empatia e o acolhimento necessários para clientes que enfrentam problemas de saúde."
    ),
    solution: toBlocks(
      "Para atender à urgência do prazo sem sacrificar a qualidade, optamos pelo desenvolvimento em WordPress. Essa escolha técnica nos permitiu entregar um site altamente otimizado e responsivo em tempo recorde.\n\nA arquitetura de informação foi desenhada para ir direto ao ponto. Dividimos os serviços em três pilares principais (Direito Médico, Direito da Saúde e Empresarial para Clínicas) com cards visuais de fácil clique. Além disso, destacamos estrategicamente um bloco de \"Sobre o Escritório\" logo na página inicial para humanizar a marca e gerar conexão imediata entre as advogadas e seus futuros clientes."
    ),
    visualExplorationTitle: "Exploração Visual",
    visualExplorationDescription:
      "Para a paleta de cores, adotamos a solidez do azul marinho profundo em contraste com tons de dourado envelhecido, transmitindo elegância, justiça e credibilidade. A curadoria de imagens fugiu dos clichês de tribunais, focando no aspecto humano: profissionais da saúde, cuidado com o paciente e acolhimento.",
    gallery: [
      {
        _key: "gallery-1",
        imageUrl: "/portfolio/sagas-fortkamp-1.jpg",
        alt: "Sagás & Fortkamp — página inicial completa",
        caption: "Homepage com hero, serviços e seção sobre o escritório",
      },
      {
        _key: "gallery-2",
        imageUrl: "/portfolio/sagas-fortkamp-2.jpg",
        alt: "Sagás & Fortkamp — visão alternativa do layout",
        caption: "Seção de CTA e rodapé com identidade sólida",
      },
    ],
    publishedAt: "2024-03-01",
  },
  {
    _id: "project-estetica-master",
    _type: "project",
    title: "Estética Master: Lançamento de Evento",
    slug: { _type: "slug", current: "estetica-master-lancamento-evento" },
    categories: ["Web Design", "Landing Page"],
    thumbnailUrl: "/portfolio/estetica-master.png",
    shortDescription:
      "Como desenhamos uma Landing Page focada em autoridade e gatilhos de urgência para maximizar a venda de ingressos na pré-venda.",
    heroDescription:
      "Como desenhamos uma Landing Page focada em autoridade e gatilhos de urgência para maximizar a venda de ingressos.",
    heroBackgroundUrl: "/portfolio/estetica-master.png",
    client: "Projeto Conceito",
    year: "2024",
    services: ["UI/UX Design", "Estratégia de Landing Page", "CRO"],
    challenge: toBlocks(
      "Em páginas de eventos, o maior desafio é equilibrar a emoção da venda com a necessidade de passar informações densas. Para o Estética Master, o objetivo principal era exibir o extenso currículo, as formações e os métodos de quatro palestrantes de peso, sem transformar a página em um \"muro de texto\" que espantasse o usuário.\n\nPrecisávamos garantir que a autoridade de cada profissional ficasse evidente, enquanto mantínhamos o fluxo de leitura dinâmico e direcionado para a ação principal: a compra do ingresso na pré-venda."
    ),
    solution: toBlocks(
      "Para resolver o problema da exibição dos currículos, aplicamos um conceito clássico de usabilidade: o padrão de leitura em \"Z\". Alternamos o alinhamento das fotos e textos de cada palestrante (esquerda/direita). Isso quebra a monotonia visual, mantém o cérebro engajado e facilita a escaneabilidade dos tópicos de formação.\n\nAlém da distribuição de conteúdo, aplicamos engenharia de conversão em três frentes: um cronômetro de destaque logo na primeira dobra validando a escassez da oferta de 40% OFF; uma sessão estruturada de FAQ no rodapé para eliminar dúvidas de logística ou pagamento; e um espaço central dedicado a um vídeo de vendas (VSL), permitindo que a organização faça o pitch final antes da revelação do preço."
    ),
    visualExplorationTitle: "Exploração Visual",
    visualExplorationDescription:
      "Para o setor de estética, o design precisa transmitir limpeza, sofisticação e energia. Optamos por um fundo predominantemente claro (white/off-white) contrastando com botões e tipografias de destaque em tom vibrante de magenta, criando pontos focais extremamente fortes para as chamadas de ação (CTAs).",
    gallery: [
      {
        _key: "gallery-1",
        imageUrl: "/portfolio/estetica-master.png",
        alt: "Estética Master 2024 — landing page completa",
        caption: "Landing page com countdown, palestrantes e VSL",
      },
    ],
    publishedAt: "2024-09-01",
  },
];

async function seed() {
  console.log(
    `\n🌱 Iniciando seed do Sanity — projeto: ${projectId} / dataset: ${dataset}\n`
  );

  for (const doc of documents) {
    try {
      const result = await client.createOrReplace(doc);
      console.log(`✅ ${result._type} — "${result._id}" criado/atualizado`);
    } catch (err) {
      console.error(`❌ Erro ao criar "${doc._id}":`, err.message);
    }
  }

  console.log(
    "\n✨ Seed concluído! Acesse /studio para verificar os documentos.\n"
  );
}

seed();
