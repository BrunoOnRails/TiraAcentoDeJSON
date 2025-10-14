
import React from 'react';

interface JsonViewerProps {
  title: string;
  data: any;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ title, data }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-cyan-400">{title}</h3>
      <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 flex-grow h-96 overflow-auto">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap break-all">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default JsonViewer;
