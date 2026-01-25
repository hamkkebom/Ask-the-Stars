"use client";

import { useState, useRef, ChangeEvent } from "react";
// @ts-ignore - types might be missing
import * as tus from "tus-js-client";
import { Upload } from "lucide-react";

interface StreamUploaderProps {
  onSuccess?: (streamUid: string) => void;
  onError?: (error: Error) => void;
  userId?: string; // Optional user context
}

export function StreamUploader({ onSuccess, onError, userId }: StreamUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const uploadRef = useRef<tus.Upload | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProgress(0);
    }
  };

  const startUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Get Direct Upload URL from our Backend
      // This ensures we don't expose Cloudflare Tokens to the client directly
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/videos/upload-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header here if needed
        },
        body: JSON.stringify({
          uploadLength: file.size,
          metadata: {
            filename: file.name,
            filetype: file.type,
            // userId is handled by backend token generation usually, but can be passed
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl } = await response.json();

      // 2. Start TUS Upload
      const upload = new tus.Upload(file, {
        endpoint: uploadUrl, // Use the specific upload URL as endpoint?
        // Cloudflare Direct Upload v2 returns a unique uploadUrl which IS the endpoint for this file.
        // Usually TUS client expects 'endpoint' to be the creation URL, OR 'uploadUrl' for resuming.
        // For Direct Uploads, we essentially "resume" or "upload to" the specific URL provided.
        // Wait, Cloudflare docs say: "Use the uploadURL as the destination".
        // TUS client `uploadUrl` option is for resuming.
        // We probably need to set `uploadUrl: uploadUrl` and *not* `endpoint` if the session is already created?
        // Actually, if we use `uploadUrl` property, tus-js-client treats it as an existing upload.

        uploadUrl: uploadUrl,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        onError: (error: any) => {
          console.error("Upload Failed:", error);
          setIsUploading(false);
          if (onError) onError(error);
        },
        onProgress: (bytesUploaded: number, bytesTotal: number) => {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setProgress(parseFloat(percentage));
        },
        onSuccess: () => {
          console.log("Upload Finished:", upload.url);
          setIsUploading(false);
          setIsProcessing(true);

          // Extract Stream UID from the upload URL
          // URL format: https://upload.videodelivery.net/tus/{UID}?sig=...
          // or just generic TUS. The SDK url property has the location.
          const parts = upload.url?.split('/') || [];
          // Usually UID is the last part before query params
          const uidPart = parts[parts.length - 1]; // might contain ?sig=
          const uid = uidPart?.split('?')[0];

          if (uid && onSuccess) {
             onSuccess(uid);
          } else {
             // Fallback or wait for webhook?
             // Usually the client gets the UID immediately.
             if (onSuccess) onSuccess("PENDING_WEBHOOK");
          }
        },
      });

      uploadRef.current = upload;
      upload.start();

    } catch (error: any) {
      console.error("Setup Failed:", error);
      setIsUploading(false);
      if (onError) onError(error);
    }
  };

  const cancelUpload = () => {
      if(uploadRef.current) {
          uploadRef.current.abort();
          setIsUploading(false);
      }
  };

  return (
    <div className="w-full max-w-md p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer hover:bg-neutral-800 hover:border-neutral-500 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-neutral-400" />
                <p className="text-sm text-neutral-400">Click to upload video</p>
                <p className="text-xs text-neutral-500">(MP4, MOV, MKV)</p>
            </div>
            <input type="file" className="hidden" accept="video/*" onChange={handleFileChange} disabled={isUploading} />
        </label>

        {file && (
            <div className="text-sm text-white truncate">
                Validating: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </div>
        )}

        {isUploading && (
            <div className="w-full bg-neutral-700 rounded-full h-2.5">
                <div className="bg-vibrant-cyan h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                <p className="text-right text-xs text-neutral-400 mt-1">{progress}%</p>
            </div>
        )}

        <div className="flex gap-2">
            <button
                onClick={startUpload}
                disabled={!file || isUploading || isProcessing}
                className="flex-1 px-4 py-2 bg-vibrant-cyan text-black font-bold rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isProcessing ? "Processing..." : isUploading ? "Uploading..." : "Start Upload"}
            </button>
            {isUploading && (
                <button
                    onClick={cancelUpload}
                    className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30"
                >
                    Cancel
                </button>
            )}
        </div>
      </div>
    </div>
  );
}
