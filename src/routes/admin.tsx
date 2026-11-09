import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Eye, Archive, Trash2, ArrowUp, TrendingUp, Check, BarChart3, ArrowLeft, Info, Network, GripVertical, PlayCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/academy/AppShell";
import { categories } from "@/lib/academy-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Área Administrativa — Âncora Academy" },
      { name: "description", content: "Gestão de treinamentos, indicadores e cadastro de cursos da universidade corporativa Âncora." },
      { property: "og:title", content: "Área Administrativa — Âncora Academy" },
      { property: "og:description", content: "Gestão de treinamentos, indicadores e cadastro de cursos da universidade corporativa Âncora." },
    ],
  }),
  component: Admin,
});

type Row = { title: string; code: string; category: string; instructor: string; load: string; status: "Publicado" | "Rascunho" };
const initialRows: Row[] = [
  { title: "Operação de CFTV e Videomonitoramento Integrado", code: "POP-SEC-012", category: "CFTV e Videomonitoramento", instructor: "Cap. Carlos Mendonça", load: "8h • 8 aulas (3 mód.)", status: "Publicado" },
  { title: "Controle de Acesso Biométrico e Portaria Remota", code: "POP-SEC-018", category: "Controle de Acesso", instructor: "Mariana Duarte", load: "4h • 6 aulas (2 mód.)", status: "Publicado" },
  { title: "Procedimentos de Ronda e Prontidão Patrimonial", code: "POP-SEC-021", category: "Procedimentos Operacionais", instructor: "Ten. Fernando Guimarães", load: "10h • 10 aulas (3 mód.)", status: "Publicado" },
  { title: "Sistemas de Alarme e Telemetria Integrada", code: "POP-SEC-024", category: "Monitoramento de Alarmes", instructor: "Ricardo Vasconcelos", load: "4h • 8 aulas (2 mód.)", status: "Publicado" },
  { title: "Gestão de Crises e Negociação em Ocorrências", code: "POP-SEC-030", category: "Procedimentos Operacionais", instructor: "Ten. Fernando Guimarães", load: "6h • 5 aulas (Em criação)", status: "Rascunho" },
];

const metrics = [
  { l: "Colaboradores", v: "480", s: "98% ativos", I: ArrowUp },
  { l: "Cursos publicados", v: "14", s: "+2 em rascunho" },
  { l: "Matrículas totais", v: "1.240", s: "+15% este mês", I: TrendingUp },
  { l: "Taxa de conclusão", v: "84.2%", s: "Acima da meta", I: Check },
  { l: "Horas totais", v: "3.480h", s: "Segurança corporativa" },
];

