import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Upload, 
  Image, 
  FileText, 
  Save, 
  ArrowLeft,
  X,
  Trash2
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { categories, mockBooks } from '@/data/mockData';

const EditarLivro: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>('documento-original.pdf');
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    // Simular carregamento do livro
    const book = mockBooks.find(b => b.id === id);
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description || '',
        tags: '',
      });
      setCoverPreview(book.cover);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/meus-livros');
  };

  const handleDelete = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/meus-livros');
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/meus-livros">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Editar Livro</h1>
              <p className="text-muted-foreground">Atualize as informações do seu livro</p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:text-destructive gap-2">
                <Trash2 className="w-4 h-4" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser revertida. O livro será permanentemente eliminado
                  da plataforma, incluindo todas as estatísticas associadas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cover Upload */}
            <div className="lg:col-span-1 animate-slide-up">
              <section className="bg-card rounded-2xl p-6 border border-border shadow-card h-full">
                <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Capa do Livro
                </h2>
                
                <div className="space-y-4">
                  <div 
                    className={cn(
                      "relative aspect-[3/4] rounded-xl border-2 border-dashed border-border",
                      "flex items-center justify-center overflow-hidden",
                      "transition-colors hover:border-primary/50 cursor-pointer",
                      coverPreview && "border-solid border-primary"
                    )}
                    onClick={() => document.getElementById('cover-upload')?.click()}
                  >
                    {coverPreview ? (
                      <>
                        <img 
                          src={coverPreview} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm font-medium">Alterar capa</p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Clique para carregar a capa
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                </div>
              </section>
            </div>

            {/* Book Info */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Informações do Livro
                </h2>
                
                <div className="grid gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Livro *</Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author">Autor *</Label>
                      <Input
                        id="author"
                        name="author"
                        type="text"
                        value={formData.author}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c !== 'Todos').map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder="Ex: programação, python, iniciantes"
                      value={formData.tags}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              {/* PDF Upload */}
              <section className="bg-card rounded-2xl p-6 border border-border shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
                <h2 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Ficheiro PDF
                </h2>
                
                <div 
                  className={cn(
                    "relative rounded-xl border-2 border-dashed border-border p-8",
                    "flex flex-col items-center justify-center",
                    "transition-colors hover:border-primary/50 cursor-pointer",
                    pdfName && "border-solid border-primary bg-primary/5"
                  )}
                  onClick={() => document.getElementById('pdf-upload')?.click()}
                >
                  {pdfName ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{pdfName}</p>
                        <p className="text-sm text-muted-foreground">Clique para substituir</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                      <p className="text-foreground font-medium mb-1">
                        Carregar novo PDF
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handlePdfUpload}
                />
              </section>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/meus-livros">
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

export default EditarLivro;
