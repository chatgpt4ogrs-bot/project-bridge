import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Play, Timer, Clock, LayoutGrid, BadgeCheck, Medal, PlayCircle, Check, CheckCircle2, ChevronDown, Lock, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseThumb, ProgressBar, Tag } from "@/components/academy/AppShell";
import { cftvModules, courses, instructorPhoto } from "@/lib/academy-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cursos/$courseId")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.title ?? "Curso"} — Âncora Academy` },
      { name: "description", content: `Conteúdo programático, instrutor e progresso do treinamento ${loaderData?.course.title ?? ""}.` },
      { property: "og:title", content: `${loaderData?.course.title ?? "Curso"} — Âncora Academy` },
      { property: "og:description", content: "Detalhes do treinamento na universidade corporativa Âncora." },
    ],
  }),
  component: CourseDetail,
});

function CourseDetail() {
  const { course: c } = Route.useLoaderData();
  const [open, setOpen] = useState<number[]>([1]);
  const done = Math.round((c.progress / 100) * c.lessons);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/cursos" className="flex items-center gap-2 text-sm font-semibold hover:underline"><ArrowLeft className="size-4" /> Voltar ao catálogo</Link>
        <span className="text-xs text-muted-foreground">Código: {c.code}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[20px]"><CourseThumb image={c.image} title={c.title} className="h-64" /></div>
          <div className="flex flex-wrap gap-2">
            <Tag tone="dark">{c.category}</Tag>
            {c.status === "andamento" && <Tag tone="gold"><Timer className="size-3" /> Em andamento • {c.progress}%</Tag>}
            {c.status === "concluido" && <Tag tone="success">Concluído</Tag>}
          </div>
          <h1 className="text-[24px] font-extrabold leading-8 md:text-[34px] md:leading-[42px]">{c.title}</h1>
          <p className="text-muted-foreground">Capacitação técnica completa para operadores de central de segurança e vigilantes patrimoniais. Aborda operação de consoles analógicos e IP, protocolos de detecção de intrusão, leitura de comportamento suspeito, preservação de evidências visuais e procedimentos de acionamento de pronta resposta.</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Carga horária", `${c.hours} horas`, Clock],
              ["Estrutura", `3 módulos • ${c.lessons} aulas`, LayoutGrid],
              ["Certificação", "Inclusa (Nota 8.0)", BadgeCheck],
              ["Nível técnico", "Intermediário", Medal],
            ].map(([l, v, I]) => {
              const Icon = I as typeof Clock;
              return (
                <div key={l as string} className="card-surface p-4">
                  <div className="label-caps text-muted-foreground">{l as string}</div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-bold"><Icon className="size-4" /> {v as string}</div>
                </div>
              );
            })}
          </div>

          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold">Conteúdo programático</h2>
                <p className="text-sm text-muted-foreground">3 módulos estruturados com aulas teóricas e simulações operacionais.</p>
              </div>
              <button onClick={() => setOpen([0, 1, 2])} className="text-sm font-semibold hover:underline">Expandir todos</button>
            </div>
            <div className="space-y-3">
              {cftvModules.map((m, i) => {
                const doneCount = m.lessons.filter((l) => l.state === "done").length;
                const all = doneCount === m.lessons.length;
                return (
                  <div key={m.title} className="card-surface overflow-hidden">
                    <button onClick={() => toggle(i)} className="flex w-full items-center gap-4 p-4 text-left">
                      <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold", all ? "bg-success text-success-foreground" : doneCount ? "bg-accent text-accent-foreground" : "bg-muted")}>
                        {all ? <Check className="size-4" /> : i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">Módulo {i + 1}: {m.title}</div>
                        <div className="text-xs text-muted-foreground">{m.lessons.length} aulas • {all ? "Todas as aulas concluídas" : doneCount ? `${doneCount} concluídas` : "Não iniciado"}</div>
                      </div>
                      <ChevronDown className={cn("size-5 transition-transform duration-200", open.includes(i) && "rotate-180")} />
                    </button>
                    {open.includes(i) && (
                      <div className="divide-y divide-border border-t border-border">
                        {m.lessons.map((l) => (
                          <div key={l.n} className={cn("flex items-center gap-3 px-4 py-3", l.state === "current" && "bg-accent/10")}>
                            {l.state === "done" ? <CheckCircle2 className="size-5 text-success" /> : l.state === "current" ? <PlayCircle className="size-5" /> : l.quiz ? <ClipboardCheck className="size-5 text-muted-foreground" /> : <Lock className="size-5 text-muted-foreground" />}
                            <div className="flex-1">
                              <div className={cn("text-sm font-semibold", l.state === "locked" && "text-muted-foreground")}>Aula {l.n}: {l.title}</div>
                              <div className="text-xs text-muted-foreground">Vídeo aula • {l.duration}</div>
                            </div>
                            {l.state === "done" && <span className="text-xs font-semibold text-success">Concluída</span>}
                            {l.state === "current" && <Button size="sm" asChild><Link to="/aulas">Assistir</Link></Button>}
                            {l.state === "locked" && <span className="text-xs text-muted-foreground">Bloqueada</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[14px] bg-primary p-6 text-primary-foreground">
            <div className="label-caps text-sidebar-primary">Seu progresso individual</div>
            <div className="mt-2 text-2xl font-extrabold">{done} de {c.lessons} aulas ({c.progress}%)</div>
            <ProgressBar value={c.progress} className="mt-4 bg-sidebar-accent" />
            {c.nextLesson && <p className="mt-4 text-sm text-sidebar-foreground">Próxima aula: <span className="font-semibold text-primary-foreground">Aula {c.currentLesson} — {c.nextLesson}</span></p>}
            <Button variant="gold" size="lg" className="mt-5 w-full" asChild>
              <Link to="/aulas">{c.progress > 0 ? <><Play /> Continuar treinamento</> : <><PlayCircle /> Iniciar treinamento</>}</Link>
            </Button>
          </div>
          <div className="card-surface p-5">
            <div className="label-caps text-muted-foreground">Instrutor responsável</div>
            <div className="mt-3 flex items-center gap-3">
              <img src={instructorPhoto} alt={c.instructor} className="size-14 rounded-full object-cover" />
              <div>
                <div className="font-bold">{c.instructor}</div>
                <div className="text-xs text-muted-foreground">Especialista em Gestão de Riscos e Sistemas Eletrônicos de Proteção</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
