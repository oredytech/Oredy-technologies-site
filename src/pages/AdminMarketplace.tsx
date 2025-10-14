import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { z } from "zod";

const siteSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères").max(200),
  short_description: z.string().max(300).optional(),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  price: z.number().min(0, "Le prix doit être positif"),
  site_url: z.string().url("URL invalide").optional().or(z.literal("")),
  demo_url: z.string().url("URL invalide").optional().or(z.literal("")),
  code_snippets: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  status: z.enum(["available", "sold", "reserved"]),
});

const AdminMarketplace = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    description: "",
    price: "",
    site_url: "",
    demo_url: "",
    code_snippets: "",
    technologies: "",
    screenshots: "",
    status: "available" as "available" | "sold" | "reserved",
  });

  const { data: sites, isLoading } = useQuery({
    queryKey: ["admin-marketplace-sites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_sites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const validated = siteSchema.parse({
        title: data.title,
        short_description: data.short_description || undefined,
        description: data.description,
        price: parseFloat(data.price),
        site_url: data.site_url || undefined,
        demo_url: data.demo_url || undefined,
        code_snippets: data.code_snippets || undefined,
        technologies: data.technologies ? data.technologies.split(",").map(t => t.trim()) : [],
        status: data.status,
      });

      const screenshots = data.screenshots ? data.screenshots.split(",").map(s => s.trim()) : [];

      const { error } = await supabase.from("marketplace_sites").insert([{
        title: validated.title,
        short_description: validated.short_description,
        description: validated.description,
        price: validated.price,
        site_url: validated.site_url,
        demo_url: validated.demo_url,
        code_snippets: validated.code_snippets,
        technologies: validated.technologies,
        status: validated.status,
        screenshots,
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Site ajouté",
        description: "Le site a été ajouté au marketplace avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-marketplace-sites"] });
      setFormData({
        title: "",
        short_description: "",
        description: "",
        price: "",
        site_url: "",
        demo_url: "",
        code_snippets: "",
        technologies: "",
        screenshots: "",
        status: "available",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible d'ajouter le site",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("marketplace_sites")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Site supprimé",
        description: "Le site a été supprimé du marketplace.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-marketplace-sites"] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de supprimer le site",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Administration du Marketplace</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un site</CardTitle>
                <CardDescription>
                  Remplissez le formulaire pour ajouter un nouveau site au marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      maxLength={200}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short_description">Courte description</Label>
                    <Input
                      id="short_description"
                      value={formData.short_description}
                      onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                      maxLength={300}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description complète *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_url">URL du site</Label>
                    <Input
                      id="site_url"
                      type="url"
                      value={formData.site_url}
                      onChange={(e) => setFormData({ ...formData, site_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demo_url">URL de démo</Label>
                    <Input
                      id="demo_url"
                      type="url"
                      value={formData.demo_url}
                      onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screenshots">URLs des captures (séparées par des virgules)</Label>
                    <Textarea
                      id="screenshots"
                      value={formData.screenshots}
                      onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technologies">Technologies (séparées par des virgules)</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, TypeScript, Tailwind"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code_snippets">Extraits de code</Label>
                    <Textarea
                      id="code_snippets"
                      value={formData.code_snippets}
                      onChange={(e) => setFormData({ ...formData, code_snippets: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "available" | "sold" | "reserved") =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="reserved">Réservé</SelectItem>
                        <SelectItem value="sold">Vendu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                    {createMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ajout en cours...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter le site
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sites existants</CardTitle>
                  <CardDescription>Liste de tous les sites du marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sites?.map((site) => (
                        <div
                          key={site.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium">{site.title}</h3>
                            <p className="text-sm text-muted-foreground">{site.price} €</p>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteMutation.mutate(site.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {sites?.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          Aucun site pour le moment
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminMarketplace;
