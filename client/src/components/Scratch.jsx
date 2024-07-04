import React, { useRef, useEffect, useState, useCallback } from "react";

const ScratchCard = ({ width, height, image, brushSize }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = imageRef.current;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      // Fit the image within the canvas dimensions
      context.drawImage(image, 0, 0, width, height);
      context.globalCompositeOperation = "destination-out";
    };
  }, [width, height]);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
  };

  const calculateScratchedPercent = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const pixels = context.getImageData(0, 0, width, height).data;
    const totalPixels = width * height;
    let scratchedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    setScratchedPercent((scratchedPixels / totalPixels) * 100);
  }, [width, height]);

  const handleMouseUp = useCallback(() => {
    if (isMouseDown) {
      setIsMouseDown(false);
      calculateScratchedPercent();
    }
  }, [isMouseDown, calculateScratchedPercent]);

  const scratch = (e) => {
    if (!isMouseDown) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.arc(x, y, brushSize, 0, Math.PI * 2, true);
    context.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.font = "24px Arial";
    context.textAlign = "center";
    context.fillText("Scratch Here!", width / 2, height / 2);
  }, [width, height]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={scratch}
        onMouseUp={handleMouseUp}
        style={{
          borderRadius: '20px', // Adjust the border radius as needed
          display: 'block',
          border: '2px solid white',
          color: 'white'
        }}
      />
      <img
        ref={imageRef}
        src={image}
        alt="hidden"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ScratchCard;
