
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WordPressPortfolio from "./pages/WordPressPortfolio";
import WebDesignPortfolio from "./pages/WebDesignPortfolio";
import DevelopmentPortfolio from "./pages/DevelopmentPortfolio";
import CV from "./pages/CV";
import AboutMePage from "./pages/AboutMePage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio/wordpress" element={<WordPressPortfolio />} />
          <Route path="/portfolio/webdesign" element={<WebDesignPortfolio />} />
          <Route path="/portfolio/development" element={<DevelopmentPortfolio />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
