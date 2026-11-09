import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle, Award, BookOpen, CheckCircle2, Clock, BadgeCheck, User, Play, ChevronRight, ArrowRight, Shield, Brain, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseThumb, ProgressBar, Tag } from "@/components/academy/AppShell";
import { courses, student } from "@/lib/academy-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meu Painel — Âncora Academy" },
      { name: "description", content: "Acompanhe seus treinamentos, horas e certificados na universidade corporativa Âncora." },
      { property: "og:title", content: "Meu Painel — Âncora Academy" },
      { property: "og:description", content: "Acompanhe seus treinamentos, horas e certificados na universidade corporativa Âncora." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const inProgress = courses.filter((c) => c.status === "andamento");
  const stats = [
    { label: "Cursos em Andamento", value: "03", sub: "1 prioritário", icon: BookOpen },
    { label: "Cursos Concluídos", value: "08", sub: "+2 este mês", icon: CheckCircle2 },
    { label: "Horas de Treinamento", value: "42h", sub: "Meta 50h/ano", icon: Clock },
    { label: "Certificados Válidos", value: "06", sub: "Ver todos", icon: BadgeCheck },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-12">
      <section className="relative overflow-hidden rounded-[20px] bg-primary p-8 text-primary-foreground md:p-10">
        <Shield className="absolute -right-10 -top-10 size-64 text-sidebar-accent" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Tag tone="gold"><Shield className="size-3" /> Universidade Corporativa Âncora</Tag>
            <h1 className="mt-4 text-[28px] font-extrabold leading-9 tracking-tight md:text-[40px] md:leading-[48px]">Olá, {student.name}.</h1>
            <p className="mt-3 max-w-xl text-sidebar-foreground">Continue aprendendo e desenvolvendo suas habilidades técnicas em segurança patrimonial e procedimentos operacionais padrão.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gold" size="lg" asChild><Link to="/aulas"><PlayCircle /> Continuar aula atual</Link></Button>
              <Button variant="onDark" size="lg" asChild><Link to="/cursos">Explorar catálogo completo</Link></Button>
            </div>
          </div>
          <div className="rounded-[14px] border border-sidebar-border bg-sidebar-accent p-5">
            <Award className="size-8 text-sidebar-primary" />
            <div className="label-caps mt-3 text-sidebar-primary">{student.level}</div>
            <div className="text-lg font-bold">Vigilante Qualificado</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-sidebar-foreground"><CheckCircle2 className="size-3.5 text-success" /> Reciclagem em dia</div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold">Resumo do aprendizado</h2>
          <span className="text-xs text-muted-foreground">Última atualização: Hoje, 08:30</span>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-surface p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">{s.label}</span>
                <s.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="mt-3 text-[34px] font-extrabold leading-none">{s.value}</div>
              <div className="mt-2 text-xs font-medium text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Continue de onde parou</h2>
            <p className="text-sm text-muted-foreground">Retome seus treinamentos em andamento exatamente onde parou.</p>
          </div>
          <Tag>3 treinamentos</Tag>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {inProgress.map((c) => (
            <div key={c.id} className="card-surface flex flex-col overflow-hidden transition-shadow hover:shadow-lift">
              <div className="relative">
                <CourseThumb image={c.image} title={c.title} className="h-40" />
                <div className="absolute left-3 top-3"><Tag tone="dark">{c.tag}</Tag></div>
                <div className="absolute right-3 top-3"><Tag tone="gold">Aula {c.currentLesson} de {c.lessons}</Tag></div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-bold leading-snug">{c.title}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><User className="size-3.5" /> {c.instructor}</div>
                <div className="mt-4 flex justify-between text-xs font-semibold"><span>Progresso</span><span>{c.progress}% concluído</span></div>
                <ProgressBar value={c.progress} className="mt-2" />
                <p className="mt-3 text-xs text-muted-foreground">Próxima aula: <span className="font-semibold text-foreground">{c.nextLesson}</span></p>
                <Button className="mt-5 w-full" asChild><Link to="/aulas"><Play /> Continuar aprendendo</Link></Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <CourseList
          title="Recomendados para você"
          sub="Baseado na sua função de Vigilância Patrimonial."
          items={[
            { id: "alarmes", tag: "Monitoramento de Alarmes", title: "Sistemas de Alarme e Telemetria Integrada", meta: "4 horas • 8 aulas • Certificado incluso", image: courses[3]?.image },
            { id: "atendimento", tag: "Atendimento ao Cliente", title: "Excelência em Atendimento e Gerenciamento de Conflitos", meta: "3 horas • 6 aulas • Obrigatório", image: courses[5]?.image },
          ]}
        />
        <CourseList
          title="Novos treinamentos"
          sub="Conteúdos e atualizações operacionais recentes."
          items={[
            { id: "ia-cameras", tag: "Sistemas e Tecnologia", title: "Inteligência Artificial Aplicada a Radares e Câmeras", meta: "6 horas • 10 aulas • Adicionado esta semana", icon: Brain },
            { id: "evacuacao", tag: "Segurança Patrimonial", title: "Plano de Evacuação e Primeiros Socorros em Edifícios", meta: "5 horas • 7 aulas • Reciclagem Obrigatória", icon: Siren },
          ]}
        />
      </div>
    </div>
  );
}

function CourseList({ title, sub, items }: { title: string; sub: string; items: { id: string; tag: string; title: string; meta: string; image?: string | undefined; icon?: typeof Brain }[] }) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{sub}</p>
        </div>
        <Link to="/cursos" className="flex items-center gap-1 text-sm font-semibold hover:underline">Ver todos <ArrowRight className="size-4" /></Link>
      </div>
      <div className="space-y-3">
        {items.map((i) => (
          <Link key={i.id} to="/cursos/$courseId" params={{ courseId: i.id }} className="card-surface flex items-center gap-4 p-3 transition-shadow hover:shadow-lift">
            {i.image ? (
              <img src={i.image} alt="" className="size-20 shrink-0 rounded-[10px] object-cover" />
            ) : (
              <div className="flex size-20 shrink-0 items-center justify-center rounded-[10px] bg-primary text-sidebar-primary">{i.icon && <i.icon className="size-8" />}</div>
            )}
            <div className="min-w-0 flex-1">
              <div className="label-caps text-muted-foreground">{i.tag}</div>
              <div className="mt-1 font-bold leading-snug">{i.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{i.meta}</div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </section>
  );
}
