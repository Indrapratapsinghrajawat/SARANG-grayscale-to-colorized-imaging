import { useState, useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLoader } from "@/components/animations/PageLoader";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import Index from "./pages/Index";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import Researchers from "./pages/Researchers";
import Defense from "./pages/Defense";
import SarRangDemo from "./pages/SarRangDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LOADER_KEY = "sar-rang-loader-shown";

const App = () => {
  const [loading, setLoading] = useState(() => {
    // Only show loader on first visit per session
    if (sessionStorage.getItem(LOADER_KEY)) return false;
    return true;
  });

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
    sessionStorage.setItem(LOADER_KEY, "1");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading && <PageLoader onComplete={handleLoadComplete} />}
        <SmoothScroll>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/researchers" element={<Researchers />} />
              <Route path="/defense" element={<Defense />} />
              <Route path="/sar-rang/demo" element={<SarRangDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
