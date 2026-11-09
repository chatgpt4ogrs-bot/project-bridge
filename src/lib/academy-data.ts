import cftv from "@/assets/curso-cftv.jpg.asset.json";
import acesso from "@/assets/curso-acesso.jpg.asset.json";
import ronda from "@/assets/curso-ronda.jpg.asset.json";
import alarmes from "@/assets/curso-alarmes.jpg.asset.json";
import atendimento from "@/assets/curso-atendimento.jpg.asset.json";
import aluno from "@/assets/aluno-marcos.jpg.asset.json";
import instrutor from "@/assets/instrutor-carlos.jpg.asset.json";

export const student = {
  name: "Marcos Vinícius",
  fullName: "Marcos Vinícius dos Santos",
  role: "Vigilante Patrimonial",
  post: "Posto Matriz • Turno A",
  registration: "ANC-2024-884",
  level: "Nível 3",
  photo: aluno.url,
};

export const instructorPhoto = instrutor.url;

export type CourseStatus = "andamento" | "nao-iniciado" | "concluido";

export type Course = {
  id: string;
  title: string;
  category: string;
  tag: string;
  instructor: string;
  hours: number;
  lessons: number;
  progress: number;
  status: CourseStatus;
  image?: string;
  code: string;
  nextLesson?: string;
  currentLesson?: number;
};

export const courses: Course[] = [
  { id: "cftv", title: "Operação de CFTV e Videomonitoramento Integrado", category: "CFTV e Videomonitoramento", tag: "CFTV & Vídeo", instructor: "Cap. Carlos Mendonça", hours: 8, lessons: 8, progress: 62, status: "andamento", image: cftv.url, code: "POP-SEC-012", nextLesson: "Análise de Comportamento Suspeito", currentLesson: 5 },
  { id: "acesso", title: "Controle de Acesso Biométrico e Portaria Remota", category: "Controle de Acesso", tag: "Controle de Acesso", instructor: "Mariana Duarte", hours: 4, lessons: 6, progress: 33, status: "andamento", image: acesso.url, code: "POP-SEC-018", nextLesson: "Protocolos de Entrada de Prestadores", currentLesson: 2 },
  { id: "ronda", title: "Procedimentos de Ronda e Prontidão Patrimonial", category: "Procedimentos Operacionais", tag: "Operacional", instructor: "Ten. Fernando Guimarães", hours: 10, lessons: 10, progress: 90, status: "andamento", image: ronda.url, code: "POP-SEC-021", nextLesson: "Relatório Final de Ocorrência", currentLesson: 9 },
  { id: "alarmes", title: "Sistemas de Alarme e Telemetria Integrada", category: "Monitoramento de Alarmes", tag: "Alarmes", instructor: "Ricardo Vasconcelos", hours: 4, lessons: 8, progress: 0, status: "nao-iniciado", image: alarmes.url, code: "POP-SEC-024" },
  { id: "integracao", title: "Integração Institucional Âncora e Código de Ética", category: "Integração de Colaboradores", tag: "Integração", instructor: "Diretoria de RH & Operações", hours: 6, lessons: 6, progress: 100, status: "concluido", code: "ANC-INT-001" },
  { id: "atendimento", title: "Excelência em Atendimento e Resolução de Conflitos", category: "Atendimento ao Cliente", tag: "Atendimento", instructor: "Juliana Brandão", hours: 3, lessons: 5, progress: 100, status: "concluido", image: atendimento.url, code: "ANC-ATE-002" },
  { id: "evacuacao", title: "Plano de Evacuação e Prevenção de Incêndios", category: "Procedimentos Operacionais", tag: "Segurança Patrimonial", instructor: "Bombeiro Civil Marcos Prado", hours: 5, lessons: 7, progress: 0, status: "nao-iniciado", code: "POP-SEC-027" },
  { id: "ia-cameras", title: "Inteligência Artificial Aplicada a Radares e Câmeras", category: "CFTV e Videomonitoramento", tag: "Sistemas e TI", instructor: "Eng. Lucas Fontes", hours: 6, lessons: 10, progress: 0, status: "nao-iniciado", code: "POP-SEC-029" },
];

export const categories = [
  "CFTV e Videomonitoramento",
  "Controle de Acesso",
  "Procedimentos Operacionais",
  "Monitoramento de Alarmes",
  "Integração de Colaboradores",
  "Atendimento ao Cliente",
];

export type Lesson = { n: number; title: string; duration: string; state: "done" | "current" | "locked"; quiz?: boolean };
export type Module = { title: string; lessons: Lesson[] };

export const cftvModules: Module[] = [
  { title: "Fundamentos de Sistemas de CFTV e Câmeras", lessons: [
    { n: 1, title: "Tipos de Câmeras (Bullet, Dome, PTZ e Térmicas)", duration: "45 min", state: "done" },
    { n: 2, title: "Arquitetura de Gravação, NVR e Armazenamento em Nuvem", duration: "1h 15min", state: "done" },
  ]},
  { title: "Técnicas de Observação e Identificação de Riscos", lessons: [
    { n: 3, title: "Mapeamento de Pontos Cegos e Zonas Críticas", duration: "50 min", state: "done" },
    { n: 4, title: "Técnicas de Varredura Visual Perimetral", duration: "1h 00min", state: "done" },
    { n: 5, title: "Análise de Comportamento Suspeito e Triagem", duration: "1h 10min", state: "current" },
  ]},
  { title: "Protocolos de Acionamento e Relatório de Incidentes", lessons: [
    { n: 6, title: "Cadeia de Comunicação com Equipes em Campo", duration: "45 min", state: "locked" },
    { n: 7, title: "Exportação Segura de Evidências e Cadeia de Custódia", duration: "1h 00min", state: "locked" },
    { n: 8, title: "Simulado Prático e Avaliação Final de Conclusão", duration: "1h 15min", state: "locked", quiz: true },
  ]},
];

export type Certificate = { id: string; title: string; hours: number; date: string; code: string };
export const certificates: Certificate[] = [
  { id: "1", title: "Integração Institucional e Código de Conduta", hours: 6, date: "15 de Janeiro de 2026", code: "ANC-INT-2026-091" },
  { id: "2", title: "Excelência em Atendimento e Resolução de Conflitos", hours: 3, date: "28 de Janeiro de 2026", code: "ANC-ATE-2026-302" },
  { id: "3", title: "Técnicas de Defesa Pessoal e Uso Progressivo da Força", hours: 12, date: "10 de Fevereiro de 2026", code: "ANC-DEF-2026-114" },
];

export function filterCourses(list: Course[], opts: { status: CourseStatus | "all"; category: string; query: string }) {
  const q = opts.query.trim().toLowerCase();
  return list.filter(
    (c) =>
      (opts.status === "all" || c.status === opts.status) &&
      (opts.category === "all" || c.category === opts.category) &&
      (!q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)),
  );
}
