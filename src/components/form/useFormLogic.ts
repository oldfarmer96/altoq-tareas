import { useState } from "preact/hooks";
import { type FormData, initialFormData } from "./constants";

export function useFormLogic() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) => {
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
    if (!formData.extension) {
      return false;
    }
    if (formData.extension === "Otro" && !formData.extensionCustom.trim()) {
      return false;
    }
    if (formData.esUrgente) {
      return true;
    }
    if (!formData.fechaEntrega) {
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
      setErrorMessage(
        "Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    step,
    isSubmitting,
    errorMessage,
    updateFormData,
    validarPaso1,
    validarPaso2,
    validarPaso3,
    siguientePaso,
    pasoAnterior,
    enviarFormulario,
  };
}
