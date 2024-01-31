import React, { useRef, useState, useEffect } from 'react';

const ColorPicker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const rect = canvasRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const imageData = ctx.getImageData(x, y, 1, 1).data;
          setColor(`rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`);
        }
      }
    };

    const handleClick = () => {
      const input = document.createElement('input');
      input.value = color;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      alert(`Color ${color} copied to clipboard!`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [color]);

  return (
    <div>
      <canvas ref={canvasRef} width={1} height={1} style={{ display: 'none' }}></canvas>
      <div style={{ backgroundColor: color, width: '100px', height: '100px' }}></div>
    </div>
  );
};

export default ColorPicker;
