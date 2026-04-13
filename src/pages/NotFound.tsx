import { useNavigate } from "react-router-dom";
import { Button } from "@/component/ui/button";

/**
 * 404 Not Found page
 * Shown when user navigates to a route that doesn't exist
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dihapus.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/")} variant="default">
            Kembali ke Beranda
          </Button>
          <Button onClick={() => navigate(-1)} variant="outline">
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}
