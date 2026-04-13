import { ReactNode, createContext, useContext, useState, useEffect } from "react";

interface DemoContextType {
  isDemo: boolean;
  setIsDemo: (value: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);

  // Check URL for demo mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "true") {
      setIsDemo(true);
    }
  }, []);

  return (
    <DemoContext.Provider value={{ isDemo, setIsDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo(): DemoContextType {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}
