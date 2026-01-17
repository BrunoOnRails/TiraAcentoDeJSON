
import React from 'react';
import { ArrowDownTrayIcon, BeakerIcon } from './Icons';
import Button from './Button';

interface HeaderProps {
  onDownload: () => void;
  hasData: boolean;
  fileName: string;
}

const Header: React.FC<HeaderProps> = ({ onDownload, hasData, fileName }) => {
  return (
    <header className="h-14 px-6 border-b border-studio-border bg-studio-panel flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-studio-accent/20 p-1.5 rounded-md">
            <BeakerIcon className="h-5 w-5 text-studio-accent" />
          </div>
          <h1 className="text-sm font-semibold tracking-tight text-white hidden sm:block">
            JSON Accent Remover
          </h1>
        </div>
        {fileName && (
          <div className="h-4 w-px bg-studio-border mx-2"></div>
        )}
        <span className="text-xs text-studio-muted truncate max-w-[200px]">
          {fileName || 'Novo Projeto'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {hasData && (
          <Button 
            onClick={onDownload} 
            className="h-8 px-4 text-xs font-medium bg-studio-accent hover:bg-studio-accent/90 text-white rounded-md flex items-center gap-2 transition-all shadow-sm shadow-studio-accent/20"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download JSON
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
