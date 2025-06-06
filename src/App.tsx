import { Toaster as ShadcnToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly generated pages
import Homepage from "./pages/Homepage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ShadcnToaster /> {/* Using shadcn/ui Toaster */}
      <SonnerToaster /> {/* Using Sonner for notifications */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product-detail-page" element={<ProductDetailPage />} /> 
          {/* For a real app, ProductDetailPage would likely use a dynamic segment e.g., /products/:productId */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Other pre-existing routes can be added here */}
          
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;