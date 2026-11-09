import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Anchor, LayoutDashboard, Library, PlayCircle, BadgeCheck, ShieldCheck, Bell, Search, PanelLeftClose, PanelLeftOpen, Menu,
} from "lucide-react";
import logoRev from "@/assets/ancora-logo-rev.png.asset.json";
import logoIcon from "@/assets/ancora-logo-icon.png.asset.json";
import { student } from "@/lib/academy-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Meu Painel", icon: LayoutDashboard },
  { to: "/cursos", label: "Catálogo de Cursos", icon: Library },
  { to: "/aulas", label: "Ambiente de Aulas", icon: PlayCircle },
  { to: "/certificados", label: "Meus Certificados", icon: BadgeCheck },
] as const;

function NavItem({ to, label, icon: Icon, collapsed, onClick }: { to: string; label: string; icon: typeof Anchor; collapsed: boolean; onClick?: () => void }) {
  const { pathname } = useLocation();
  const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
        active ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-0",
      )}
      title={label}
    >
      <Icon className="size-5 shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const sidebar = (isMobile: boolean) => {
    const c = collapsed && !isMobile;
    return (
      <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
        <div className={cn("flex h-[84px] items-center gap-2 border-b border-sidebar-border px-4", c && "justify-center px-0")}>
          <img src={logoRev.url} alt="Âncora Segurança Patrimonial" className={cn("object-contain", c ? "size-12" : "h-[68px] w-auto")} />
          {!c && <div className="label-caps text-sidebar-primary">Academy</div>}
          {!isMobile && (
            <button onClick={() => setCollapsed(!collapsed)} className={cn("ml-auto rounded-md p-1.5 hover:bg-sidebar-accent", c && "hidden")} aria-label="Recolher menu">
              <PanelLeftClose className="size-4" />
            </button>
          )}
        </div>
        {c && (
          <button onClick={() => setCollapsed(false)} className="mx-auto mt-3 rounded-md p-1.5 hover:bg-sidebar-accent" aria-label="Expandir menu">
            <PanelLeftOpen className="size-4" />
          </button>
        )}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((n) => <NavItem key={n.to} {...n} collapsed={c} onClick={() => setMobileOpen(false)} />)}
          {!c && <div className="label-caps mt-6 mb-1 px-3 text-sidebar-foreground/60">Gestão</div>}
          {c && <div className="my-3 border-t border-sidebar-border" />}
          <NavItem to="/admin" label="Área Administrativa" icon={ShieldCheck} collapsed={c} onClick={() => setMobileOpen(false)} />
        </nav>
        <div className={cn("flex items-center gap-3 border-t border-sidebar-border p-4", c && "justify-center p-3")}>
          <img src={student.photo} alt={`Foto de ${student.name}`} className="size-9 rounded-full object-cover ring-2 ring-sidebar-primary" />
          {!c && (
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold text-primary-foreground">{student.name}</div>
              <div className="truncate text-xs">{student.role}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <aside className={cn("sticky top-0 hidden h-screen shrink-0 transition-[width] duration-200 lg:block", collapsed ? "w-[76px]" : "w-[260px]")}>
        {sidebar(false)}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[260px]">{sidebar(true)}</div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[68px] items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur md:px-8">
          <button className="rounded-md p-2 hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu className="size-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar treinamentos, aulas ou procedimentos..." className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/40" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative rounded-lg p-2 hover:bg-muted" aria-label="Notificações">
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent ring-2 ring-card" />
              </button>
              {notifOpen && (
                <div className="card-surface absolute right-0 top-12 w-80 p-2 shadow-lift">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-bold">Notificações</span>
                    <button onClick={() => setNotifOpen(false)} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Marcar lidas</button>
                  </div>
                  {[
                    ["Novo Treinamento Disponível", "Procedimentos Operacionais de CFTV 2026."],
                    ["Certificado Emitido!", "Você concluiu Defesa Pessoal e Práticas de Segurança."],
                  ].map(([t, d]) => (
                    <div key={t} className="rounded-lg px-3 py-2.5 hover:bg-muted">
                      <div className="text-sm font-semibold">{t}</div>
                      <div className="text-xs text-muted-foreground">{d}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right leading-tight">
                <div className="text-sm font-semibold">{student.name}</div>
                <div className="text-xs text-muted-foreground">{student.post}</div>
              </div>
              <img src={student.photo} alt="" className="size-9 rounded-full object-cover" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "gold" | "success" | "dark" }) {
  const tones = {
    default: "bg-muted text-muted-foreground",
    gold: "bg-accent text-accent-foreground",
    success: "bg-success/10 text-success",
    dark: "bg-primary text-primary-foreground",
  };
  return <span className={cn("label-caps inline-flex items-center gap-1 rounded-md px-2 py-1", tones[tone])}>{children}</span>;
}

export function CourseThumb({ image, title, className }: { image?: string | undefined; title: string; className?: string }) {
  return image ? (
    <img src={image} alt={title} className={cn("w-full object-cover", className)} loading="lazy" />
  ) : (
    <div className={cn("flex w-full items-center justify-center bg-muted", className)}>
      <img src={logoIcon.url} alt="" className="h-3/4 max-h-28 object-contain" />
    </div>
  );
}
