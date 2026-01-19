'use client';

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';

// Fabric.js types (dynamic import to avoid SSR issues)
type FabricCanvas = any;
type FabricObject = any;

export type AnnotationType = 'circle' | 'arrow' | 'rectangle' | 'freehand';

export interface Annotation {
  id: string;
  type: AnnotationType;
  // Normalized coordinates (0-1)
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: { x: number; y: number }[];
  color: string;
  timestamp: number;
}

export interface AnnotationCanvasProps {
  /** Width of the canvas (should match video) */
  width: number;
  /** Height of the canvas (should match video) */
  height: number;
  /** Current video timestamp */
  currentTime?: number;
  /** Existing annotations to display */
  annotations?: Annotation[];
  /** Current drawing tool */
  activeTool?: AnnotationType | null;
  /** Drawing color */
  color?: string;
  /** Called when annotation is created */
  onAnnotationCreate?: (annotation: Omit<Annotation, 'id'>) => void;
  /** Called when annotation is selected */
  onAnnotationSelect?: (annotation: Annotation | null) => void;
  /** Enable/disable drawing mode */
  editable?: boolean;
  /** CSS class name */
  className?: string;
}

export interface AnnotationCanvasRef {
  clearCanvas: () => void;
  exportAnnotations: () => Annotation[];
  setTool: (tool: AnnotationType | null) => void;
}

/**
 * AnnotationCanvas - Fabric.js overlay for video marking
 */
export const AnnotationCanvas = forwardRef<AnnotationCanvasRef, AnnotationCanvasProps>(
  function AnnotationCanvas(
    {
      width,
      height,
      currentTime = 0,
      annotations = [],
      activeTool = null,
      color = '#FF5733',
      onAnnotationCreate,
      onAnnotationSelect,
      editable = true,
      className = '',
    },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<FabricCanvas | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [fabricModule, setFabricModule] = useState<any>(null);

    // Dynamic import of fabric.js (SSR safe)
    useEffect(() => {
      import('fabric').then((module) => {
        setFabricModule(module);
      });
    }, []);

    // Initialize Fabric canvas
    useEffect(() => {
      if (!canvasRef.current || !fabricModule) return;

      const { Canvas } = fabricModule;

      const canvas = new Canvas(canvasRef.current, {
        width,
        height,
        selection: editable,
        backgroundColor: 'transparent',
      });

      fabricRef.current = canvas;

      // Handle object selection
      canvas.on('selection:created', (e: any) => {
        const selected = e.selected?.[0];
        if (selected?.data) {
          onAnnotationSelect?.(selected.data as Annotation);
        }
      });

      canvas.on('selection:cleared', () => {
        onAnnotationSelect?.(null);
      });

      return () => {
        canvas.dispose();
        fabricRef.current = null;
      };
    }, [width, height, fabricModule, editable]);

    // Handle drawing based on active tool
    useEffect(() => {
      if (!fabricRef.current || !fabricModule || !activeTool) return;

      const canvas = fabricRef.current;
      const { Circle, Rect, Line, Path } = fabricModule;

      canvas.isDrawingMode = activeTool === 'freehand';

      if (activeTool === 'freehand') {
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = 3;
      }

      let startPoint: { x: number; y: number } | null = null;
      let tempShape: FabricObject | null = null;

      const handleMouseDown = (e: any) => {
        if (!editable || activeTool === 'freehand') return;

        const pointer = canvas.getPointer(e.e);
        startPoint = { x: pointer.x, y: pointer.y };
        setIsDrawing(true);
      };

      const handleMouseMove = (e: any) => {
        if (!isDrawing || !startPoint || !editable || activeTool === 'freehand') return;

        const pointer = canvas.getPointer(e.e);

        // Remove temp shape
        if (tempShape) {
          canvas.remove(tempShape);
        }

        // Create temp shape based on tool
        if (activeTool === 'circle') {
          const radius = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) +
            Math.pow(pointer.y - startPoint.y, 2)
          );
          tempShape = new Circle({
            left: startPoint.x - radius,
            top: startPoint.y - radius,
            radius,
            fill: 'transparent',
            stroke: color,
            strokeWidth: 3,
            selectable: false,
          });
        } else if (activeTool === 'rectangle') {
          tempShape = new Rect({
            left: Math.min(startPoint.x, pointer.x),
            top: Math.min(startPoint.y, pointer.y),
            width: Math.abs(pointer.x - startPoint.x),
            height: Math.abs(pointer.y - startPoint.y),
            fill: 'transparent',
            stroke: color,
            strokeWidth: 3,
            selectable: false,
          });
        } else if (activeTool === 'arrow') {
          tempShape = new Line([startPoint.x, startPoint.y, pointer.x, pointer.y], {
            stroke: color,
            strokeWidth: 3,
            selectable: false,
          });
        }

        if (tempShape) {
          canvas.add(tempShape);
          canvas.renderAll();
        }
      };

      const handleMouseUp = (e: any) => {
        if (!isDrawing || !startPoint || !editable || activeTool === 'freehand') return;

        const pointer = canvas.getPointer(e.e);

        // Create final annotation
        const annotation: Omit<Annotation, 'id'> = {
          type: activeTool,
          x: startPoint.x / width,
          y: startPoint.y / height,
          color,
          timestamp: currentTime,
        };

        if (activeTool === 'circle') {
          annotation.radius = Math.sqrt(
            Math.pow(pointer.x - startPoint.x, 2) +
            Math.pow(pointer.y - startPoint.y, 2)
          ) / Math.min(width, height);
        } else if (activeTool === 'rectangle') {
          annotation.width = Math.abs(pointer.x - startPoint.x) / width;
          annotation.height = Math.abs(pointer.y - startPoint.y) / height;
        }

        onAnnotationCreate?.(annotation);

        setIsDrawing(false);
        startPoint = null;
        tempShape = null;
      };

      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:up', handleMouseUp);

      return () => {
        canvas.off('mouse:down', handleMouseDown);
        canvas.off('mouse:move', handleMouseMove);
        canvas.off('mouse:up', handleMouseUp);
      };
    }, [activeTool, color, width, height, currentTime, editable, isDrawing, fabricModule]);

    // Render existing annotations
    useEffect(() => {
      if (!fabricRef.current || !fabricModule) return;

      const canvas = fabricRef.current;
      const { Circle, Rect, Line } = fabricModule;

      // Clear and re-render
      canvas.clear();

      annotations.forEach((annotation) => {
        let shape: FabricObject | null = null;

        if (annotation.type === 'circle' && annotation.radius) {
          const radius = annotation.radius * Math.min(width, height);
          shape = new Circle({
            left: annotation.x * width - radius,
            top: annotation.y * height - radius,
            radius,
            fill: 'transparent',
            stroke: annotation.color,
            strokeWidth: 3,
            data: annotation,
          });
        } else if (annotation.type === 'rectangle' && annotation.width && annotation.height) {
          shape = new Rect({
            left: annotation.x * width,
            top: annotation.y * height,
            width: annotation.width * width,
            height: annotation.height * height,
            fill: 'transparent',
            stroke: annotation.color,
            strokeWidth: 3,
            data: annotation,
          });
        }

        if (shape) {
          canvas.add(shape);
        }
      });

      canvas.renderAll();
    }, [annotations, width, height, fabricModule]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      clearCanvas: () => {
        fabricRef.current?.clear();
      },
      exportAnnotations: () => {
        return annotations;
      },
      setTool: (tool: AnnotationType | null) => {
        // This can be used to change tools programmatically
      },
    }));

    return (
      <div className={`annotation-canvas-wrapper absolute inset-0 pointer-events-auto ${className}`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ pointerEvents: editable ? 'auto' : 'none' }}
        />
      </div>
    );
  }
);

