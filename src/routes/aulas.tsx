import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Play, Pause, Maximize, Settings, Volume2, CheckCircle2, SkipBack, SkipForward, Info, Download, NotebookPen, FileText, File, PlayCircle, Lock, ClipboardCheck, BadgeCheck, CloudCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/academy/AppShell";
import { cftvModules, courses } from "@/lib/academy-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aulas")({
  head: () => ({
    meta: [
      { title: "Ambiente de Aulas — Âncora Academy" },
      { name: "description", content: "Assista às aulas, baixe materiais e faça anotações nos seus treinamentos Âncora." },
      { property: "og:title", content: "Ambiente de Aulas — Âncora Academy" },
      { property: "og:description", content: "Assista às aulas, baixe materiais e faça anotações nos seus treinamentos Âncora." },
    ],
  }),
  component: Player,
});

const NOTES_KEY = "ancora-notas-aula-5";
const defaultNote = "Atenção ao tempo limite de permanência de veículos em frente ao portão 2. Lembrar de notificar a ronda imediatamente após 3 minutos.";

function Player() {
  const course = courses[0]!;
  const [tab, setTab] = useState<"sobre" | "materiais" | "notas">("sobre");
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState(defaultNote);
  const [open, setOpen] = useState<number[]>([1]);

  useEffect(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) setNote(saved);
  }, []);

  const completed = 4 + (done ? 1 : 0);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <div className="relative aspect-video overflow-hidden rounded-[14px] bg-primary">
          <img src={course.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <button onClick={() => setPlaying(!playing)} className="absolute inset-0 flex items-center justify-center" aria-label={playing ? "Pausar" : "Reproduzir"}>
            <span className="flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lift transition-transform hover:scale-105">
              {playing ? <Pause className="size-8" /> : <Play className="ml-1 size-8" />}
            </span>
          </button>
          <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-primary to-transparent p-4 text-primary-foreground">
            <ProgressBar value={playing ? 42 : 18} className="h-1 bg-sidebar-accent" />
            <div className="flex items-center gap-4 text-xs">
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              <Volume2 className="size-4" />
              <span>{playing ? "15:58" : "06:50"} / 38:00</span>
              <Settings className="ml-auto size-4" />
              <Maximize className="size-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="label-caps text-muted-foreground">Módulo 2: Técnicas de Observação • Aula 5 de 8</div>
            <h1 className="mt-1 text-xl font-bold md:text-[26px] md:leading-[34px]">Análise de Comportamento Suspeito e Triagem em Tempo Real</h1>
            <p className="mt-1 text-sm text-muted-foreground">Instrutor: <span className="font-semibold text-foreground">Cap. Carlos Mendonça</span> • Duração: 38 minutos</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Aula anterior"><SkipBack /></Button>
            <Button
              variant={done ? "outline" : "gold"}
              onClick={() => { setDone(!done); if (!done) toast.success("Aula marcada como concluída"); }}
            >
              <CheckCircle2 className={cn(done && "text-success")} /> {done ? "Concluída" : "Marcar como concluída"}
            </Button>
            <Button variant="outline" size="icon" aria-label="Próxima aula"><SkipForward /></Button>
          </div>
        </div>

        <div className="card-surface">
          <div className="flex gap-1 border-b border-border px-2">
            {([["sobre", "Sobre esta aula", Info], ["materiais", "Materiais (2)", Download], ["notas", "Minhas anotações", NotebookPen]] as const).map(([k, l, I]) => (
              <button key={k} onClick={() => setTab(k)} className={cn("flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors", tab === k ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
                <I className="size-4" /> {l}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === "sobre" && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold">Objetivos de aprendizagem</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Nesta aula, os operadores aprenderão a identificar microcomportamentos anômalos em perímetros empresariais antes da ocorrência da invasão. O foco está na distinção entre transeuntes comuns e indivíduos em processo de reconhecimento de terreno (tempo de permanência, checagem visual de câmeras e hesitação em acessos).</p>
                </div>
                <div className="rounded-[10px] border-l-4 border-accent bg-muted p-4">
                  <h3 className="font-bold">Pontos chave do procedimento Âncora</h3>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {["Regra dos 3 minutos de vigilância ativa sobre veículos parados em via pública.", "Acionamento do vigilante móvel via canal seguro (rádio HT digital).", "Gravação manual de contingência com marcação de timestamp."].map((p) => (
                      <li key={p} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {tab === "materiais" && (
              <div className="space-y-3">
                {[["Guia_Rapido_Identificacao_Suspeitos.pdf", "PDF • 1.8 MB", FileText], ["Formulario_Notificacao_Ronda.docx", "Word • 450 KB", File]].map(([n, m, I]) => {
                  const Icon = I as typeof File;
                  return (
                    <div key={n as string} className="flex items-center gap-3 rounded-[10px] border border-border p-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted"><Icon className="size-5" /></div>
                      <div className="flex-1"><div className="text-sm font-semibold">{n as string}</div><div className="text-xs text-muted-foreground">{m as string}</div></div>
                      <Button variant="outline" size="sm" onClick={() => toast("Download indisponível nesta prévia")}><Download /> Baixar</Button>
                    </div>
                  );
                })}
              </div>
            )}
            {tab === "notas" && (
              <div className="space-y-3">
                <label className="text-sm font-semibold">Suas anotações pessoais</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={5} className="w-full rounded-[10px] border border-border bg-background p-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/40" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><CloudCheck className="size-4" /> Anotação salva localmente</span>
                  <Button size="sm" onClick={() => { localStorage.setItem(NOTES_KEY, note); toast.success("Anotações salvas"); }}>Salvar notas</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="card-surface self-start overflow-hidden xl:sticky xl:top-24">
        <div className="border-b border-border p-5">
          <h2 className="font-bold">Conteúdo do curso</h2>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground"><span>3 módulos • 8 aulas gravadas</span><span className="font-semibold text-foreground">{completed} / 8 concluídas</span></div>
          <ProgressBar value={(completed / 8) * 100} className="mt-3" />
        </div>
        {cftvModules.map((m, i) => (
          <div key={m.title} className="border-b border-border">
            <button onClick={() => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))} className="flex w-full items-center gap-2 bg-muted/50 px-5 py-3 text-left">
              <div className="flex-1"><div className="label-caps text-muted-foreground">Módulo {i + 1}</div><div className="text-sm font-bold">{m.title}</div></div>
              <ChevronDown className={cn("size-4 transition-transform", open.includes(i) && "rotate-180")} />
            </button>
            {open.includes(i) && m.lessons.map((l) => {
              const isDone = l.state === "done" || (l.state === "current" && done);
              return (
                <div key={l.n} className={cn("flex items-center gap-3 px-5 py-2.5 text-sm", l.state === "current" && "border-l-4 border-accent bg-accent/10")}>
                  {isDone ? <CheckCircle2 className="size-4 text-success" /> : l.state === "current" ? <PlayCircle className="size-4" /> : l.quiz ? <ClipboardCheck className="size-4 text-muted-foreground" /> : <Lock className="size-4 text-muted-foreground" />}
                  <div className="flex-1"><div className={cn("font-medium", l.state === "locked" && "text-muted-foreground")}>{l.n}. {l.title}</div><div className="text-xs text-muted-foreground">{l.state === "current" ? `Reproduzindo agora • ${l.duration}` : l.duration}</div></div>
                </div>
              );
            })}
          </div>
        ))}
        <div className="p-4"><Button variant="outline" className="w-full" onClick={() => toast("Conclua todas as aulas e a avaliação final com nota mínima 8.0.")}><BadgeCheck /> Verificar requisitos do certificado</Button></div>
      </aside>
    </div>
  );
}
