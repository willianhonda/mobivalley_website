// Shared exam links from the Radar de Concursos app land here (/concurso/?id=<id>). With the app
// installed, iOS opens the app instead (universal link, see public/.well-known/apple-app-site-association).
import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ConcursoView, ConcursoFallback } from "@/views/ConcursoView";

export const metadata: Metadata = {
  ...pageMetadata("pt", "/concurso/", {
    title: "Concurso no Radar de Concursos",
    description: "Veja o concurso, o prazo de inscrição e o edital. O Radar de Concursos avisa antes do prazo acabar.",
  }),
  // One page for every exam: keep it out of search results.
  robots: { index: false, follow: true },
  itunes: { appId: "1484146441" },
};

export default function Page() {
  return (
    <Suspense fallback={<ConcursoFallback />}>
      <ConcursoView />
    </Suspense>
  );
}
