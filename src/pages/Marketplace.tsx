import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Marketplace = () => {
  const { data: sites, isLoading } = useQuery({
    queryKey: ["marketplace-sites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_sites")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Marché de Sites Web</h1>
            <p className="text-muted-foreground text-lg">
              Découvrez et achetez des sites web professionnels prêts à l'emploi
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites?.map((site) => (
                <Card key={site.id} className="flex flex-col">
                  <CardHeader>
                    {site.screenshots && site.screenshots.length > 0 && (
                      <img
                        src={site.screenshots[0]}
                        alt={site.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <CardTitle>{site.title}</CardTitle>
                    <CardDescription>{site.short_description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {site.technologies?.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {site.price} €
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to={`/marketplace/${site.id}`}>
                        Voir les détails
                      </Link>
                    </Button>
                    {site.demo_url && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={site.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && sites?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun site disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
