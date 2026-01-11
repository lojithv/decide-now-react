import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface SpinningWheelProps {
  options: string[];
  onResult: (result: string) => void;
  disabled?: boolean;
}

const WHEEL_COLORS = [
  "hsl(173, 80%, 45%)",
  "hsl(190, 80%, 50%)",
  "hsl(210, 70%, 55%)",
  "hsl(230, 65%, 60%)",
  "hsl(260, 60%, 55%)",
  "hsl(290, 65%, 55%)",
  "hsl(320, 70%, 55%)",
  "hsl(350, 75%, 55%)",
  "hsl(20, 80%, 55%)",
  "hsl(45, 85%, 55%)",
  "hsl(75, 75%, 50%)",
  "hsl(120, 70%, 45%)",
];

const SpinningWheel = ({ options, onResult, disabled = false }: SpinningWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / options.length;

  const spin = () => {
    if (isSpinning || disabled || options.length === 0) return;

    setIsSpinning(true);
    
    // Random number of full rotations (3-5) plus random position
    const fullRotations = 3 + Math.random() * 2;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (fullRotations * 360) + randomAngle;
    
    setRotation(totalRotation);

    // Calculate the winning segment
    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360) + 90) % 360;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle) % options.length;
      onResult(options[winningIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const getTextPosition = (index: number) => {
    const angle = (index * segmentAngle) + (segmentAngle / 2) - 90;
    const radians = (angle * Math.PI) / 180;
    const radius = 35;
    return {
      x: 50 + radius * Math.cos(radians),
      y: 50 + radius * Math.sin(radians),
      rotation: angle + 90,
    };
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-foreground drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <div 
          ref={wheelRef}
          className="relative w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)' : 'none',
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            {options.map((option, index) => {
              const startAngle = index * segmentAngle - 90;
              const endAngle = (index + 1) * segmentAngle - 90;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);
              
              const largeArc = segmentAngle > 180 ? 1 : 0;
              
              const d = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
              
              const textPos = getTextPosition(index);
              
              return (
                <g key={index}>
                  <path
                    d={d}
                    fill={WHEEL_COLORS[index % WHEEL_COLORS.length]}
                    stroke="white"
                    strokeWidth="0.5"
                  />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    fill="white"
                    fontSize={options.length > 8 ? "3" : "4"}
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                    className="pointer-events-none select-none"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    {option.length > 12 ? option.substring(0, 12) + '...' : option}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="50" cy="50" r="8" fill="white" className="drop-shadow-md" />
            <circle cx="50" cy="50" r="6" fill="hsl(var(--foreground))" />
          </svg>
        </div>

        {/* Glow effect when spinning */}
        {isSpinning && (
          <div className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
        )}
      </div>

      {/* Spin Button */}
      <Button
        variant="hero"
        size="xl"
        onClick={spin}
        disabled={isSpinning || disabled || options.length === 0}
        className="min-w-[200px]"
      >
        {isSpinning ? (
          <span className="animate-pulse">Spinning...</span>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Spin the Wheel
          </>
        )}
      </Button>
    </div>
  );
};

export default SpinningWheel;
