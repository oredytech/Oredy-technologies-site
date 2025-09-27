
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type SearchResult = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
};

// Sample search data - in a real app, this would come from a backend or be generated from site content
const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'Accueil',
    description: 'Page d\'accueil du site',
    url: '/',
    category: 'Pages'
  },
  {
    id: '2',
    title: 'À propos',
    description: 'En savoir plus sur moi',
    url: '/about',
    category: 'Pages'
  },
  {
    id: '3',
    title: 'CV',
    description: 'Mon parcours professionnel',
    url: '/cv',
    category: 'Pages'
  },
  {
    id: '4',
    title: 'WordPress',
    description: 'Projets WordPress',
    url: '/portfolio/wordpress',
    category: 'Portfolio'
  },
  {
    id: '5',
    title: 'Web Design',
    description: 'Projets de design web',
    url: '/portfolio/webdesign',
    category: 'Portfolio'
  },
  {
    id: '6',
    title: 'Développement',
    description: 'Projets de développement',
    url: '/portfolio/development',
    category: 'Portfolio'
  },
  {
    id: '7',
    title: 'Services',
    description: 'Mes services professionnels',
    url: '/#services',
    category: 'Sections'
  },
  {
    id: '8',
    title: 'Témoignages',
    description: 'Avis de clients',
    url: '/#testimonials',
    category: 'Sections'
  },
  {
    id: '9',
    title: 'Contact',
    description: 'Me contacter',
    url: '/#contact',
    category: 'Sections'
  }
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = searchData.filter(
      item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(searchResults);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    setQuery("");
    
    if (result.url.startsWith('/#')) {
      // Handle hash links for sections
      const hash = result.url.substring(1);
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Regular navigation
      navigate(result.url);
    }
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-black/95 border border-turquoise/20 backdrop-blur-md">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-turquoise" />
            Recherche
          </DialogTitle>
        </DialogHeader>
        
        <Command className="bg-transparent rounded-t-none">
          <div className="flex items-center border-b border-turquoise/20 px-3 py-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 text-turquoise opacity-70" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Rechercher sur le site..."
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-400"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar py-2">
            {Object.keys(groupedResults).length === 0 && query && (
              <CommandEmpty className="py-6 text-center text-sm text-gray-400">
                Aucun résultat trouvé pour "{query}"
              </CommandEmpty>
            )}
            
            {Object.entries(groupedResults).map(([category, items]) => (
              <CommandGroup key={category} heading={category} className="px-2 py-1.5">
                {items.map((result) => (
                  <CommandItem
                    key={result.id}
                    value={`${result.title} ${result.description}`}
                    onSelect={() => handleSelect(result)}
                    className="flex flex-col items-start gap-1 px-4 py-3 rounded-md cursor-pointer hover:bg-turquoise/10 aria-selected:bg-turquoise/10"
                  >
                    <div className="font-medium text-white text-sm">{result.title}</div>
                    <div className="text-xs text-gray-400">{result.description}</div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          
          <div className="flex items-center justify-between border-t border-turquoise/20 px-4 py-2 text-xs text-gray-400">
            <div>Appuyez sur <kbd className="px-1 bg-gray-800 rounded">↵</kbd> pour naviguer</div>
            <div>Trouvé {results.length} résultat{results.length !== 1 ? 's' : ''}</div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
