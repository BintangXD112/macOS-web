
import React from 'react';
import Editor, { loader } from '@monaco-editor/react';

// You can use a CDN for the monaco-editor library
loader.config({ paths: { vs: 'https://esm.sh/monaco-editor@0.50.0/esm/vs' } });

const Vscode: React.FC = () => {
  const defaultCode = `// Selamat datang di VS Code Web!
// Anda dapat mulai mengedit file ini.

function greet() {
    console.log("Halo, dari dalam macOS Web!");
}

greet();
`;

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="typescript"
        defaultValue={defaultCode}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default Vscode;
