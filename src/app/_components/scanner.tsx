"use client";

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, Loader2, Layers, Check, X, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { CardResult } from "./card-result";

interface ScannerProps {
  onIdentify: (data: any) => void;
}

export function Scanner({ onIdentify }: ScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [batchQueue, setBatchQueue] = useState<string[]>([]);
  const [processingBatch, setProcessingBatch] = useState(false);
  const [processedCards, setProcessedCards] = useState<any[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const identifyMutation = api.card.identify.useMutation();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      if (batchMode) {
        // Add to queue with visual feedback
        setBatchQueue((prev) => [...prev, imageSrc]);
        // Small vibration feedback if supported
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        setIsScanning(true);
        identifyMutation.mutate(
          { image: imageSrc },
          {
            onSuccess: (data) => {
              setIsScanning(false);
              onIdentify(data);
            },
            onError: (error) => {
              setIsScanning(false);
              console.error("Error identifying card:", error);
              alert("Failed to identify card. Please try again.");
            },
          }
        );
      }
    }
  }, [webcamRef, identifyMutation, batchMode, onIdentify]);

  const processBatch = async () => {
    if (batchQueue.length === 0) return;
    setProcessingBatch(true);

    const results = [];
    for (const image of batchQueue) {
      try {
        const result = await identifyMutation.mutateAsync({ image });
        results.push(result);
      } catch (e) {
        console.error("Failed to identify one card in batch", e);
      }
    }

    setProcessedCards(results);
    setBatchQueue([]);
    setProcessingBatch(false);
  };

  const videoConstraints = {
    facingMode: "environment",
  };

  // Render Batch Review Mode
  if (processedCards.length > 0) {
    const currentCard = processedCards[currentReviewIndex];

    const handleNext = () => {
      if (currentReviewIndex < processedCards.length - 1) {
        setCurrentReviewIndex((prev) => prev + 1);
      } else {
        // Done reviewing
        setProcessedCards([]);
        setCurrentReviewIndex(0);
        onIdentify(null); // Close scanner or refresh
      }
    };

    const handleSaveAndNext = () => {
        // In a real app, we would save here. For now, we reuse the CardResult logic
        // or we need a way to save from here.
        // Let's just show the CardResult one by one for now using the existing component pattern
        // but injected here.
        // Actually, simpler: Just let the user review and "Save" -> Next.
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
        <CardResult
           result={currentCard}
           onSave={handleNext} // For batch, "Save" just moves to next for now (needs refactor to actually save)
           onCancel={() => {
             // Skip this card
             handleNext();
           }}
        />
        <div className="absolute top-4 left-0 right-0 text-center text-white z-[60] pointer-events-none">
             Reviewing {currentReviewIndex + 1} / {processedCards.length}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-black h-[calc(100vh-200px)]">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="h-full w-full object-cover"
      />

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 p-2 rounded-full backdrop-blur-sm z-10">
        <Label htmlFor="batch-mode" className="text-white text-xs font-medium cursor-pointer">Batch</Label>
        <Switch
            id="batch-mode"
            checked={batchMode}
            onCheckedChange={setBatchMode}
        />
      </div>

      {/* Batch Counter */}
      {batchMode && batchQueue.length > 0 && (
          <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                  <Layers className="w-4 h-4 mr-2" />
                  {batchQueue.length}
              </Badge>
          </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 items-center">
        {batchMode && batchQueue.length > 0 ? (
             <Button
                onClick={processBatch}
                disabled={processingBatch}
                variant="secondary"
                className="rounded-full px-6"
             >
                {processingBatch ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        Process {batchQueue.length} Cards
                    </>
                )}
             </Button>
        ) : null}

        <Button
          onClick={capture}
          disabled={isScanning || processingBatch}
          size="lg"
          className="h-20 w-20 rounded-full border-4 border-white bg-red-500 hover:bg-red-600 disabled:opacity-50 shadow-lg"
        >
          {isScanning ? (
            <Loader2 className="h-10 w-10 animate-spin text-white" />
          ) : (
            <Camera className="h-10 w-10 text-white" />
          )}
        </Button>

        {batchMode && batchQueue.length > 0 && (
            <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={() => setBatchQueue([])}
            >
                <Trash2 className="w-6 h-6" />
            </Button>
        )}
      </div>

      {isScanning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center text-white">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin" />
            <p className="text-lg font-semibold">Identifying Card...</p>
          </div>
        </div>
      )}
    </div>
  );
}
