import { useState } from "preact/hooks";

interface FormData {
  tipo: string;
  materia: string;
  descripcion: string;
  tieneArchivos: string;
  linkArchivos: string;
  fechaEntrega: string;
  extension: string;
  nombre: string;
  email: string;
  whatsapp: string;
  aceptaPrivacidad: boolean;
  aceptaConfidencialidad: boolean;
}

const tiposTrabajo = [
  "Ensayo",
  "Tesis",
  "Ejercicios",
  "Presentación",
  "Código",
  "Investigación",
  "Otro",
];

const extensiones = [
  "Menos de 5 páginas",
  "5-15 páginas",
  "15-30 páginas",
  "Más de 30 páginas",
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    tipo: "",
    materia: "",
    descripcion: "",
    tieneArchivos: "no",
    linkArchivos: "",
    fechaEntrega: "",
    extension: "",
    nombre: "",
    email: "",
    whatsapp: "",
    aceptaPrivacidad: false,
    aceptaConfidencialidad: false,
  });

  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function validarPaso1(): boolean {
    if (!formData.tipo || !formData.materia || !formData.descripcion) {
      return false;
    }
    if (formData.descripcion.length < 20) {
      return false;
    }
    return true;
  }

  function validarPaso2(): boolean {
    if (formData.tieneArchivos !== "no" && !formData.linkArchivos) {
      return false;
    }
    if (!formData.fechaEntrega || !formData.extension) {
      return false;
    }
    const fechaMinima = new Date();
    fechaMinima.setDate(fechaMinima.getDate() + 1);
    if (new Date(formData.fechaEntrega) < fechaMinima) {
      return false;
    }
    return true;
  }

  function validarPaso3(): boolean {
    if (!formData.nombre || !formData.email) {
      return false;
    }
    if (!formData.aceptaPrivacidad || !formData.aceptaConfidencialidad) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    return true;
  }

  function siguientePaso() {
    if (step === 1 && validarPaso1()) {
      setStep(2);
    } else if (step === 2 && validarPaso2()) {
      setStep(3);
    }
  }

  function pasoAnterior() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  async function enviarFormulario() {
    if (!validarPaso3()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      window.location.href = "/gracias";
    } catch {
      setErrorMessage("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle = {
    borderColor: "var(--color-muted)",
  };

  const buttonBaseStyle = {
    transition: "all 0.2s ease",
    cursor: "pointer" as const,
  };

  return (
    <div class="w-full">
      {errorMessage && (
        <div
          class="mb-6 p-4 rounded-lg"
          style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
        >
          <p class="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: step >= 1 ? "var(--color-accent)" : "var(--color-muted)",
              color: step >= 1 ? "var(--color-primary)" : "white",
            }}
          >
            1
          </div>
          <div
            class="w-12 h-1 rounded"
            style={{
              backgroundColor: step >= 2 ? "var(--color-accent)" : "var(--color-muted)",
            }}
          ></div>
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: step >= 2 ? "var(--color-accent)" : "var(--color-muted)",
              color: step >= 2 ? "var(--color-primary)" : "white",
            }}
          >
            2
          </div>
          <div
            class="w-12 h-1 rounded"
            style={{
              backgroundColor: step >= 3 ? "var(--color-accent)" : "var(--color-muted)",
            }}
          ></div>
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: step >= 3 ? "var(--color-accent)" : "var(--color-muted)",
              color: step >= 3 ? "var(--color-primary)" : "white",
            }}
          >
            3
          </div>
        </div>
        <span class="text-sm" style={{ color: "var(--color-muted)" }}>
          Paso {step} de 3
        </span>
      </div>

      {step === 1 && (
        <div class="space-y-6">
          <div>
            <label
              for="tipo"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Tipo de trabajo *
            </label>
            <select
              id="tipo"
              value={formData.tipo}
              onChange={(e) => updateFormData("tipo", (e.target as HTMLSelectElement).value)}
              class="w-full px-4 py-3 rounded-lg border text-sm bg-white"
              style={inputStyle}
            >
              <option value="">Selecciona un tipo</option>
              {tiposTrabajo.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              for="materia"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Materia / Carrera *
            </label>
            <input
              id="materia"
              type="text"
              value={formData.materia}
              onInput={(e) => updateFormData("materia", (e.target as HTMLInputElement).value)}
              placeholder="Ej: Cálculo II - Ing. Civil"
              class="w-full px-4 py-3 rounded-lg border text-sm"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              for="descripcion"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Descripción de la tarea *
            </label>
            <textarea
              id="descripcion"
              value={formData.descripcion}
              onInput={(e) => updateFormData("descripcion", (e.target as HTMLTextAreaElement).value)}
              placeholder="Describe tu tarea con detalle: qué necesitas, qué temas abarca, requisitos del profesor..."
              rows={5}
              class="w-full px-4 py-3 rounded-lg border text-sm resize-none"
              style={inputStyle}
            ></textarea>
            <p class="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Mínimo 20 caracteres. ({formData.descripcion.length} caracteres)
            </p>
          </div>

          <button
            type="button"
            onClick={siguientePaso}
            disabled={!validarPaso1()}
            class="w-full py-3 rounded-lg font-semibold text-sm"
            style={{
              ...buttonBaseStyle,
              backgroundColor: validarPaso1() ? "var(--color-primary)" : "var(--color-muted)",
              color: "white",
              cursor: validarPaso1() ? "pointer" : "not-allowed",
            }}
          >
            Siguiente →
          </button>
        </div>
      )}

      {step === 2 && (
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold mb-3" style={{ color: "var(--color-text)" }}>
              ¿Tienes archivos de referencia?
            </label>
            <div class="space-y-2">
              {[
                { value: "no", label: "No tengo archivos" },
                { value: "google", label: "Tengo archivos en Google Drive" },
                { value: "onedrive", label: "Tengo archivos en OneDrive" },
              ].map((option) => (
                <label
                  key={option.value}
                  class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer"
                  style={{
                    borderColor:
                      formData.tieneArchivos === option.value
                        ? "var(--color-primary)"
                        : "var(--color-muted)",
                  }}
                >
                  <input
                    type="radio"
                    name="tieneArchivos"
                    value={option.value}
                    checked={formData.tieneArchivos === option.value}
                    onChange={() => updateFormData("tieneArchivos", option.value)}
                    class="w-4 h-4"
                  />
                  <span class="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {formData.tieneArchivos !== "no" && (
            <div>
              <label
                for="linkArchivos"
                class="block text-sm font-semibold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                Enlace compartido *
              </label>
              <input
                id="linkArchivos"
                type="url"
                value={formData.linkArchivos}
                onInput={(e) => updateFormData("linkArchivos", (e.target as HTMLInputElement).value)}
                placeholder="https://drive.google.com/..."
                class="w-full px-4 py-3 rounded-lg border text-sm"
                style={inputStyle}
              />
              <p class="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                Asegúrate que el enlace tenga permisos de lectura
              </p>
            </div>
          )}

          <div>
            <label
              for="fechaEntrega"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Fecha de entrega *
            </label>
            <input
              id="fechaEntrega"
              type="date"
              value={formData.fechaEntrega}
              onChange={(e) => {
                const minDate = new Date();
                minDate.setDate(minDate.getDate() + 1);
                updateFormData("fechaEntrega", (e.target as HTMLInputElement).value);
              }}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
              class="w-full px-4 py-3 rounded-lg border text-sm"
              style={inputStyle}
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-3" style={{ color: "var(--color-text)" }}>
              Extensión aproximada *
            </label>
            <div class="grid grid-cols-2 gap-2">
              {extensiones.map((ext) => (
                <label
                  key={ext}
                  class="p-3 rounded-lg border text-center text-sm cursor-pointer transition-all"
                  style={{
                    borderColor: formData.extension === ext ? "var(--color-primary)" : "var(--color-muted)",
                    backgroundColor: formData.extension === ext ? "var(--color-primary)" : "white",
                    color: formData.extension === ext ? "white" : "var(--color-text)",
                  }}
                >
                  <input
                    type="radio"
                    name="extension"
                    value={ext}
                    checked={formData.extension === ext}
                    onChange={() => updateFormData("extension", ext)}
                    class="sr-only"
                  />
                  {ext}
                </label>
              ))}
            </div>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              onClick={pasoAnterior}
              class="flex-1 py-3 rounded-lg font-semibold text-sm border"
              style={{
                ...buttonBaseStyle,
                borderColor: "var(--color-muted)",
                color: "var(--color-text)",
              }}
            >
              ← Atrás
            </button>
            <button
              type="button"
              onClick={siguientePaso}
              disabled={!validarPaso2()}
              class="flex-1 py-3 rounded-lg font-semibold text-sm"
              style={{
                ...buttonBaseStyle,
                backgroundColor: validarPaso2() ? "var(--color-primary)" : "var(--color-muted)",
                color: "white",
                cursor: validarPaso2() ? "pointer" : "not-allowed",
              }}
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div class="space-y-6">
          <div>
            <label
              for="nombre"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Tu nombre *
            </label>
            <input
              id="nombre"
              type="text"
              value={formData.nombre}
              onInput={(e) => updateFormData("nombre", (e.target as HTMLInputElement).value)}
              placeholder="Solo tu primer nombre"
              class="w-full px-4 py-3 rounded-lg border text-sm"
              style={inputStyle}
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              Correo electrónico *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onInput={(e) => updateFormData("email", (e.target as HTMLInputElement).value)}
              placeholder="tucorreo@gmail.com"
              class="w-full px-4 py-3 rounded-lg border text-sm"
              style={inputStyle}
            />
            <p class="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Te enviaremos la cotización a este correo
            </p>
          </div>

          <div>
            <label
              for="whatsapp"
              class="block text-sm font-semibold mb-2"
              style={{ color: "var(--color-text)" }}
            >
              WhatsApp (opcional)
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onInput={(e) => updateFormData("whatsapp", (e.target as HTMLInputElement).value)}
              placeholder="+51 9XX XXX XXX"
              class="w-full px-4 py-3 rounded-lg border text-sm"
              style={inputStyle}
            />
          </div>

          <div class="space-y-3 pt-2">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aceptaPrivacidad}
                onChange={(e) =>
                  updateFormData("aceptaPrivacidad", (e.target as HTMLInputElement).checked)
                }
                class="w-5 h-5 mt-0.5 rounded"
                style={{ accentColor: "var(--color-primary)" }}
              />
              <span class="text-sm" style={{ color: "var(--color-text)" }}>
                Acepto la{" "}
                <a href="/politica-de-privacidad" class="underline" target="_blank">
                  Política de Privacidad
                </a>{" "}
                *
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aceptaConfidencialidad}
                onChange={(e) =>
                  updateFormData("aceptaConfidencialidad", (e.target as HTMLInputElement).checked)
                }
                class="w-5 h-5 mt-0.5 rounded"
                style={{ accentColor: "var(--color-primary)" }}
              />
              <span class="text-sm" style={{ color: "var(--color-text)" }}>
                Acepto la confidencialidad del servicio *
              </span>
            </label>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              onClick={pasoAnterior}
              class="flex-1 py-3 rounded-lg font-semibold text-sm border"
              style={{
                ...buttonBaseStyle,
                borderColor: "var(--color-muted)",
                color: "var(--color-text)",
              }}
            >
              ← Atrás
            </button>
            <button
              type="button"
              onClick={enviarFormulario}
              disabled={isSubmitting || !validarPaso3()}
              class="flex-1 py-3 rounded-lg font-semibold text-sm"
              style={{
                ...buttonBaseStyle,
                backgroundColor: validarPaso3() ? "var(--color-accent)" : "var(--color-muted)",
                color: validarPaso3() ? "var(--color-primary)" : "white",
                cursor: validarPaso3() ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitud →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}