function Admin() {
  const [mode, setMode] = useState<"list" | "new">("list");
  const [rows, setRows] = useState(initialRows);
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [q, setQ] = useState("");
  const visible = rows.filter((r) => (cat === "all" || r.category === cat) && (status === "all" || r.status === status) && r.title.toLowerCase().includes(q.toLowerCase()));

  if (mode === "new") return <NewCourse onBack={() => setMode("list")} onSave={(r) => { setRows([r, ...rows]); setMode("list"); toast.success(r.status === "Publicado" ? "Treinamento publicado" : "Rascunho salvo"); }} />;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-caps text-muted-foreground">Gestão</div>
          <h1 className="text-[24px] font-extrabold md:text-[34px] md:leading-[42px]">Painel administrativo</h1>
          <p className="text-muted-foreground">Gerencie treinamentos, módulos e acompanhe os indicadores da universidade corporativa.</p>
        </div>
        <Button variant="gold" size="lg" onClick={() => setMode("new")}><Plus /> Novo treinamento</Button>
      </div>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold"><BarChart3 className="size-5" /> Indicadores de treinamento corporativo</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {metrics.map((m) => (
            <div key={m.l} className="card-surface p-5">
              <div className="text-xs font-semibold text-muted-foreground">{m.l}</div>
              <div className="mt-2 text-[28px] font-extrabold leading-none">{m.v}</div>
              <div className="mt-2 flex items-center gap-1 text-xs font-medium text-success">{m.I && <m.I className="size-3.5" />}{m.s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card-surface overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar treinamento" className="h-9 w-full max-w-xs rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-accent" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-2 text-sm font-semibold">
            <option value="all">Todas as categorias</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-2 text-sm font-semibold">
            <option value="all">Todos os status</option>
            <option value="Publicado">Publicados</option>
            <option value="Rascunho">Rascunhos</option>
          </select>
          <span className="text-sm text-muted-foreground">Mostrando <b className="text-foreground">{visible.length}</b> treinamentos cadastrados</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>{["Treinamento", "Categoria", "Instrutor", "Carga / Aulas", "Status", "Ações"].map((h) => <th key={h} className="label-caps px-4 py-3 text-muted-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((r) => (
                <tr key={r.code} className="hover:bg-muted/40">
                  <td className="px-4 py-3"><div className="font-semibold">{r.title}</div><div className="text-xs text-muted-foreground">Código: {r.code}</div></td>
                  <td className="px-4 py-3"><Tag>{r.category}</Tag></td>
                  <td className="px-4 py-3">{r.instructor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.load}</td>
                  <td className="px-4 py-3"><Tag tone={r.status === "Publicado" ? "success" : "gold"}>{r.status}</Tag></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" aria-label="Editar"><Pencil /></Button>
                      {r.status === "Publicado" ? <Button variant="ghost" size="icon" aria-label="Visualizar"><Eye /></Button> : null}
                      <Button variant="ghost" size="icon" aria-label={r.status === "Publicado" ? "Arquivar" : "Excluir"} onClick={() => { setRows(rows.filter((x) => x.code !== r.code)); toast(r.status === "Publicado" ? "Treinamento arquivado" : "Rascunho excluído"); }}>
                        {r.status === "Publicado" ? <Archive /> : <Trash2 />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

const field = "mt-1.5 w-full rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/40";

function NewCourse({ onBack, onSave }: { onBack: () => void; onSave: (r: Row) => void }) {
  const [title, setTitle] = useState("Procedimentos de Inspeção Perimetral");
  const [category, setCategory] = useState<string>(categories[2] ?? "");
  const [instructor, setInstructor] = useState("Ten. Fernando Guimarães");
  const [hours, setHours] = useState(4);
  const [initial, setInitial] = useState<"Rascunho" | "Publicado">("Rascunho");
  const [modules, setModules] = useState([{ title: "Módulo 1: Preparação para a Ronda", lessons: [{ t: "Aula 1: Checagem de EPI, Lanterna e Rádio HT", m: "Vídeo: video_epi_ronda.mp4 (25 min) • 1 anexo" }, { t: "Aula 2: Registro Eletrônico em Bastão de Ronda", m: "Vídeo: video_bastao_ronda.mp4 (40 min) • 0 anexos" }] }]);
  const lessonCount = modules.reduce((a, m) => a + m.lessons.length, 0);

  const save = (s: Row["status"]) => {
    if (!title.trim()) {
      toast.error("Informe o nome do treinamento");
      return;
    }
    onSave({ title, code: `POP-SEC-${String(31 + Math.floor(Math.random() * 60)).padStart(3, "0")}`, category, instructor, load: `${hours}h • ${lessonCount} aulas (${modules.length} mód.)`, status: s });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Button variant="outline" size="icon" onClick={onBack} aria-label="Voltar"><ArrowLeft /></Button>
          <div>
            <h1 className="text-xl font-extrabold md:text-[26px]">Cadastro de novo treinamento</h1>
            <p className="text-sm text-muted-foreground">Preencha as informações básicas e adicione os módulos com suas respectivas aulas.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => save("Rascunho")}>Salvar como rascunho</Button>
          <Button variant="gold" onClick={() => save("Publicado")}>Publicar treinamento</Button>
        </div>
      </div>

      <section className="card-surface space-y-5 p-6">
        <h2 className="flex items-center gap-2 font-bold"><Info className="size-5" /> 1. Informações básicas do curso</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold">Nome do treinamento *<input value={title} onChange={(e) => setTitle(e.target.value)} className={field} /></label>
          <label className="text-sm font-semibold">Categoria oficial *
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          </label>
        </div>
        <label className="block text-sm font-semibold">Descrição do treinamento *
          <textarea rows={3} defaultValue="Capacitação operacional focada em padrões de inspeção de perímetros, identificação de vulnerabilidades físicas e manuseio de equipamentos de ronda eletrônica." className={field} />
        </label>
        <div className="grid gap-5 md:grid-cols-4">
          <label className="text-sm font-semibold md:col-span-2">Instrutor responsável<input value={instructor} onChange={(e) => setInstructor(e.target.value)} className={field} /></label>
          <label className="text-sm font-semibold">Carga horária (horas)<input type="number" min={1} value={hours} onChange={(e) => setHours(Number(e.target.value))} className={field} /></label>
          <label className="text-sm font-semibold">Público-alvo<input defaultValue="Vigilantes patrimoniais" className={field} /></label>
        </div>
        <div className="text-sm font-semibold">Status inicial
          <div className="mt-2 flex gap-3">
            {(["Rascunho", "Publicado"] as const).map((s) => (
              <button key={s} onClick={() => setInitial(s)} className={cn("rounded-[10px] border px-4 py-2.5 text-sm", initial === s ? "border-accent bg-accent/15 font-bold" : "border-border font-medium")}>
                {s === "Rascunho" ? "Rascunho (não visível aos alunos)" : "Publicado (imediato)"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card-surface space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold"><Network className="size-5" /> 2. Módulos e aulas</h2>
          <Button variant="outline" size="sm" onClick={() => setModules([...modules, { title: `Módulo ${modules.length + 1}: Novo módulo`, lessons: [] }])}><Plus /> Adicionar módulo</Button>
        </div>
        {modules.map((m, mi) => (
          <div key={mi} className="rounded-[10px] border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 p-3">
              <GripVertical className="size-4 text-muted-foreground" />
              <input value={m.title} onChange={(e) => setModules(modules.map((x, i) => (i === mi ? { ...x, title: e.target.value } : x)))} className="flex-1 bg-transparent text-sm font-bold outline-none" />
              <Button variant="ghost" size="sm" onClick={() => setModules(modules.map((x, i) => (i === mi ? { ...x, lessons: [...x.lessons, { t: `Aula ${x.lessons.length + 1}: Nova aula`, m: "Vídeo pendente • 0 anexos" }] } : x)))}><Plus /> Adicionar aula</Button>
              <Button variant="ghost" size="icon" aria-label="Excluir módulo" onClick={() => setModules(modules.filter((_, i) => i !== mi))}><Trash2 /></Button>
            </div>
            {m.lessons.map((l, li) => (
              <div key={li} className="flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-0">
                <GripVertical className="size-4 text-muted-foreground" />
                <PlayCircle className="size-4" />
                <div className="flex-1"><div className="text-sm font-semibold">{l.t}</div><div className="text-xs text-muted-foreground">{l.m}</div></div>
                <Button variant="ghost" size="icon" aria-label="Editar aula"><Pencil /></Button>
                <Button variant="ghost" size="icon" aria-label="Excluir aula" onClick={() => setModules(modules.map((x, i) => (i === mi ? { ...x, lessons: x.lessons.filter((_, j) => j !== li) } : x)))}><Trash2 /></Button>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
