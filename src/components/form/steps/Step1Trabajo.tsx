import { type FormData, tiposTrabajo } from "../constants";

interface Step1TrabajoProps {
  formData: FormData;
  updateFormData: (
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) => void;
  validarPaso1: () => boolean;
  onNext: () => void;
}

export default function Step1Trabajo({
  formData,
  updateFormData,
  validarPaso1,
  onNext,
}: Step1TrabajoProps) {
  const inputStyle = {
    borderColor: "var(--color-muted)",
  };

  return (
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
          onChange={(e) =>
            updateFormData("tipo", (e.target as HTMLSelectElement).value)
          }
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
          onInput={(e) =>
            updateFormData("materia", (e.target as HTMLInputElement).value)
          }
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
          onInput={(e) =>
            updateFormData(
              "descripcion",
              (e.target as HTMLTextAreaElement).value,
            )
          }
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
        onClick={onNext}
        disabled={!validarPaso1()}
        class="w-full py-3 rounded-lg font-semibold text-sm transition-all"
        style={{
          transition: "all 0.2s ease",
          backgroundColor: validarPaso1()
            ? "var(--color-primary)"
            : "var(--color-muted)",
          color: "white",
          cursor: validarPaso1() ? "pointer" : "not-allowed",
        }}
      >
        Siguiente →
      </button>
    </div>
  );
}
