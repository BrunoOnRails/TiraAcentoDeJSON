
import React from 'react';
import { WrenchScrewdriverIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center border-b border-gray-700/50">
        <div className="inline-flex items-center justify-center bg-indigo-500/10 text-indigo-400 rounded-full p-3 mb-4">
            <WrenchScrewdriverIcon className="h-8 w-8" />
        </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        Removedor de Acentos JSON
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Faça o upload de um arquivo JSON para remover automaticamente os acentos de todas as chaves e valores de texto.
      </p>
    </header>
  );
};

export default Header;
