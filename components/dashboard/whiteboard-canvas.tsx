"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pencil,
  Eraser,
  Trash2,
  Undo2,
  Redo2,
  Palette,
  Circle,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WhiteboardCanvasProps {
  onCanvasChange?: (dataUrl: string) => void;
  className?: string;
  fullWidth?: boolean;
}

const COLORS = [
  "#000000", // Black
  "#FFFFFF", // White
  "#FF3B30", // Red
  "#FF9500", // Orange
  "#FFCC00", // Yellow
  "#34C759", // Green
  "#007AFF", // Blue
  "#5856D6", // Purple
  "#AF52DE", // Magenta
  "#8E8E93", // Gray
];

export function WhiteboardCanvas({
  onCanvasChange,
  className,
  fullWidth = false,
}: WhiteboardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Save current content
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      // Restore content
      ctx.putImageData(imageData, 0, 0);

      // Set white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Configure context
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
    };

    resizeCanvas();
    setContext(ctx);

    // Save initial state
    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialState]);
    setHistoryIndex(0);

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Update context settings when tool/color/width changes
  useEffect(() => {
    if (!context) return;
    context.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    context.lineWidth = tool === "eraser" ? strokeWidth * 3 : strokeWidth;
  }, [context, tool, color, strokeWidth]);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    const clientY = "touches" in e ? (e.touches[0]?.clientY ?? 0) : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!context) return;

      const pos = getPos(e);
      lastPos.current = pos;
      setIsDrawing(true);

      context.beginPath();
      context.moveTo(pos.x, pos.y);
    },
    [context, getPos],
  );

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawing || !context || !lastPos.current) return;

      const pos = getPos(e);

      context.beginPath();
      context.moveTo(lastPos.current.x, lastPos.current.y);
      context.lineTo(pos.x, pos.y);
      context.stroke();

      lastPos.current = pos;
    },
    [isDrawing, context, getPos],
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing || !context || !canvasRef.current) return;

    setIsDrawing(false);
    lastPos.current = null;
    context.closePath();

    // Save to history
    const canvas = canvasRef.current;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      // Limit history to 50 states
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));

    // Notify parent of change
    if (onCanvasChange) {
      onCanvasChange(canvas.toDataURL("image/png"));
    }
  }, [isDrawing, context, historyIndex, onCanvasChange]);

  const undo = useCallback(() => {
    if (historyIndex <= 0 || !context || !canvasRef.current) return;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    context.putImageData(history[newIndex], 0, 0);

    if (onCanvasChange && canvasRef.current) {
      onCanvasChange(canvasRef.current.toDataURL("image/png"));
    }
  }, [historyIndex, history, context, onCanvasChange]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1 || !context || !canvasRef.current)
      return;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    context.putImageData(history[newIndex], 0, 0);

    if (onCanvasChange && canvasRef.current) {
      onCanvasChange(canvasRef.current.toDataURL("image/png"));
    }
  }, [historyIndex, history, context, onCanvasChange]);

  const clearCanvas = useCallback(() => {
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    context.fillStyle = "#FFFFFF";
    context.fillRect(
      0,
      0,
      canvas.width / (window.devicePixelRatio || 1),
      canvas.height / (window.devicePixelRatio || 1),
    );

    // Save to history
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), imageData]);
    setHistoryIndex((prev) => prev + 1);

    if (onCanvasChange) {
      onCanvasChange(canvas.toDataURL("image/png"));
    }
  }, [context, historyIndex, onCanvasChange]);

  const downloadCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }, []);

  // Expose getCanvasData method
  const getCanvasData = useCallback(() => {
    if (!canvasRef.current) return null;
    return canvasRef.current.toDataURL("image/png");
  }, []);

  // Attach method to ref for parent access
  useEffect(() => {
    if (canvasRef.current) {
      (canvasRef.current as any).getCanvasData = getCanvasData;
    }
  }, [getCanvasData]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-muted/50 border border-border/50">
        {/* Pen Tool */}
        <Button
          variant={tool === "pen" ? "default" : "ghost"}
          size="sm"
          onClick={() => setTool("pen")}
          className="gap-2"
        >
          <Pencil className="w-4 h-4" />
          <span className="hidden sm:inline">Pen</span>
        </Button>

        {/* Eraser Tool */}
        <Button
          variant={tool === "eraser" ? "default" : "ghost"}
          size="sm"
          onClick={() => setTool("eraser")}
          className="gap-2"
        >
          <Eraser className="w-4 h-4" />
          <span className="hidden sm:inline">Eraser</span>
        </Button>

        <div className="w-px h-6 bg-border/50" />

        {/* Color Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div
                className="w-5 h-5 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
              />
              <span className="hidden sm:inline">Color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                    color === c
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border",
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Stroke Width */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Circle className="w-4 h-4" />
              <span className="hidden sm:inline">{strokeWidth}px</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-3">
            <div className="space-y-3">
              <p className="text-sm font-medium">
                Stroke Width: {strokeWidth}px
              </p>
              <Slider
                value={[strokeWidth]}
                onValueChange={(v) => setStrokeWidth(v[0])}
                min={1}
                max={20}
                step={1}
              />
            </div>
          </PopoverContent>
        </Popover>

        <div className="w-px h-6 bg-border/50" />

        {/* Undo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={historyIndex <= 0}
        >
          <Undo2 className="w-4 h-4" />
        </Button>

        {/* Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
        >
          <Redo2 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border/50" />

        {/* Clear */}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCanvas}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        {/* Download */}
        <Button variant="ghost" size="sm" onClick={downloadCanvas}>
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full rounded-xl border-2 border-dashed border-border/50 bg-white overflow-hidden cursor-crosshair",
          fullWidth ? "h-[500px] md:h-[600px]" : "h-[400px] md:h-[500px]",
        )}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 touch-none"
        />
      </div>
    </div>
  );
}
