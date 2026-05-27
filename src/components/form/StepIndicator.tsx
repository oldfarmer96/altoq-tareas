interface StepIndicatorProps {
  step: number;
}

export default function StepIndicator({ step }: StepIndicatorProps) {
  return (
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            backgroundColor:
              step >= 1 ? "var(--color-accent)" : "var(--color-muted)",
            color: step >= 1 ? "var(--color-primary)" : "white",
          }}
        >
          1
        </div>
        <div
          class="w-12 h-1 rounded"
          style={{
            backgroundColor:
              step >= 2 ? "var(--color-accent)" : "var(--color-muted)",
          }}
        ></div>
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            backgroundColor:
              step >= 2 ? "var(--color-accent)" : "var(--color-muted)",
            color: step >= 2 ? "var(--color-primary)" : "white",
          }}
        >
          2
        </div>
        <div
          class="w-12 h-1 rounded"
          style={{
            backgroundColor:
              step >= 3 ? "var(--color-accent)" : "var(--color-muted)",
          }}
        ></div>
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            backgroundColor:
              step >= 3 ? "var(--color-accent)" : "var(--color-muted)",
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
  );
}
