import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Filter, Clock, ArrowRight, PlayCircle, Award, CheckCircle2, SearchX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseThumb, ProgressBar, Tag } from "@/components/academy/AppShell";
import { categories, courses, filterCourses, type CourseStatus } from "@/lib/academy-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cursos/")({
  head: () => ({
    meta: [
      { title: "Catálogo de Cursos — Âncora Academy" },
      { name: "description", content: "Todos os treinamentos operacionais, cursos técnicos e certificações internas da Âncora." },
      { property: "og:title", content: "Catálogo de Cursos — Âncora Academy" },
      { property: "og:description", content: "Todos os treinamentos operacionais, cursos técnicos e certificações internas da Âncora." },
    ],
  }),
  component: Catalog,
});

const tabs: { key: CourseStatus | "all"; label: string }[] = [
  { key: "all", label: "Todos os cursos" },
  { key: "andamento", label: "Em andamento" },
  { key: "nao-iniciado", label: "Não iniciados" },
  { key: "concluido", label: "Concluídos" },
];

function Catalog() {
  const [status, setStatus] = useState<CourseStatus | "all">("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState<"grid" | "list">("grid");

  const list = useMemo(() => {
    const l = filterCourses(courses, { status, category, query });
    if (sort === "name") return [...l].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "progress") return [...l].sort((a, b) => b.progress - a.progress);
    if (sort === "hours") return [...l].sort((a, b) => b.hours - a.hours);
    return l;
  }, [status, category, query, sort]);

  const count = (k: CourseStatus | "all") => (k === "all" ? courses.length : courses.filter((c) => c.status === k).length);
  const reset = () => { setStatus("all"); setCategory("all"); setQuery(""); };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <div className="text-xs text-muted-foreground"><Link to="/" className="hover:underline">Início</Link> / Biblioteca de Treinamentos</div>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-extrabold md:text-[34px] md:leading-[42px]">Catálogo de cursos e procedimentos</h1>
            <p className="mt-1 text-muted-foreground">Acesse todos os treinamentos operacionais, cursos técnicos e certificações internas da Âncora.</p>
          </div>
          <div className="flex rounded-lg border border-border bg-card p-1">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} aria-label={v} className={cn("rounded-md p-2", view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                {v === "grid" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-surface space-y-4 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setStatus(t.key)} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors", status === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>
                {t.label}
                <span className={cn("rounded-md px-1.5 text-xs", status === t.key ? "bg-accent text-accent-foreground" : "bg-muted")}>{count(t.key)}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar curso ou instrutor" className="h-9 w-56 rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-accent" />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">Ordenar por:
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-2 font-semibold text-foreground">
                <option value="recent">Mais recentes</option>
                <option value="name">Nome (A - Z)</option>
                <option value="progress">Maior progresso</option>
                <option value="hours">Carga horária</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="flex items-center gap-1 text-sm font-semibold"><Filter className="size-4" /> Categorias:</span>
          {["all", ...categories].map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={cn("rounded-full border px-3 py-1 text-xs font-semibold transition-colors", category === c ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card hover:border-outline-strong")}>
              {c === "all" ? "Todas" : c}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="card-surface flex flex-col items-center p-16 text-center">
          <SearchX className="size-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-bold">Nenhum treinamento encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">Tente buscar por outro termo ou ajuste os filtros de categoria e situação.</p>
          <Button variant="outline" className="mt-5" onClick={reset}>Limpar filtros</Button>
        </div>
      ) : (
        <div className={cn(view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4" : "space-y-3")}>
          {list.map((c) => (
            <div key={c.id} className={cn("card-surface overflow-hidden transition-shadow hover:shadow-lift", view === "list" ? "flex" : "flex flex-col")}>
              <Link to="/cursos/$courseId" params={{ courseId: c.id }} className={cn("relative block", view === "list" && "w-48 shrink-0")}>
                <CourseThumb image={c.image} title={c.title} className={view === "list" ? "h-full min-h-32" : "h-36"} />
                <div className="absolute left-3 top-3"><Tag tone="dark">{c.tag}</Tag></div>
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between text-xs">
                  {c.status === "concluido" ? <Tag tone="success"><CheckCircle2 className="size-3" /> 100%</Tag> : c.status === "andamento" ? <Tag tone="gold">{c.progress}% concluído</Tag> : <Tag>Não iniciado</Tag>}
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="size-3.5" /> {c.hours}h • {c.lessons} aulas</span>
                </div>
                <Link to="/cursos/$courseId" params={{ courseId: c.id }} className="mt-3 font-bold leading-snug hover:underline">{c.title}</Link>
                <p className="mt-1 text-xs text-muted-foreground">Instrutor: {c.instructor}</p>
                {c.status === "andamento" && <ProgressBar value={c.progress} className="mt-3" />}
                <div className="mt-auto pt-4">
                  {c.status === "andamento" && <Button className="w-full" asChild><Link to="/aulas">Continuar curso <ArrowRight /></Link></Button>}
                  {c.status === "nao-iniciado" && <Button variant="gold" className="w-full" asChild><Link to="/cursos/$courseId" params={{ courseId: c.id }}><PlayCircle /> Iniciar treinamento</Link></Button>}
                  {c.status === "concluido" && <Button variant="outline" className="w-full" asChild><Link to="/certificados"><Award /> Ver certificado</Link></Button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
