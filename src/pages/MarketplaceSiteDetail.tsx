import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ExternalLink, ShoppingCart, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const MarketplaceSiteDetail = () => {
  const { id } = useParams();

  const { data: site, isLoading } = useQuery({
    queryKey: ["marketplace-site", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marketplace_sites")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Site non trouvé</h1>
            <Button asChild>
              <Link to="/marketplace">Retour au marché</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au marché
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {site.screenshots && site.screenshots.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {site.screenshots.map((screenshot: string, index: number) => (
                          <CarouselItem key={index}>
                            <img
                              src={screenshot}
                              alt={`${site.title} - Screenshot ${index + 1}`}
                              className="w-full h-auto rounded-lg"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {site.screenshots.length > 1 && (
                        <>
                          <CarouselPrevious />
                          <CarouselNext />
                        </>
                      )}
                    </Carousel>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{site.description}</p>
                </CardContent>
              </Card>

              {site.code_snippets && (
                <Card>
                  <CardHeader>
                    <CardTitle>Extraits de code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{site.code_snippets}</code>
                    </pre>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Technologies utilisées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {site.technologies?.map((tech: string) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>{site.title}</CardTitle>
                  <CardDescription>{site.short_description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {site.price} €
                    </p>
                  </div>

                  <div className="space-y-2">
                    {site.status === "available" ? (
                      <Button className="w-full" size="lg" asChild>
                        <Link to={`/marketplace/${site.id}/purchase`}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Acheter maintenant
                        </Link>
                      </Button>
                    ) : site.status === "pending" ? (
                      <Button disabled className="w-full" size="lg">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        En cours d'achat
                      </Button>
                    ) : (
                      <Button disabled className="w-full" size="lg">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Non disponible
                      </Button>
                    )}

                    {site.demo_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={site.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Voir la démo
                        </a>
                      </Button>
                    )}

                    {site.site_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={site.site_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visiter le site
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <Badge variant={site.status === 'available' ? 'default' : 'secondary'}>
                      {site.status === 'available' ? 'Disponible' : 
                       site.status === 'pending' ? 'Quelqu\'un finalise le paiement' : 
                       'Indisponible'}
                    </Badge>
                  </div>
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

export default MarketplaceSiteDetail;
