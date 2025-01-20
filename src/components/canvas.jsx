import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const ZoomableCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const renderToCanvas = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    if (!container || !canvas) return;

    // Use html2canvas to capture the container as an image
    const containerCanvas = await html2canvas(container);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom
    ctx.save();
    ctx.scale(zoom, zoom);

    // Draw the captured image onto the canvas
    ctx.drawImage(containerCanvas, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    renderToCanvas();
  }, [zoom]);

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 5)); // Max zoom: 5
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Min zoom: 0.5

  return (
    <div style="width: 100%; overflow-x: auto; border: 1px solid black;">
    <div
      style="
        display: grid;
        grid-template-columns: repeat(30, 200px); /* 30 columns, each 200px wide */
        grid-gap: 10px; /* Space between cells */
        width: 6000px; /* Total width of the grid */
        height: 1000px; /* Total height of the grid */
        background: #f9f9f9;
      "
    >
      <!-- Grid Items -->
      <div style="background: #ff7e5f; display: flex; align-items: center; justify-content: center;">1</div>
      <div style="background: #feb47b; display: flex; align-items: center; justify-content: center;">2</div>
      <div style="background: #ff7e5f; display: flex; align-items: center; justify-content: center;">3</div>
      <div style="background: #feb47b; display: flex; align-items: center; justify-content: center;">4</div>
      <!-- Repeat more grid items -->
      <!-- Example for 30x5 matrix -->
      ${Array(150)
        .fill(null)
        .map(
          (_, i) =>
            `<div style="background: ${
              i % 2 === 0 ? "#ff7e5f" : "#feb47b"
            }; display: flex; align-items: center; justify-content: center;">${i + 1}</div>`
        )
        .join("")}
    </div>
  </div>
  
  );
};

export default ZoomableCanvas;
