
import { useState, useEffect } from 'react';
import { PortfolioItemType } from './types';
import { toast } from "@/components/ui/use-toast";

export const usePortfolioData = (initialItems: PortfolioItemType[]) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const screenshotAPI = "https://api.apiflash.com/v1/urltoimage";
        const apiKey = "d41d8cd98f00b204e9800998ecf8427e";
        
        const updatedItems = await Promise.all(
          portfolioItems.map(async (item) => {
            try {
              const screenshotUrl = `${screenshotAPI}?access_key=${apiKey}&url=${item.url}&format=jpeg&width=800&height=600`;
              
              console.log(`Would fetch screenshot for ${item.url} using: ${screenshotUrl}`);
              
              return { ...item, isLoading: false };
            } catch (error) {
              console.error(`Error fetching screenshot for ${item.url}:`, error);
              toast({
                title: "Échec du chargement",
                description: `Impossible de charger l'aperçu pour ${item.title}`,
                variant: "destructive",
              });
              return { ...item, isLoading: false };
            }
          })
        );
        
        setPortfolioItems(updatedItems);
      } catch (error) {
        console.error("Error fetching screenshots:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les aperçus des sites",
          variant: "destructive",
        });
      }
    };
    
    fetchScreenshots();
  }, []);

  return {
    portfolioItems,
    selectedItem,
    setSelectedItem
  };
};
