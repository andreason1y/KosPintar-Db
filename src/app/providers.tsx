import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/component/ui/tooltip";
import { Toaster as Sonner } from "@/component/ui/sonner";
import { Toaster } from "@/component/ui/toaster";
import { AuthProvider } from "@/lib/auth-context";
import { PropertyProvider } from "@/lib/property-context";
import { DemoProvider } from "@/lib/demo-context";
import { PlanProvider } from "@/lib/plan-context";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root providers stack
 * Order matters: Tooltip > Router > Demo > Auth > Property > Plan
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <DemoProvider>
          <AuthProvider>
            <PropertyProvider>
              <PlanProvider>
                {children}
                <Toaster />
                <Sonner />
              </PlanProvider>
            </PropertyProvider>
          </AuthProvider>
        </DemoProvider>
      </BrowserRouter>
    </TooltipProvider>
  );
}
