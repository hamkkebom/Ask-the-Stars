'use client';

import * as React from 'react';
import { Canvas as FabricCanvas, Circle, Rect, Line, Path, Point } from 'fabric';

export type AnnotationType = 'point' | 'circle' | 'rect' | 'arrow' | 'freehand';

export interface Annotation {
  type: AnnotationType;
  coordinates: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    points?: { x: number; y: number }[];
  };
  normalized: {
    x: number;
    y: number;
  };
  style: {
    color: string;
    strokeWidth: number;
  };
}

export interface AnnotationCanvasProps {
  width: number;
  height: number;
  tool: AnnotationType;
  color?: string;
  strokeWidth?: number;
  onAnnotationAdd?: (annotation: Annotation) => void;
  className?: string;
}

export const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({
  width,
  height,
  tool,
  color = '#ff0000',
  strokeWidth = 2,
  onAnnotationAdd,
  className,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fabricRef = React.useRef<FabricCanvas | null>(null);

  React.useEffect(() => {
    if (canvasRef.current && !fabricRef.current) {
      fabricRef.current = new FabricCanvas(canvasRef.current, {
        selection: false,
        isDrawingMode: tool === 'freehand',
      });
    }

    return () => {
      fabricRef.current?.dispose();
      fabricRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.isDrawingMode = tool === 'freehand';
      if (fabricRef.current.freeDrawingBrush) {
        fabricRef.current.freeDrawingBrush.color = color;
        fabricRef.current.freeDrawingBrush.width = strokeWidth;
      }
    }
  }, [tool, color, strokeWidth]);

  React.useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: { e: MouseEvent; pointer?: Point }) => {
      if (tool === 'freehand' || !e.pointer) return;

      const pointer = e.pointer;
      let shape;

      switch (tool) {
        case 'point':
          shape = new Circle({
            left: pointer.x - 5,
            top: pointer.y - 5,
            radius: 5,
            fill: color,
            selectable: false,
          });
          break;
        case 'circle':
          shape = new Circle({
            left: pointer.x - 25,
            top: pointer.y - 25,
            radius: 25,
            fill: 'transparent',
            stroke: color,
            strokeWidth,
            selectable: false,
          });
          break;
        case 'rect':
          shape = new Rect({
            left: pointer.x - 30,
            top: pointer.y - 20,
            width: 60,
            height: 40,
            fill: 'transparent',
            stroke: color,
            strokeWidth,
            selectable: false,
          });
          break;
        case 'arrow':
          shape = new Line([pointer.x, pointer.y, pointer.x + 50, pointer.y], {
            stroke: color,
            strokeWidth,
            selectable: false,
          });
          break;
      }

      if (shape) {
        canvas.add(shape);
        canvas.renderAll();

        const annotation: Annotation = {
          type: tool,
          coordinates: {
            x: pointer.x,
            y: pointer.y,
          },
          normalized: {
            x: pointer.x / width,
            y: pointer.y / height,
          },
          style: {
            color,
            strokeWidth,
          },
        };

        onAnnotationAdd?.(annotation);
      }
    };

    canvas.on('mouse:down', handleMouseDown);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
    };
  }, [tool, color, strokeWidth, width, height, onAnnotationAdd]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
};