// Toolbar component for annotation tools
export function AnnotationToolbar({
  activeTool,
  onToolChange,
  color,
  onColorChange,
  onClear,
}: {
  activeTool: AnnotationType | null;
  onToolChange: (tool: AnnotationType | null) => void;
  color: string;
  onColorChange: (color: string) => void;
  onClear: () => void;
}) {
  const tools: { type: AnnotationType; icon: string; label: string }[] = [
    { type: 'circle', icon: '⭕', label: '원' },
    { type: 'rectangle', icon: '⬜', label: '사각형' },
    { type: 'arrow', icon: '➡️', label: '화살표' },
    { type: 'freehand', icon: '✏️', label: '자유 그리기' },
  ];

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#FFFF33'];

  return (
    <div className="annotation-toolbar flex items-center gap-2 p-2 bg-gray-800 rounded-lg">
      {/* Tool buttons */}
      {tools.map((tool) => (
        <button
          key={tool.type}
          onClick={() => onToolChange(activeTool === tool.type ? null : tool.type)}
          className={`p-2 rounded ${
            activeTool === tool.type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}

      {/* Divider */}
      <div className="w-px h-6 bg-gray-600" />

      {/* Color picker */}
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => onColorChange(c)}
          className={`w-6 h-6 rounded-full border-2 ${
            color === c ? 'border-white' : 'border-transparent'
          }`}
          style={{ backgroundColor: c }}
        />
      ))}

      {/* Divider */}
      <div className="w-px h-6 bg-gray-600" />

      {/* Clear button */}
      <button
        onClick={onClear}
        className="p-2 rounded bg-red-600 text-white hover:bg-red-700"
        title="전체 삭제"
      >
        🗑️
      </button>
    </div>
  );
}

export default AnnotationCanvas;
