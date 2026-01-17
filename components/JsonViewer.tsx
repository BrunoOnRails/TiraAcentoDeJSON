
import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './Icons';

interface JsonViewerProps {
  title: string;
  data: any;
  isOutput?: boolean;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ title, data, isOutput }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[400px] rounded-2xl border border-brand-border bg-white overflow-hidden shadow-sm">
      <div className="px-5 py-3 border-b border-brand-border flex justify-between items-center shrink-0 bg-slate-50/50">
        <h3 className="text-[11px] font-bold text-brand-muted uppercase tracking-widest">{title}</h3>
        <button 
          onClick={copyToClipboard}
          className="p-2 hover:bg-white rounded-lg text-brand-muted hover:text-brand-primary border border-transparent hover:border-brand-border transition-all"
        >
          {copied ? <CheckIcon className="h-4 w-4 text-green-600" /> : <ClipboardIcon className="h-4 w-4" />}
        </button>
      </div>
      <div className="flex-grow overflow-auto p-5 font-mono text-[13px] leading-relaxed bg-white">
        <pre className="text-slate-700 whitespace-pre-wrap break-all">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default JsonViewer;
