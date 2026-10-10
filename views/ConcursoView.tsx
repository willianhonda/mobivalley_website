"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppStoreBadge } from "@/components/AppStoreBadge";

// Daily feed published by the concursos-data repo (GitHub Pages, CORS open).
const FEED_URL = "https://willianhonda.github.io/concursos-data/concursos.json";
const APP_STORE_URL = "https://apps.apple.com/br/app/id1484146441";

type Exam = {
  id: string;
  title: string;
  state: string;
  salary: string;
  vacancies: string;
  url: string;
  city?: string | null;
  registrationStarts?: string | null;
  registrationEnds?: string | null;
};

type State = { status: "loading" } | { status: "found"; exam: Exam } | { status: "missing" };

const dayMonth = (iso: string) => {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
};

function splitTitle(title: string) {
  const i = title.lastIndexOf(" - ");
  return i < 0 ? { org: title, edital: "" } : { org: title.slice(0, i), edital: title.slice(i + 3) };
}

function deadline(exam: Exam, today: string) {
  const { registrationStarts: start, registrationEnds: end } = exam;
  if (!end) return "Prazo no edital";
  if (end < today) return "Inscrições encerradas";
  if (start && start > today) return `Inscrições de ${dayMonth(start)} a ${dayMonth(end)}`;
  return `Inscrições até ${dayMonth(end)}`;
}

function salaryRange(salary: string) {
  const values = [...salary.matchAll(/R\$\s*([\d.]+),\d{2}/g)].map((m) => Number(m[1].replaceAll(".", "")));
  if (values.length === 0) return null;
  const fmt = (v: number) => v.toLocaleString("pt-BR");
  const low = Math.min(...values);
  const high = Math.max(...values);
  return low === high ? `R$ ${fmt(low)}` : `R$ ${fmt(low)} – ${fmt(high)}`;
}

export function ConcursoFallback() {
  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-2xl px-5 pt-32 pb-24 sm:px-8">
      <p className="text-paper/60">Carregando o concurso…</p>
    </main>
  );
}

export function ConcursoView() {
  const id = useSearchParams().get("id");
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!id) return;
    fetch(FEED_URL)
      .then((r) => (r.ok ? r.json() : []))
      .then((items: Exam[]) => {
        const exam = Array.isArray(items) ? items.find((e) => e.id === id) : undefined;
        setState(exam ? { status: "found", exam } : { status: "missing" });
      })
      .catch(() => setState({ status: "missing" }));
  }, [id]);

  if (id && state.status === "loading") return <ConcursoFallback />;

  const today = new Date().toISOString().slice(0, 10);
  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-2xl px-5 pt-32 pb-24 sm:px-8">
      <p className="text-sm font-semibold tracking-wide text-mint uppercase">Radar de Concursos</p>
      {state.status === "found" ? (
        <ExamCard exam={state.exam} today={today} />
      ) : (
        <div className="mt-4">
          <h1 className="text-3xl font-semibold text-paper">Este concurso não está mais na lista</h1>
          <p className="mt-3 text-paper/70">
            As inscrições podem ter terminado. No app você vê os concursos abertos agora e recebe aviso antes do prazo
            acabar.
          </p>
        </div>
      )}
      <div className="mt-10 rounded-2xl border border-paper/10 bg-ink-800 p-6">
        <p className="text-lg font-semibold text-paper">Não perca o prazo</p>
        <p className="mt-2 text-paper/70">
          O Radar de Concursos lê os diários oficiais todos os dias e avisa antes do fim das inscrições. Grátis, sem
          anúncios.
        </p>
        <div className="mt-5">
          <AppStoreBadge href={APP_STORE_URL} alt="Baixar o Radar de Concursos na App Store" newTabLabel="(abre em nova aba)" />
        </div>
      </div>
    </main>
  );
}

function ExamCard({ exam, today }: { exam: Exam; today: string }) {
  const { org, edital } = splitTitle(exam.title);
  const vacancies = exam.vacancies.match(/\d+/)?.[0];
  const salary = salaryRange(exam.salary);
  const place = exam.city ? `${exam.city} · ${exam.state}` : exam.state === "BR" ? "Nacional" : exam.state;
  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold text-paper sm:text-4xl">{org}</h1>
      {edital && <p className="mt-2 text-lg text-paper/80">{edital}</p>}
      <p className="mt-1 text-paper/60">{place}</p>
      <dl className="mt-6 grid grid-cols-2 gap-3">
        {vacancies && (
          <div className="rounded-xl bg-ink-800 p-4">
            <dt className="text-xs font-semibold tracking-wide text-paper/50 uppercase">Vagas</dt>
            <dd className="mt-1 text-xl font-semibold text-paper">{vacancies}</dd>
          </div>
        )}
        {salary && (
          <div className="rounded-xl bg-ink-800 p-4">
            <dt className="text-xs font-semibold tracking-wide text-paper/50 uppercase">Salário</dt>
            <dd className="mt-1 text-xl font-semibold text-paper">{salary}</dd>
          </div>
        )}
      </dl>
      <p className="mt-6 text-xl font-semibold text-mint">{deadline(exam, today)}</p>
      {exam.url && (
        <a
          href={exam.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-semibold text-paper underline underline-offset-4"
        >
          Abrir o edital
        </a>
      )}
      <p className="mt-6 text-sm text-paper/50">
        Dados extraídos automaticamente dos diários oficiais. Confira sempre o edital.
      </p>
    </div>
  );
}
