import { useFormLogic } from "./form/useFormLogic";
import StepIndicator from "./form/StepIndicator";
import Step1Trabajo from "./form/steps/Step1Trabajo";
import Step2Detalles from "./form/steps/Step2Detalles";
import Step3Contacto from "./form/steps/Step3Contacto";

export default function ContactForm() {
  const {
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
  } = useFormLogic();

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

      <StepIndicator step={step} />

      {step === 1 && (
        <Step1Trabajo
          formData={formData}
          updateFormData={updateFormData}
          validarPaso1={validarPaso1}
          onNext={siguientePaso}
        />
      )}

      {step === 2 && (
        <Step2Detalles
          formData={formData}
          updateFormData={updateFormData}
          validarPaso2={validarPaso2}
          onBack={pasoAnterior}
          onNext={siguientePaso}
        />
      )}

      {step === 3 && (
        <Step3Contacto
          formData={formData}
          updateFormData={updateFormData}
          validarPaso3={validarPaso3}
          isSubmitting={isSubmitting}
          onBack={pasoAnterior}
          onSubmit={enviarFormulario}
        />
      )}
    </div>
  );
}
