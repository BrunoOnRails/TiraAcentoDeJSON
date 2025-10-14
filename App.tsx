
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import JsonViewer from './components/JsonViewer';
import { removeAccentsFromObject } from './services/jsonProcessor';
import Button from './components/Button';
import { ArrowDownTrayIcon, ExclamationTriangleIcon } from './components/Icons';

export default function App() {
  const [originalJson, setOriginalJson] = useState<any | null>(null);
  const [modifiedJson, setModifiedJson] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = useCallback((file: File) => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    setOriginalJson(null);
    setModifiedJson(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          throw new Error('File is empty or could not be read.');
        }
        const parsedJson = JSON.parse(text);
        const accentRemovedJson = removeAccentsFromObject(parsedJson);
        setOriginalJson(parsedJson);
        setModifiedJson(accentRemovedJson);
      } catch (e) {
        if (e instanceof SyntaxError) {
          setError('Invalid JSON file. Please check the file format and try again.');
        } else if (e instanceof Error) {
           setError(`An error occurred: ${e.message}`);
        } else {
           setError('An unknown error occurred while processing the file.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
        setIsLoading(false);
    };
    reader.readAsText(file);
  }, []);

  const handleDownload = () => {
    if (!modifiedJson) return;

    const jsonString = JSON.stringify(modifiedJson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const newFileName = fileName.replace('.json', '_sem_acentos.json');
    a.download = newFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
          <FileUploader onFileSelect={handleFileChange} isLoading={isLoading} />

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 mr-3 text-red-400" />
              <p>{error}</p>
            </div>
          )}

          {originalJson && modifiedJson && !error && (
            <>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <JsonViewer title="Original JSON" data={originalJson} />
                <JsonViewer title="JSON Modificado (Sem Acentos)" data={modifiedJson} />
              </div>
              <div className="mt-8 text-center">
                <Button onClick={handleDownload} disabled={!modifiedJson}>
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Download do Arquivo Modificado
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Desenvolvido com React, TypeScript e Tailwind CSS.</p>
      </footer>
    </div>
  );
}
