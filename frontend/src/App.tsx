import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BookSelectionProvider } from "@/contexts/BookSelectionContext";

// Pages
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Registar from "./pages/Registar";
import Biblioteca from "./pages/Biblioteca";
import BookDetails from "./pages/BookDetails";
import Novels from "./pages/Novels";
import NovelDetails from "./pages/NovelDetails";
import CriarConteudo from "./pages/CriarConteudo";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import Notificacoes from "./pages/Notificacoes";
import MeusLivros from "./pages/MeusLivros";
import RegistarLivro from "./pages/RegistarLivro";
import EditarLivro from "./pages/EditarLivro";
import EstatisticasLivro from "./pages/EstatisticasLivro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BookSelectionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Pages */}
              <Route path="/landing" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registar" element={<Registar />} />
              
              {/* Main App */}
              <Route path="/" element={<Index />} />
              <Route path="/biblioteca" element={<Biblioteca />} />
              <Route path="/livro/:id" element={<BookDetails />} />
              <Route path="/novels" element={<Novels />} />
              <Route path="/novel/:id" element={<NovelDetails />} />
              <Route path="/criar" element={<CriarConteudo />} />
              
              {/* User Pages */}
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/editar-perfil" element={<EditarPerfil />} />
              <Route path="/notificacoes" element={<Notificacoes />} />
              
              {/* Book Management */}
              <Route path="/meus-livros" element={<MeusLivros />} />
              <Route path="/registar-livro" element={<RegistarLivro />} />
              <Route path="/editar-livro/:id" element={<EditarLivro />} />
              <Route path="/estatisticas-livro/:id" element={<EstatisticasLivro />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookSelectionProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
