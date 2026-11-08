import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, LogOut } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { WP_COMMERCE_BASE } from "@/lib/wordpressCommerce";

const AdminMarketplace = () => {
  const { isLoading, logout } = useAdminAuth();
  if (isLoading) return <div className="container pt-24">Chargement…</div>;
  return <div className="min-h-screen flex flex-col"><Header />
    <main className="container pt-24 pb-16 flex-1">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-display">Marché & boutique</h1>
        <Button variant="outline" onClick={logout}><LogOut /> Déconnexion</Button>
      </div>
      <p className="text-muted-foreground mb-8">Gérez vos sites, produits, prix et liens d’affiliation dans WordPress avec Oredy Commerce.</p>
      <div className="flex flex-wrap gap-4">
        <Button asChild><a href={`${WP_COMMERCE_BASE}/wp-admin/admin.php?page=oredy-commerce`} target="_blank" rel="noopener noreferrer"><ExternalLink /> Ouvrir WordPress</a></Button>
        <Button variant="outline" asChild><a href="/plugin/oredy-commerce.zip" download><Download /> Télécharger le plugin</a></Button>
      </div>
    </main><Footer /></div>;
};
export default AdminMarketplace;
