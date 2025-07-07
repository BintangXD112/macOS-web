
import React, { useState, useRef } from 'react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
  const [displayUrl, setDisplayUrl] = useState('https://www.google.com');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = url;
    if (!url.startsWith('http')) {
        finalUrl = 'https://' + url;
    }
    setDisplayUrl(finalUrl);
    if(iframeRef.current) {
        // A trick to make Google embeddable
        if (finalUrl.includes('google.com')) {
           iframeRef.current.src = 'https://www.google.com/webhp?igu=1';
        } else {
           iframeRef.current.src = finalUrl;
        }
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="flex-shrink-0 h-12 bg-gray-200 border-b border-gray-300 flex items-center px-2 gap-2">
        <form onSubmit={handleNavigate} className="flex-grow">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-8 px-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan URL"
          />
        </form>
      </div>
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full border-0"
        title="Browser"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation"
      />
    </div>
  );
};

export default Browser;
