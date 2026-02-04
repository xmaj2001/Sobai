import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Users, 
  Download, 
  Brain, 
  FileText, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Landing: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Biblioteca Digital',
      description: 'Aceda a milhares de livros e documentos em formato PDF, organizados por categorias.',
    },
    {
      icon: Brain,
      title: 'IA Integrada',
      description: 'Resuma livros, faça perguntas e obtenha respostas baseadas no conteúdo.',
    },
    {
      icon: FileText,
      title: 'Trabalhos Académicos',
      description: 'Gere trabalhos académicos automaticamente a partir de múltiplos livros.',
    },
    {
      icon: Sparkles,
      title: 'Novels & Histórias',
      description: 'Crie e publique as suas próprias histórias com editor rich text.',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com outros leitores, partilhe descobertas e avalie conteúdos.',
    },
    {
      icon: Download,
      title: 'Exportação Fácil',
      description: 'Baixe resumos, trabalhos e histórias em formato PDF.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Livros Disponíveis' },
    { value: '50K+', label: 'Utilizadores Ativos' },
    { value: '1M+', label: 'Resumos Gerados' },
    { value: '4.9', label: 'Avaliação Média' },
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Estudante de Medicina',
      content: 'A IA de resumo poupou-me horas de estudo. Consigo rever matéria muito mais rápido!',
      avatar: 'MS',
    },
    {
      name: 'João Ferreira',
      role: 'Professor Universitário',
      content: 'Excelente para preparar aulas. A comparação de livros é fantástica.',
      avatar: 'JF',
    },
    {
      name: 'Ana Costa',
      role: 'Escritora',
      content: 'Publiquei a minha primeira novel aqui. A comunidade é muito acolhedora!',
      avatar: 'AC',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-floating">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">Biblioteca Inteligente</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Iniciar Sessão</Button>
            </Link>
            <Link to="/registar">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-floating">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-6 animate-fade-in">
              <Zap className="w-4 h-4" />
              Powered by AI
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              A sua Biblioteca Digital
              <span className="block text-transparent bg-clip-text bg-gradient-primary">
                com Inteligência Artificial
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Leia, resuma, estude e crie. Tudo numa plataforma inteligente 
              que transforma a forma como aprende e partilha conhecimento.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link to="/registar">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-floating gap-2 text-lg px-8">
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/biblioteca">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <BookOpen className="w-5 h-5" />
                  Explorar Biblioteca
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-card border border-border shadow-card">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo o que precisa para aprender
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa com ferramentas poderosas para leitura, estudo e criação de conteúdo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className={cn(
                  "p-6 rounded-2xl bg-card border border-border shadow-card",
                  "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-floating">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em apenas 3 passos simples, comece a transformar a sua experiência de leitura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Crie a sua conta', desc: 'Registe-se gratuitamente e aceda à biblioteca.' },
              { step: '02', title: 'Explore ou carregue', desc: 'Navegue pelos livros ou carregue os seus próprios PDFs.' },
              { step: '03', title: 'Aprenda com IA', desc: 'Use as ferramentas de IA para resumir, estudar e criar.' },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
                {idx < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que dizem os nossos utilizadores
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-card border border-border shadow-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-8 w-32 h-32 rounded-full bg-primary-foreground/20 blur-3xl" />
              <div className="absolute bottom-4 right-12 w-48 h-48 rounded-full bg-primary-foreground/20 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Junte-se a milhares de utilizadores que já transformaram a forma como aprendem.
              </p>
              <Link to="/registar">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 shadow-floating">
                  Criar Conta Gratuita
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-foreground">Biblioteca Inteligente</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/biblioteca" className="hover:text-foreground transition-colors">Biblioteca</Link>
              <Link to="/novels" className="hover:text-foreground transition-colors">Novels</Link>
              <a href="#" className="hover:text-foreground transition-colors">Termos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Biblioteca Inteligente. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
