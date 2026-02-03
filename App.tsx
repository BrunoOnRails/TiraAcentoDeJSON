
import React, { useState, useCallback } from 'react';
import FileUploader from './components/FileUploader';
import JsonViewer from './components/JsonViewer';
import { removeAccentsFromObject } from './services/jsonProcessor';
import { 
  ArrowDownTrayIcon, 
  ExclamationTriangleIcon, 
  DocumentTextIcon,
  ChevronLeftIcon,
  SparklesIcon
} from './components/Icons';

export default function App() {
  const [originalJson, setOriginalJson] = useState<any | null>(null);
  const [modifiedJson, setModifiedJson] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processKeys, setProcessKeys] = useState<boolean>(true);

  const handleFileChange = useCallback((file: File) => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) throw new Error('O arquivo está vazio.');
        const parsedJson = JSON.parse(text);
        const accentRemovedJson = removeAccentsFromObject(parsedJson, processKeys);
        setOriginalJson(parsedJson);
        setModifiedJson(accentRemovedJson);
      } catch (e) {
        setError(e instanceof SyntaxError ? 'Formato JSON inválido.' : 'Erro ao processar arquivo.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  }, [processKeys]);

  const handleDownload = () => {
    if (!modifiedJson) return;
    const jsonString = JSON.stringify(modifiedJson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.json', '_limpo.json');
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setOriginalJson(null);
    setModifiedJson(null);
    setFileName('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 md:px-0">
      {/* Top Navigation */}
      <div className="w-full max-w-4xl flex justify-start mb-8">
        <button 
          onClick={() => window.location.href = 'https://brunosilva.dev'}
          className="flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-primary transition-colors bg-white px-4 py-2 rounded-xl border border-brand-border shadow-sm"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Voltar ao Início
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="bg-brand-primary p-4 rounded-2xl shadow-lg shadow-brand-primary/20 mb-6">
          <DocumentTextIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-brand-text mb-3 tracking-tight">
          JSON Formatter Pro
        </h1>
        <p className="text-brand-muted max-w-lg text-lg">
          Remova acentos e caracteres especiais de arquivos JSON instantaneamente. 
          Ideal para integração de sistemas e higienização de dados.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        {/* Config Card */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-1">
                Configurações de Limpeza
              </h3>
              <p className="text-xs text-brand-muted">Escolha como os dados devem ser processados</p>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="text-sm font-medium text-brand-text">Limpar Chaves?</span>
               <button 
                onClick={() => setProcessKeys(!processKeys)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${processKeys ? 'bg-brand-primary' : 'bg-slate-200'}`}
               >
                 <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${processKeys ? 'translate-x-6' : 'translate-x-1'}`} />
               </button>
            </div>
          </div>
        </div>

        {/* Action Area */}
        {!originalJson ? (
          <div className="space-y-4">
            <FileUploader onFileSelect={handleFileChange} isLoading={isLoading} />
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <ExclamationTriangleIcon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
            
            <p className="text-center text-xs text-brand-muted">
              © 2025 JSON Formatter Pro. Seus dados são processados localmente.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <JsonViewer title="Entrada Original" data={originalJson} />
                <JsonViewer title="Saída Formatada" data={modifiedJson} isOutput />
             </div>

             <div className="flex justify-center pt-4">
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-3 bg-brand-primary hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl shadow-brand-primary/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Baixar Arquivo Limpo
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
