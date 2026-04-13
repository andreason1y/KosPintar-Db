import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./BottomNav";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/component/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/lib/auth-context";
import { useDemo } from "@/lib/demo-context";
import logoIcon from "@/assets/logo-icon.png";
import { X } from "lucide-react";

export default function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { isDemo } = useDemo();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [inAppAnnouncement, setInAppAnnouncement] = useState("");
  const [inAppAnnouncementActive, setInAppAnnouncementActive] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    // Load mock settings
    const settingsMap: Record<string, number> = {
      maintenance_mode: 0,
      in_app_announcement_active: 1,
    };
    if (settingsMap.maintenance_mode === 1) setMaintenanceMode(true);
    if (settingsMap.in_app_announcement_active === 1) setInAppAnnouncementActive(true);

    // Load mock settings text
    const settingsTextMap: Record<string, string> = {
      in_app_announcement_text: "Selamat datang di KosPintar! Kami terus berinovasi untuk melayani Anda lebih baik.",
    };
    if (settingsTextMap.in_app_announcement_text) setInAppAnnouncement(settingsTextMap.in_app_announcement_text);
  }, []);

  // Update last_login (mock - no-op)
  useEffect(() => {
    if (user && !isDemo) {
      // Mock implementation - in real app, update last_login in database
      console.debug("User last login:", new Date().toISOString());
    }
  }, [user?.id]);

  // Maintenance mode — redirect to maintenance screen (except admin)
  if (maintenanceMode && !isDemo && user?.email !== "andreassina9a@gmail.com") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <img src={logoIcon} alt="KosPintar" className="h-16 w-16 rounded-xl mb-6" />
        <h1 className="text-2xl font-extrabold text-foreground mb-3">Sedang dalam Pemeliharaan</h1>
        <p className="text-muted-foreground max-w-md">Kami sedang melakukan pemeliharaan sistem. Silakan kembali lagi nanti.</p>
      </div>
    );
  }

  const announcementBanner = inAppAnnouncementActive && inAppAnnouncement && !bannerDismissed && (
    <div className="bg-accent/20 border-b border-accent/30 px-4 py-2 flex items-center gap-2">
      <p className="flex-1 text-xs font-medium text-foreground">{inAppAnnouncement}</p>
      <button onClick={() => setBannerDismissed(true)} className="text-muted-foreground hover:text-foreground">
        <X size={14} />
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        {announcementBanner}
        <div className="mx-auto max-w-app pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {announcementBanner}
          <div className="mx-auto max-w-4xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
