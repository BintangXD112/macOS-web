
import React, { useState } from 'react';

const Notes: React.FC = () => {
  const [content, setContent] = useState(
    "Catatan Cepat\n\n- Ide untuk proyek selanjutnya\n- Daftar belanjaan\n- Ingat untuk mencoba aplikasi Gemini AI!"
  );

  return (
    <div className="h-full w-full bg-yellow-100 flex flex-col">
      <div className="w-full h-8 bg-yellow-200 flex-shrink-0"></div>
      <textarea
        className="w-full h-full p-6 bg-[#FEF9C3] text-zinc-800 resize-none focus:outline-none font-serif leading-loose"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default Notes;
