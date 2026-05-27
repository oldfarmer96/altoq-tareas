export interface FormData {
  tipo: string;
  materia: string;
  descripcion: string;
  tieneArchivos: string;
  linkArchivos: string;
  fechaEntrega: string;
  extension: string;
  extensionCustom: string;
  esUrgente: boolean;
  nombre: string;
  email: string;
  whatsapp: string;
  aceptaPrivacidad: boolean;
  aceptaConfidencialidad: boolean;
}

export const tiposTrabajo = [
  "Ensayo",
  "Informe",
  "Trabajo monográfico",
  "Tesis",
  "Ejercicios",
  "Presentación",
  "Código",
  "Investigación",
  "Otro",
];

export const extensiones = [
  "Menos de 5 páginas",
  "5-15 páginas",
  "15-30 páginas",
  "Más de 30 páginas",
  "Otro",
];

export const initialFormData: FormData = {
  tipo: "",
  materia: "",
  descripcion: "",
  tieneArchivos: "no",
  linkArchivos: "",
  fechaEntrega: "",
  extension: "",
  extensionCustom: "",
  esUrgente: false,
  nombre: "",
  email: "",
  whatsapp: "",
  aceptaPrivacidad: false,
  aceptaConfidencialidad: false,
};
