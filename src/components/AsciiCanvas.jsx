import React, { useState, useRef, useEffect } from 'react';
import realAvatar from '../assets/avatar_final.png';

const ASCII_FACE_REMOVEBG = `                                                                           
                               ....                                        
                            .::==:::..                                     
                           .:::==:::::..                                   
                          .:::.:::::::::....                               
                         ...:=:.:::==:::..:..                              
                         .::::=::=::.::::....                              
                        ..:=::=::::=*%*::...                               
                         .:::===++%##%*+=:.                                
                          .:+***%%#%*****=:.                               
                          ==+++**+%%%%**%+*%                               
                         :#=*%##%%#%#@@##+%#.                              
                         :#+*###%*%*#@##%+%*                               
                          ==*%%*+*%%**%%*.:                                
                           .+%%**%%%%%%*=                                  
                            .+**%%*%#%+==.                                 
                             .=:=+++===+%:                                 
                              *++++++*###+                                 
                             .*#%####@@##*=:..                             
                            :=*####@@@@@%=+====::..                        
                          .:=*%%##@@@@@%=======+====:.                     
                       .::==:*####@@@#*======+=========:                   
                     .:=======%####@%=============+===++=.                 
                  .::=========+*###%==+======+====+++++++=.                
                 :===============%@*+++======++++++++++=++=.               
                :===============+*#++++===+===+++++=+++=+++:               
               .================+++++++++++++++++++=++=+++==.              
               :===================+++++++++++++++++=+++++=+=              
              .=====+=========+++=+%++++++++++++++=+=+++++===.             
              :=====+=======+++++++*++++++++++++++====+++===+:             
             .==============+++++++++++++++++++++=+===+++===+=             
             :==============++++++++++++*++++++=======+++=====.            
             :+===+==========++++=+*++++++++++========++=====+:            
             =+===++=========++++=+%++++++++++==========+====+=            
             =+===============++=++++++++++++++=============++=.           
            .====+===============++*+++*++++++++============+==:           
            .====++=============+++++++*+++++++===========+++==:           
            .====++============++=++++++++++==+==========++++==:           
            .====+================++++++++++============+++++==:           
            .====+==============+++++++++++++==+=========++++==:           
            .====++=============+++++++++++++====+========+++==:           
            :===================++++++++++++=+=================:           
            :==+================+++++++++++++++===========+=++=.           
            :==+===============++++++++++++=+=++=+=======++=+==.           
            :==++==============++++++++++++++++==========++==+:            
            ===++===============+++++++++++++++++=======+++===:            
            ===+=================+++++++++++++=+==============:            
            ===+===================+++++++++++==========+=====.            
            ===+===================++++++++++++=========+==+=:             
            ===+====:================+=+++++++++=============.             
            ===++==::===============+++++++++++==============              
            :===+==::==============+++++++++++==============:              
            :======:.===============+=++++=+++++===+*+======.              
            :==++==:.===============+=+++++++=====+**=.:====.              
            :==++==::===============++=+++++++===*##+...:===:              
            :======================++++=++++===+%####*:.====:              
            .=======:=============++++++=+++++*%######+======.             
            .=======:=============++++=====++*%######%=======:             
            .=======::=============++=+====+*%*####%%%=======:             
             =++*****=================+====+#%%###%%%*=======:             
             +######%+=====================*%*#%#%%%%+=======:             
             +%%####%%====================+%+%%%#%%#*=+======.             
            .*%%%###%*====================++**%#%#%%+========.             
            .**%%%#%++====================++++*****++========.             `;

export default function AsciiCanvas() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgRect, setImgRect] = useState(null);
  const containerRef = useRef(null);
  const preRef = useRef(null);
  const leaveTimerRef = useRef(null);

  const measurePreRect = () => {
    if (!preRef.current || !containerRef.current) return;
    const preBox = preRef.current.getBoundingClientRect();
    const containerBox = containerRef.current.getBoundingClientRect();
    setImgRect({
      top: preBox.top - containerBox.top,
      left: preBox.left - containerBox.left,
      width: preBox.width,
      height: preBox.height,
    });
  };

  useEffect(() => {
    const timer = setTimeout(measurePreRect, 100);
    window.addEventListener('resize', measurePreRect);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measurePreRect);
    };
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsHovered(true);
  };

  // Small delay on leave prevents flicker when cursor crosses a pixel boundary at edge
  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => setIsHovered(false), 80);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const r = 130; // spotlight radius px
  const cx = `${mousePos.x}%`;
  const cy = `${mousePos.y}%`;

  // KEY FIX: never switch between 'none' and a gradient — CSS cannot interpolate that.
  // Instead, always use a gradient; when not hovered, use radius=0 so it's invisible.
  // This lets the browser smoothly tween the mask at all times.
  const asciiMask = isHovered
    ? `radial-gradient(circle ${r}px at ${cx} ${cy}, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,1) 85%)`
    : `radial-gradient(circle 0px at ${cx} ${cy}, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)`;

  const photoMask = isHovered
    ? `radial-gradient(circle ${r}px at ${cx} ${cy}, black 0%, black 55%, transparent 95%)`
    : `radial-gradient(circle 0px at ${cx} ${cy}, transparent 0%, transparent 100%)`;

  return (
    <div className="relative w-full flex flex-col items-center justify-center max-w-xl mx-auto select-none px-2 sm:px-4">
      {/* Interactive ASCII portrait card — scan-line + dual ambient glow */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="scan-line relative rounded-2xl overflow-hidden border border-white/15 bg-[#08090b] shadow-[0_0_50px_-15px_rgba(56,189,248,0.2),0_0_50px_-15px_rgba(244,63,94,0.15)] p-4 pb-2.5 w-full flex flex-col items-center justify-center cursor-crosshair transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_60px_-10px_rgba(56,189,248,0.3),0_0_60px_-10px_rgba(244,63,94,0.25)]"
      >
        {/* Top-right hint badge */}
        <div className="absolute top-3 right-3 z-30 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 text-[10px] font-mono backdrop-blur-md pointer-events-none transition-all duration-300">
          {isHovered ? (
            <span className="flex items-center gap-1.5 text-pink-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping inline-block" />
              Revealing
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Hover to reveal
            </span>
          )}
        </div>

        {/* ASCII pre — grounded right onto the bottom line */}
        <div className="pt-9 pb-0 w-full flex justify-center">
          <pre
            ref={preRef}
            className="text-[4px] sm:text-[5px] md:text-[6px] lg:text-[6.8px] leading-[1.12] tracking-[0.08em] text-[#dde4f0] whitespace-pre overflow-hidden select-none mx-auto block text-center p-0 m-0 relative z-10"
            style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              WebkitMaskImage: asciiMask,
              maskImage: asciiMask,
              transition: 'mask-image 0.25s ease, -webkit-mask-image 0.25s ease',
              willChange: 'mask-image',
            }}
          >
            {ASCII_FACE_REMOVEBG}
          </pre>
        </div>

        {/* Real photo — absolutely overlaid on the EXACT pre bounding box */}
        {imgRect && (
          <div
            className="absolute z-20 pointer-events-none overflow-hidden"
            style={{
              top: imgRect.top,
              left: imgRect.left,
              width: imgRect.width,
              height: imgRect.height,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease, mask-image 0.25s ease, -webkit-mask-image 0.25s ease',
              WebkitMaskImage: photoMask,
              maskImage: photoMask,
              willChange: 'opacity, mask-image',
            }}
          >
            <img
              src={realAvatar}
              alt="Arpit Avasarmol"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                display: 'block',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
