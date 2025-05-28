import React from 'react';
import { Plus } from 'lucide-react'; // Optional: using Lucide icons (you can also use plain text/icon)

function Clips() {
  const videos = [
    "assets/02vE7Z7r2oqq02ih01FHYMdy6uTW008202xSXTBelzjLGN00s.mp4",
    "assets/Kxa0101yZOyNFM4b00YRuvh3qMrm9SHEpl00LPfiZkUfQ48.mp4",
    "assets/UC5tFZQLnLedyzvwlFmEa00OsKbsyyQpX01ITXQwxsnYY.mp4",
    "assets/8G3gjrzKdg2nhfPGjrxiPUk7XTx702Cz4KO6lwl3AcP8.mp4",
    "assets/5QHwMsKtbGJSGXgG9K8T4AHIKl5wqixS4M65o016MSi8.mp4",
  ];

  return (
    <div className="flex overflow-x-auto gap-4 p-8">
      {videos.map((src, index) => (
        <div key={index} className="relative flex-shrink-0 w-64 h-96 rounded-xl overflow-hidden ">
          <video
            src={src}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-40 transition">
            <Plus className="text-white w-10 h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Clips;
