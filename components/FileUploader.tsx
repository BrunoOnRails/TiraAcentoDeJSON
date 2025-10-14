
import React, { useCallback, useState } from 'react';
import { ArrowUpTrayIcon, DocumentTextIcon, CheckCircleIcon } from './Icons';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
    // Reset the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === 'application/json') {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      // Could show an error here
      console.error("Invalid file type. Please upload a JSON file.");
    }
  }, [onFileSelect]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className={`relative flex flex-col items-center justify-center w-full h-48 sm:h-56 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                    ${isDragOver ? 'border-indigo-400 bg-indigo-900/20' : 'border-gray-600 hover:border-gray-500 bg-gray-700/50 hover:bg-gray-700'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center text-center">
            {isLoading ? (
                <>
                    <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-300">Processando...</p>
                </>
            ) : fileName ? (
                 <>
                    <CheckCircleIcon className="h-12 w-12 text-green-400" />
                    <p className="mt-2 text-lg font-semibold text-gray-200">{fileName}</p>
                    <p className="text-sm text-gray-400">Arquivo carregado. Clique ou arraste para substituir.</p>
                </>
            ) : (
                <>
                    <ArrowUpTrayIcon className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-lg text-gray-300">
                        <span className="font-semibold text-indigo-400">Clique para fazer upload</span> ou arraste e solte
                    </p>
                    <p className="text-sm text-gray-500">Apenas arquivos JSON são permitidos</p>
                </>
            )}
        </div>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".json" disabled={isLoading} />
      </label>
    </div>
  );
};

export default FileUploader;
