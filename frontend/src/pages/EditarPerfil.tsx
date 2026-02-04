import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  Eye, 
  EyeOff,
  ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const EditarPerfil: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: 'João Paulo Silva',
    email: 'joao.silva@email.com',
    bio: 'Leitor ávido e escritor amador. Apaixonado por tecnologia e ficção científica.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <Link to="/perfil">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Editar Perfil</h1>
            <p className="text-muted-foreground">Atualize as suas informações pessoais</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up">
            <h2 className="font-serif text-lg font-bold text-foreground mb-4">Foto de Perfil</h2>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-floating">
                  <span className="text-3xl font-bold text-primary-foreground">JP</span>
                </div>
                <button
                  type="button"
                  className={cn(
                    "absolute -bottom-2 -right-2 w-8 h-8 rounded-full",
                    "bg-card border border-border shadow-card",
                    "flex items-center justify-center",
                    "hover:bg-accent transition-colors"
                  )}
                >
                  <Camera className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div>
                <Button type="button" variant="outline" className="mb-2">
                  Carregar Nova Foto
                </Button>
                <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
              </div>
            </div>
          </section>

          {/* Personal Info */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h2 className="font-serif text-lg font-bold text-foreground mb-4">Informações Pessoais</h2>
            
            <div className="grid gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre si..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/200 caracteres
                </p>
              </div>
            </div>
          </section>

          {/* Password Section */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h2 className="font-serif text-lg font-bold text-foreground mb-4">Alterar Palavra-passe</h2>
            
            <div className="grid gap-5">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Palavra-passe Atual</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Palavra-passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Palavra-passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/perfil">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-gradient-primary hover:opacity-90 shadow-floating gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar Alterações
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditarPerfil;
