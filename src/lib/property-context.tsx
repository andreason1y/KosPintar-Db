import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { MOCK_PROPERTIES, Property } from "./mock-data";
import { useAuth } from "./auth-context";

interface PropertyContextType {
  properties: Property[];
  activeProperty: Property | null;
  loading: boolean;
  setActiveProperty: (property: Property) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Load properties when user changes
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (user) {
          // Filter properties for this user
          const userProperties = MOCK_PROPERTIES.filter((p) => p.user_id === user.id);
          setProperties(userProperties);

          // Auto-select first property if available
          if (userProperties.length > 0 && !activeProperty) {
            setActiveProperty(userProperties[0]);
          }
        } else {
          setProperties([]);
          setActiveProperty(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [user?.id]); // Dependencies: only user.id

  const handleSetActiveProperty = (property: Property) => {
    setActiveProperty(property);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        activeProperty,
        loading,
        setActiveProperty: handleSetActiveProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty(): PropertyContextType {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within PropertyProvider");
  }
  return context;
}
