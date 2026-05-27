import { type FormData } from "../constants";

interface Step3ContactoProps {
  formData: FormData;
  updateFormData: (
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) => void;
  validarPaso3: () => boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step3Contacto({
  formData,
  updateFormData,
  validarPaso3,
  isSubmitting,
  onBack,
  onSubmit,
}: Step3ContactoProps) {
  const inputStyle = {
    borderColor: "var(--color-muted)",
  };

  return (
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
          onInput={(e) =>
            updateFormData("nombre", (e.target as HTMLInputElement).value)
          }
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
          onInput={(e) =>
            updateFormData("email", (e.target as HTMLInputElement).value)
          }
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
          onInput={(e) =>
            updateFormData("whatsapp", (e.target as HTMLInputElement).value)
          }
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
              updateFormData(
                "aceptaPrivacidad",
                (e.target as HTMLInputElement).checked,
              )
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
              updateFormData(
                "aceptaConfidencialidad",
                (e.target as HTMLInputElement).checked,
              )
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
          onClick={onBack}
          class="flex-1 py-3 rounded-lg font-semibold text-sm border transition-all"
          style={{
            transition: "all 0.2s ease",
            borderColor: "var(--color-muted)",
            color: "var(--color-text)",
          }}
        >
          ← Atrás
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !validarPaso3()}
          class="flex-1 py-3 rounded-lg font-semibold text-sm transition-all"
          style={{
            transition: "all 0.2s ease",
            backgroundColor: validarPaso3()
              ? "var(--color-accent)"
              : "var(--color-muted)",
            color: validarPaso3() ? "var(--color-primary)" : "white",
            cursor: validarPaso3() ? "pointer" : "not-allowed",
          }}
        >
          {isSubmitting ? "Enviando..." : "Enviar solicitud →"}
        </button>
      </div>
    </div>
  );
}
