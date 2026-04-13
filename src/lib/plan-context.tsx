import { ReactNode, createContext, useContext, useState } from "react";

interface PlanContextType {
  plan: "free" | "pro" | "premium";
  isPro: boolean;
  setPlan: (plan: "free" | "pro" | "premium") => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<"free" | "pro" | "premium">("free");

  return (
    <PlanContext.Provider
      value={{
        plan,
        isPro: plan !== "free",
        setPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan(): PlanContextType {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within PlanProvider");
  }
  return context;
}
