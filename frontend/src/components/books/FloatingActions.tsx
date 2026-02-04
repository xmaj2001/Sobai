import React, { useState } from 'react';
import { X, FileText, PenTool, HelpCircle, GitCompare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookSelection } from '@/contexts/BookSelectionContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const actions = [
  { id: 'resumir', icon: FileText, label: 'Resumir', color: 'bg-primary' },
  { id: 'trabalho', icon: PenTool, label: 'Fazer Trabalho', color: 'bg-success' },
  { id: 'perguntas', icon: HelpCircle, label: 'Fazer Perguntas', color: 'bg-accent-foreground' },
  { id: 'comparar', icon: GitCompare, label: 'Comparar Livros', color: 'bg-primary' },
];

const multiBookOptions = [
  { id: 'resumo-comparativo', label: 'Resumo comparativo', description: 'Comparar os principais pontos de cada livro' },
  { id: 'trabalho-academico', label: 'Trabalho académico automático', description: 'Gerar um trabalho estruturado com citações' },
  { id: 'estudo-guiado', label: 'Estudo guiado', description: 'Criar um plano de estudo personalizado' },
  { id: 'perguntas-livros', label: 'Perguntas baseadas nos livros', description: 'Fazer perguntas sobre o conteúdo' },
];

const FloatingActions: React.FC = () => {
  const { selectedBooks, clearSelection } = useBookSelection();
  const [showModal, setShowModal] = useState(false);

  if (selectedBooks.length === 0) return null;

  const handleAction = (actionId: string) => {
    if (selectedBooks.length > 1 && actionId !== 'comparar') {
      setShowModal(true);
    } else {
      console.log(`Action: ${actionId}`, selectedBooks);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
        <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-2xl shadow-floating border border-border">
          {/* Selection Count */}
          <div className="flex items-center gap-2 pr-3 border-r border-border">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
              {selectedBooks.length}
            </div>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {selectedBooks.length === 1 ? 'livro selecionado' : 'livros selecionados'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
                  "hover:shadow-md active:scale-95",
                  "text-sm font-medium",
                  action.id === 'resumir' || action.id === 'comparar'
                    ? "bg-gradient-primary text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                <action.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Clear Selection */}
          <button
            onClick={clearSelection}
            className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
            aria-label="Limpar seleção"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Multi-book Options Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif">
              <Sparkles className="w-5 h-5 text-primary" />
              O que deseja fazer?
            </DialogTitle>
            <DialogDescription>
              Selecione uma opção para os {selectedBooks.length} livros escolhidos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {multiBookOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  console.log(`Multi-book action: ${option.id}`, selectedBooks);
                  setShowModal(false);
                }}
                className={cn(
                  "flex flex-col items-start gap-1 p-4 rounded-xl border border-border",
                  "transition-all duration-200 text-left",
                  "hover:border-primary hover:bg-primary-light hover:shadow-sm"
                )}
              >
                <span className="font-medium text-foreground">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingActions;
