
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
import ContactPage from "./pages/ContactPage";
import Boutique from "./pages/Boutique";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Marketplace from "./pages/Marketplace";
import MarketplaceSiteDetail from "./pages/MarketplaceSiteDetail";
import MarketplacePurchase from "./pages/MarketplacePurchase";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import AdminMarketplace from "./pages/AdminMarketplace";
import AdminLogin from "./pages/AdminLogin";

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
          <Route path="/testimonials" element={<Marketplace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<MarketplaceSiteDetail />} />
          <Route path="/marketplace/:id/purchase" element={<MarketplacePurchase />} />
          <Route path="/marketplace/payment-success" element={<PaymentSuccess />} />
          <Route path="/marketplace/payment-failure" element={<PaymentFailure />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/marketplace" element={<AdminMarketplace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
