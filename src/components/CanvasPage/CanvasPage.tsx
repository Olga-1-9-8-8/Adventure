import React, { useEffect, useRef, useState } from 'react';
import styles from './CanvasPage.module.css';

export const CanvasPage: React.FC = () => {
  const [isDrowind, setIsDrowing] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [saveData, setSaveData] = useState('');

  const ref = useRef<HTMLCanvasElement>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }
    canvasCtxRef.current = canvas.getContext('2d');
    const ctx = canvasCtxRef.current;
    if (!ctx) {
      return;
    }
    ctx.fillStyle = "steelblue";
  }, []);

  const onMouseDown = ({ nativeEvent }: any) => {
    setIsDrowing(true);
    canvasCtxRef.current!.beginPath();
    const { offsetX, offsetY } = nativeEvent;
    setStartX(offsetX);
    setStartY(offsetY);
    setSaveData(ref.current!.toDataURL())
  }

  const onMouseMove = ({ nativeEvent }: any) => {
    if (!isDrowind) return;
    const { offsetX, offsetY } = nativeEvent;
    let currentStartX = offsetX;
    let currentStartY = offsetY;
    let width = currentStartX - startX;
    let height = currentStartY - startY;
    paintRectangles(startX, startY, width, height)
  }

  const onMouseUp = () => {
    setIsDrowing(false);
    canvasCtxRef.current!.closePath();
  }

  const paintRectangles = (x: any, y: any, width: any, height: any) => {
    const img = new Image();
    img.src = saveData;
    img.onload = () => {
      canvasCtxRef.current!.clearRect(0, 0, ref.current!.width, ref.current!.height);
      canvasCtxRef.current!.drawImage(img, 0, 0, ref.current!.width, ref.current!.height)
      canvasCtxRef.current!.beginPath()
      canvasCtxRef.current!.fillRect(x, y, width, height)
    }
  }

  return (
    <div className={styles.canvasWrapper}>
      <canvas
        ref={ref}
        className={styles.canvas}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={(e) => onMouseMove(e)}
        onMouseUp={() => onMouseUp()}
        onMouseDown={(e) => onMouseDown(e)}>
      </canvas>
    </div>
  );
};
