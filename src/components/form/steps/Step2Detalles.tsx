import { type FormData, extensiones } from "../constants";

interface Step2DetallesProps {
  formData: FormData;
  updateFormData: (
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) => void;
  validarPaso2: () => boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2Detalles({
  formData,
  updateFormData,
  validarPaso2,
  onBack,
  onNext,
}: Step2DetallesProps) {
  const inputStyle = {
    borderColor: "var(--color-muted)",
  };

  return (
    <div class="space-y-6">
      <div>
        <label
          class="block text-sm font-semibold mb-3"
          style={{ color: "var(--color-text)" }}
        >
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
            onInput={(e) =>
              updateFormData(
                "linkArchivos",
                (e.target as HTMLInputElement).value,
              )
            }
            placeholder="https://drive.google.com/..."
            class="w-full px-4 py-3 rounded-lg border text-sm"
            style={inputStyle}
          />
          <p class="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
            Asegúrate que el enlace tenga permisos de lectura
          </p>
        </div>
      )}

      <div
        class="p-4 rounded-lg border-2 cursor-pointer transition-all"
        style={{
          borderColor: formData.esUrgente
            ? "var(--color-accent)"
            : "var(--color-muted)",
          backgroundColor: formData.esUrgente ? "#FEF3C7" : "transparent",
        }}
        onClick={() => {
          const newUrgente = !formData.esUrgente;
          updateFormData("esUrgente", newUrgente);
          if (newUrgente) {
            const hoy = new Date().toISOString().split("T")[0];
            updateFormData("fechaEntrega", hoy);
          } else {
            updateFormData("fechaEntrega", "");
          }
        }}
      >
        <div class="flex items-start gap-3">
          <div
            class="w-5 h-5 rounded flex items-center justify-center mt-0.5"
            style={{
              backgroundColor: formData.esUrgente
                ? "var(--color-accent)"
                : "transparent",
              border: formData.esUrgente
                ? "none"
                : "2px solid var(--color-muted)",
            }}
          >
            {formData.esUrgente && (
              <svg
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="var(--color-primary)"
                stroke-width="3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <div>
            <p
              class="text-sm font-semibold"
              style={{
                color: formData.esUrgente
                  ? "var(--color-primary)"
                  : "var(--color-text)",
              }}
            >
              Es una tarea urgente (de un día para otro)
            </p>
            <p class="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Marca esta opción si necesitas la tarea en máximo 24 horas
            </p>
            {formData.esUrgente && (
              <p
                class="text-xs mt-2 font-medium"
                style={{ color: "var(--color-accent)" }}
              >
                Tu tarea será entregada en menos de 24 horas
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          for="fechaEntrega"
          class="block text-sm font-semibold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Fecha de entrega {!formData.esUrgente && "*"}
        </label>
        <input
          id="fechaEntrega"
          type="date"
          value={formData.fechaEntrega}
          onChange={(e) =>
            updateFormData("fechaEntrega", (e.target as HTMLInputElement).value)
          }
          min={
            formData.esUrgente
              ? new Date().toISOString().split("T")[0]
              : new Date(Date.now() + 86400000).toISOString().split("T")[0]
          }
          disabled={formData.esUrgente}
          class="w-full px-4 py-3 rounded-lg border text-sm"
          style={{
            ...inputStyle,
            opacity: formData.esUrgente ? 0.5 : 1,
            cursor: formData.esUrgente ? "not-allowed" : "text",
          }}
        />
        {formData.esUrgente && (
          <p class="text-xs mt-1" style={{ color: "var(--color-accent)" }}>
            La entrega se define como "hoy" al confirmar la solicitud
          </p>
        )}
      </div>

      <div>
        <label
          class="block text-sm font-semibold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Extensión aproximada *
        </label>
        <div class="grid grid-cols-2 gap-2">
          {extensiones.map((ext) => (
            <label
              key={ext}
              class="p-3 rounded-lg border text-center text-sm cursor-pointer transition-all"
              style={{
                borderColor:
                  formData.extension === ext
                    ? "var(--color-primary)"
                    : "var(--color-muted)",
                backgroundColor:
                  formData.extension === ext ? "var(--color-primary)" : "white",
                color:
                  formData.extension === ext ? "white" : "var(--color-text)",
              }}
            >
              <input
                type="radio"
                name="extension"
                value={ext}
                checked={formData.extension === ext}
                onChange={() => {
                  updateFormData("extension", ext);
                  if (ext !== "Otro") {
                    updateFormData("extensionCustom", "");
                  }
                }}
                class="sr-only"
              />
              {ext}
            </label>
          ))}
        </div>
        {formData.extension === "Otro" && (
          <div class="mt-3">
            <input
              type="text"
              value={formData.extensionCustom}
              onInput={(e) =>
                updateFormData(
                  "extensionCustom",
                  (e.target as HTMLInputElement).value,
                )
              }
              placeholder="Ej: 2 páginas exactas, 50 hojas, 20 diapositivas"
              class="w-full px-4 py-3 rounded-lg border text-sm"
              style={inputStyle}
            />
            <p class="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Especifica la cantidad exacta que necesitas
            </p>
          </div>
        )}
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
          onClick={onNext}
          disabled={!validarPaso2()}
          class="flex-1 py-3 rounded-lg font-semibold text-sm transition-all"
          style={{
            transition: "all 0.2s ease",
            backgroundColor: validarPaso2()
              ? "var(--color-primary)"
              : "var(--color-muted)",
            color: "white",
            cursor: validarPaso2() ? "pointer" : "not-allowed",
          }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
