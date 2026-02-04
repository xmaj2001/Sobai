import React, { useState } from 'react';
import { 
  PenTool, 
  Upload, 
  BookOpen, 
  FileText, 
  Plus, 
  Image as ImageIcon,
  Sparkles,
  Download,
  Save
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const CriarConteudo: React.FC = () => {
  const [novelTitle, setNovelTitle] = useState('');
  const [novelDescription, setNovelDescription] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [chapters, setChapters] = useState<{ title: string; content: string }[]>([]);

  const addChapter = () => {
    if (chapterTitle && chapterContent) {
      setChapters([...chapters, { title: chapterTitle, content: chapterContent }]);
      setChapterTitle('');
      setChapterContent('');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <section className="flex items-center gap-3 animate-fade-in">
          <div className="p-3 rounded-xl bg-gradient-primary shadow-card">
            <PenTool className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Criar Conteúdo</h1>
            <p className="text-sm text-muted-foreground">Crie novas histórias ou carregue livros</p>
          </div>
        </section>

        {/* Content Tabs */}
        <Tabs defaultValue="novel" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="novel" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Criar História
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="w-4 h-4" />
              Carregar PDF
            </TabsTrigger>
          </TabsList>

          {/* Create Novel Tab */}
          <TabsContent value="novel" className="space-y-6">
            {/* Novel Details */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-4">
              <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Detalhes da História
              </h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="O título da sua história..."
                    value={novelTitle}
                    onChange={(e) => setNovelTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Uma breve descrição da sua história..."
                    value={novelDescription}
                    onChange={(e) => setNovelDescription(e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Capa</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary hover:bg-primary-light/50 transition-all duration-200 cursor-pointer">
                    <ImageIcon className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Clique ou arraste uma imagem para carregar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Chapters */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-4">
              <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Adicionar Capítulo
              </h2>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chapter-title">Título do Capítulo</Label>
                  <Input
                    id="chapter-title"
                    placeholder="Ex: Capítulo 1 - O Início"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapter-content">Conteúdo</Label>
                  <Textarea
                    id="chapter-content"
                    placeholder="Escreva o conteúdo do capítulo aqui... (Suporta Markdown)"
                    value={chapterContent}
                    onChange={(e) => setChapterContent(e.target.value)}
                    className="min-h-64 font-mono text-sm"
                  />
                </div>

                <Button onClick={addChapter} className="gap-2" disabled={!chapterTitle || !chapterContent}>
                  <Plus className="w-4 h-4" />
                  Adicionar Capítulo
                </Button>
              </div>
            </div>

            {/* Chapters List */}
            {chapters.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card space-y-4">
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Capítulos ({chapters.length})
                </h2>
                <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                  {chapters.map((ch, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-3 bg-muted/30">
                      <span className="font-medium text-foreground">{ch.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {ch.content.length} caracteres
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-gradient-primary hover:opacity-90">
                <Save className="w-4 h-4" />
                Guardar História
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar como PDF
              </Button>
              <Button variant="secondary" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Gerar Capa com IA
              </Button>
            </div>
          </TabsContent>

          {/* Upload PDF Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
              <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                Carregar PDF
              </h2>

              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary hover:bg-primary-light/50 transition-all duration-200 cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Arraste um ficheiro PDF ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground">
                  O PDF será automaticamente dividido em capítulos
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-accent/50 border border-accent">
                <h3 className="font-medium text-accent-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Processamento Automático
                </h3>
                <p className="text-sm text-muted-foreground">
                  A IA irá extrair o texto do PDF, identificar capítulos automaticamente 
                  e organizar o conteúdo para uma experiência de leitura optimizada.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CriarConteudo;
