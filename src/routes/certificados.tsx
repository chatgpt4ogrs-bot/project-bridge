import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import logoMain from "@/assets/ancora-logo-main.png.asset.json";
import logoRev from "@/assets/ancora-logo-rev.png.asset.json";
import { certificates, student, type Certificate } from "@/lib/academy-data";

export const Route = createFileRoute("/certificados")({
  head: () => ({
    meta: [
      { title: "Meus Certificados — Âncora Academy" },
      { name: "description", content: "Certificados de capacitação emitidos pela universidade corporativa Âncora." },
      { property: "og:title", content: "Meus Certificados — Âncora Academy" },
      { property: "og:description", content: "Certificados de capacitação emitidos pela universidade corporativa Âncora." },
    ],
  }),
  component: Certificates,
});

function Certificates() {
  const [view, setView] = useState<Certificate | null>(null);
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="card-surface flex flex-wrap items-center gap-5 p-6">
        <img src={student.photo} alt={student.fullName} className="size-16 rounded-full object-cover ring-2 ring-accent" />
        <div className="flex-1">
          <h1 className="text-xl font-extrabold md:text-[26px]">{student.fullName}</h1>
          <p className="text-sm text-muted-foreground">Matrícula: {student.registration} • {student.role} • Certificação {student.level}</p>
        </div>
        <div className="flex gap-6">
          <div><div className="label-caps text-muted-foreground">Certificados emitidos</div><div className="text-[34px] font-extrabold leading-none">06</div></div>
          <div><div className="label-caps text-muted-foreground">Horas acumuladas</div><div className="text-[34px] font-extrabold leading-none">42h</div></div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {certificates.map((c) => (
          <div key={c.id} className="card-surface overflow-hidden">
            <div className="relative bg-primary p-5 text-primary-foreground">
              <BadgeCheck className="absolute right-4 top-4 size-6 text-sidebar-primary" />
              <img src={logoRev.url} alt="Âncora Segurança" className="h-12 w-auto" />
              <div className="label-caps mt-4 text-sidebar-primary">Certificado oficial</div>
              <h3 className="mt-1 font-bold leading-snug">{c.title}</h3>
            </div>
            <dl className="grid grid-cols-2 gap-3 p-5 text-sm">
              {[["Colaborador", student.name], ["Carga horária", `${c.hours} horas`], ["Conclusão", c.date], ["Código", c.code]].map(([k, v]) => (
                <div key={k}><dt className="text-xs text-muted-foreground">{k}:</dt><dd className="font-semibold">{v}</dd></div>
              ))}
            </dl>
            <div className="flex gap-2 border-t border-border p-4">
              <Button className="flex-1" onClick={() => setView(c)}><Eye /> Visualizar</Button>
              <Button variant="outline" size="icon" aria-label="Baixar" onClick={() => toast("PDF indisponível nesta prévia")}><Download /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><BadgeCheck className="size-5" /> Visualização do certificado corporativo</DialogTitle></DialogHeader>
          {view && (
            <div className="rounded-[14px] border-4 border-double border-accent bg-background p-8 text-center">
              <img src={logoMain.url} alt="Âncora Segurança Patrimonial" className="mx-auto h-28 w-auto mix-blend-multiply" />
              <div className="label-caps text-muted-foreground">Universidade Corporativa</div>
              <h2 className="mt-6 text-2xl font-extrabold md:text-[34px]">Certificado de Capacitação</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">Certificamos que o colaborador abaixo concluiu com aproveitamento satisfatório o treinamento corporativo operacional.</p>
              <div className="label-caps mt-6 text-muted-foreground">Colaborador concluinte</div>
              <div className="text-xl font-bold">{student.fullName}</div>
              <div className="text-xs text-muted-foreground">Matrícula Funcional: {student.registration}</div>
              <div className="label-caps mt-5 text-muted-foreground">Treinamento concluído</div>
              <div className="font-bold">{view.title}</div>
              <div className="text-xs text-muted-foreground">Carga horária total de {view.hours} horas</div>
              <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
                <div className="border-t border-outline-strong pt-2"><div className="font-semibold">Carlos Mendonça</div><div className="text-xs text-muted-foreground">Coordenação Operacional</div></div>
                <div className="border-t border-outline-strong pt-2"><div className="font-semibold">Diretoria Âncora</div><div className="text-xs text-muted-foreground">Recursos Humanos</div></div>
              </div>
              <div className="mt-6 flex justify-between text-xs text-muted-foreground"><span>Concluído em: {view.date}</span><span>Autenticidade: {view.code}</span></div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setView(null)}>Fechar</Button>
            <Button variant="gold" onClick={() => toast("PDF indisponível nesta prévia")}><Download /> Baixar certificado em PDF</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
