import React, { useState, useEffect, useRef } from 'react';

interface RotaryKnobProps {
  value: number;
  onChange: (val: number) => void;
  label: string;
  icon?: React.ReactNode;
  colorClass?: string;
}

export function RotaryKnob({ value, onChange, label, icon, colorClass = "text-blue-400" }: RotaryKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startVal = useRef(value);

  useEffect(() => {
    const handleMove = (clientY: number) => {
      if (!isDragging) return;
      const deltaY = startY.current - clientY;
      // 1 pixel = 1 degree sensitivity
      let newVal = Math.round(startVal.current + deltaY);
      while (newVal <= 0) newVal += 360;
      while (newVal > 360) newVal -= 360;
      onChange(newVal);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].clientY);
    };

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, onChange]);

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent page scroll when scrolling on the knob
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -1 : 1;
    let newVal = value + delta;
    if (newVal <= 0) newVal += 360;
    if (newVal > 360) newVal -= 360;
    onChange(newVal);
  };

  const stopEvent = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="flex flex-col items-center gap-1.5"
      onMouseDown={stopEvent}
      onDoubleClick={stopEvent}
      onTouchStart={stopEvent}
      onWheel={stopEvent}
    >
      <div className={`font-mono text-sm font-semibold select-none ${colorClass}`}>
        {value.toString().padStart(3, '0')}&deg;
      </div>
      
      <div 
        ref={knobRef}
        className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.5)] relative cursor-ns-resize flex items-center justify-center group hover:border-slate-500 transition-colors"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDragging(true);
          startY.current = e.clientY;
          startVal.current = value;
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsDragging(true);
          startY.current = e.touches[0].clientY;
          startVal.current = value;
        }}
        onWheel={handleWheel}
      >
        {/* Rotating part */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{ transform: `rotate(${value}deg)` }}
        >
          {/* Tick mark */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded-full mt-0.5 shadow-[0_0_3px_rgba(255,255,255,0.5)]"></div>
        </div>
        
        {/* Inner grip texture */}
        <div className="w-5 h-5 rounded-full border border-slate-700 bg-slate-700/50 flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full border border-slate-600"></div>
        </div>
      </div>

      <div className="text-[9px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1">
        {icon} {label}
      </div>
    </div>
  );
}
