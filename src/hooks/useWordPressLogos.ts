
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

// Map pour associer les URLs aux chemins d'images des logos
const logoMap: Record<string, string> = {
  'totalementactus.net': '/lovable-uploads/TOTALEMENTACTUS.JPG',
  'kivu7.net': '/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png',
  'radiotayna.com': '/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png', 
  'rcvma.net': '/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png',
};

// Récupère le logo d'un site à partir de son URL
export const getLogoFromUrl = (url: string): string => {
  // Extraire le domaine de l'URL
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return logoMap[domain] || '/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png';
  } catch (error) {
    console.error("URL invalide:", url);
    return '/lovable-uploads/6a9984fe-a9bb-4fe7-8b59-8222fd6c6332.png';
  }
};

type ProjectWithLogo = {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
  description: string;
  isLoading: boolean;
};

export const useWordPressLogos = (initialProjects: ProjectWithLogo[]) => {
  const [projects, setProjects] = useState<ProjectWithLogo[]>(initialProjects);

  useEffect(() => {
    // Associer les logos aux projets
    const projectsWithLogos = initialProjects.map(project => {
      try {
        const logoUrl = getLogoFromUrl(project.url);
        return {
          ...project,
          imageUrl: logoUrl,
          isLoading: false
        };
      } catch (error) {
        console.error(`Erreur lors de la récupération du logo pour ${project.url}:`, error);
        toast({
          title: "Échec du chargement",
          description: `Impossible de charger le logo pour ${project.title}`,
          variant: "destructive",
        });
        return project;
      }
    });
    
    setProjects(projectsWithLogos);
  }, [initialProjects]);

  return projects;
};
