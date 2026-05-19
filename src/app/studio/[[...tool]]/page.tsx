"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export default function StudioPage() {
  if (!projectId) {
    return (
      <div className="min-h-screen bg-[#0b1326] flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <div className="text-5xl mb-6">⚙️</div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Configuração do Sanity necessária
          </h1>
          <p className="text-gray-400 mb-6">
            Para usar o Studio de conteúdo, configure a variável de ambiente
            <code className="block mt-2 mb-2 bg-white/10 px-3 py-1 rounded text-blue-300 font-mono text-sm">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>
            com o ID do seu projeto no{" "}
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Sanity Manage
            </a>
            .
          </p>
          <div className="bg-white/5 rounded-xl p-4 text-left text-sm font-mono text-gray-300">
            <p className="text-gray-500 mb-1"># .env.local</p>
            <p>NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id</p>
            <p>NEXT_PUBLIC_SANITY_DATASET=production</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Após configurar, reinicie o servidor e execute o seed:
            <code className="block mt-1 bg-white/10 px-3 py-1 rounded text-green-300 text-xs">
              node scripts/seed.mjs
            </code>
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
