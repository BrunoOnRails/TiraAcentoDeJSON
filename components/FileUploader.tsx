
import React, { useCallback, useState } from 'react';
import { CloudArrowUpIcon } from './Icons';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelect(file);
    event.target.value = '';
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className={`relative flex flex-col items-center justify-center w-full min-h-[280px] p-8 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 group
                    ${isDragOver 
                      ? 'border-brand-primary bg-blue-50/50 ring-8 ring-brand-primary/5' 
                      : 'border-slate-300 hover:border-brand-primary/50 bg-white hover:bg-slate-50/50 shadow-sm'}`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="flex flex-col items-center justify-center text-center">
            {isLoading ? (
                <div className="flex flex-col items-center">
                    <div className="animate-spin h-10 w-10 border-4 border-brand-primary border-t-transparent rounded-full mb-4"></div>
                    <p className="text-lg font-medium text-brand-text">Higienizando dados...</p>
                </div>
            ) : (
                <>
                    <div className="mb-6 p-5 rounded-full bg-blue-50 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                        <CloudArrowUpIcon className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Arraste seu arquivo aqui</h2>
                    <p className="text-brand-muted font-medium">
                        Suporta arquivos <span className="text-brand-primary">JSON (.json)</span>
                    </p>
                </>
            )}
        </div>
        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".json" disabled={isLoading} />
      </label>
    </div>
  );
};

export default FileUploader;
