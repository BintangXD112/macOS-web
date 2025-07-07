import React, { useState } from 'react';
import WifiIcon from './icons/control-center/WifiIcon';
import BluetoothIcon from './icons/control-center/BluetoothIcon';
import BrightnessIcon from './icons/control-center/BrightnessIcon';
import VolumeIcon from './icons/control-center/VolumeIcon';
import MoonIcon from './icons/control-center/MoonIcon';

interface ControlCenterProps {
  isOpen: boolean;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen }) => {
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(50);

  if (!isOpen) return null;
  
  const sliderTrackStyle = `absolute h-full rounded-full bg-black/20`;
  const sliderThumbStyle = `absolute top-1/2 left-0 w-full h-0 appearance-none bg-transparent 
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                           [&::-webkit-slider-thumb]:-translate-y-1/2 [&::-webkit-slider-thumb]:shadow-md
                           [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 
                           [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white 
                           [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md`;

  return (
    <div className="font-sf absolute top-8 right-4 w-80 bg-black/25 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 shadow-2xl z-50 text-white animate-fade-in-down">
      <div className="grid grid-cols-2 gap-3">
        {/* Wifi & Bluetooth */}
        <div className="col-span-1 row-span-2 bg-white/20 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
              <WifiIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Wi-Fi</p>
              <p className="text-xs text-zinc-300">Jaringan Rumah</p>
            </div>
          </div>
           <div className="flex items-start gap-3 mt-2">
            <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
              <BluetoothIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Bluetooth</p>
              <p className="text-xs text-zinc-300">Aktif</p>
            </div>
          </div>
        </div>
        
        {/* Do Not Disturb & Display */}
         <div className="col-span-1 row-span-1 bg-white/20 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/30">
           <div className="bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center">
              <MoonIcon className="w-5 h-5" />
           </div>
           <p className="font-semibold text-sm">Jangan Ganggu</p>
         </div>
         <div className="col-span-1 row-span-1 bg-white/20 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/30">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500">
                <span className="text-xl">🖥️</span>
            </div>
           <p className="font-semibold text-sm">Tampilan</p>
         </div>
      </div>
      
      {/* Sliders */}
      <div className="mt-3 bg-white/20 rounded-xl p-3">
        <label className="text-sm font-semibold">Kecerahan</label>
        <div className="flex items-center gap-2 mt-1">
          <BrightnessIcon className="w-5 h-5 text-zinc-300" />
          <div className="relative w-full h-6 flex items-center">
            <div className={sliderTrackStyle} style={{left: 0, right: 0}}/>
            <div className={`${sliderTrackStyle} bg-white`} style={{width: `${brightness}%`}} />
            <input type="range" min="0" max="100" value={brightness} onChange={e => setBrightness(Number(e.target.value))} className={sliderThumbStyle} />
          </div>
        </div>
      </div>
      
      <div className="mt-3 bg-white/20 rounded-xl p-3">
        <label className="text-sm font-semibold">Suara</label>
         <div className="flex items-center gap-2 mt-1">
          <VolumeIcon className="w-5 h-5 text-zinc-300" />
          <div className="relative w-full h-6 flex items-center">
            <div className={sliderTrackStyle} style={{left: 0, right: 0}}/>
            <div className={`${sliderTrackStyle} bg-white`} style={{width: `${volume}%`}} />
            <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className={sliderThumbStyle} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ControlCenter;