
"use client";

import { useEffect, useState } from "react";
import { projectsApi } from "@/lib/api/projects";
import { StreamUploader } from "@/components/ui/stream-uploader";
import { Loader2, Video, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarUploadPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const data = await projectsApi.getMyAssignments();
      setAssignments(data);
      if (data.length > 0) {
          setSelectedAssignmentId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async (streamUid: string) => {
    if (!selectedAssignmentId) return;

    setIsSubmitting(true);
    try {
      await projectsApi.createSubmission({
        assignmentId: selectedAssignmentId,
        streamUid: streamUid,
        notes: "Uploaded via Star Portal"
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Submission Error:", err);
      alert("영상 업로드는 성공했으나, 제출 기록 저장에 실패했습니다. 관리자에게 문의하세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-vibrant-cyan" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">영상 제출하기</h1>
          <p className="text-neutral-400">배정된 프로젝트를 선택하고 영상을 업로드하세요.</p>
        </div>

        {assignments.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
            <AlertCircle className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-neutral-500">배정된 프로젝트가 없습니다.</h3>
            <p className="text-neutral-600 mt-2">먼저 제작요청 게시판에서 프로젝트를 수락해 주세요.</p>
          </div>
        ) : submitSuccess ? (
          <div className="p-12 text-center bg-vibrant-cyan/10 border border-vibrant-cyan/20 rounded-2xl">
            <CheckCircle className="w-16 h-16 text-vibrant-cyan mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2 text-vibrant-cyan">제출 완료!</h2>
            <p className="text-neutral-300 mb-8">영상이 성공적으로 제출되었습니다. 관리자 검수 후 승인될 예정입니다.</p>
            <button
              onClick={() => { setSubmitSuccess(false); loadAssignments(); }}
              className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-vibrant-cyan transition-colors"
            >
              추가 제출하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Project Selection */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">프로젝트 선택</h3>
              <div className="space-y-2">
                {assignments.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAssignmentId(item.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      selectedAssignmentId === item.id
                        ? "bg-vibrant-cyan/10 border-vibrant-cyan text-white shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                        : "bg-neutral-900 border-white/5 text-neutral-400 hover:bg-neutral-800"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Video className={cn("w-5 h-5 mt-0.5", selectedAssignmentId === item.id ? "text-vibrant-cyan" : "text-neutral-600")} />
                      <div>
                        <p className="text-sm font-bold line-clamp-2">{item.request.title}</p>
                        <p className="text-[11px] opacity-60 mt-1">마감: {new Date(item.request.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">파일 업로드 (Cloudflare Stream)</h3>

              {selectedAssignmentId ? (
                <div className="p-6 bg-neutral-900 border border-white/5 rounded-2xl">
                    <StreamUploader
                        onSuccess={handleUploadSuccess}
                        onError={(err) => console.error("Upload Error:", err)}
                    />
                    <div className="mt-6 p-4 bg-black/50 rounded-lg border border-white/5">
                        <h4 className="text-xs font-bold text-neutral-400 mb-2">업로드 가이드</h4>
                        <ul className="text-xs text-neutral-500 space-y-1 list-disc pl-4">
                            <li>최대 파일 용량: 5GB (TUS 분할 업로드 지원)</li>
                            <li>권장 해상도: 1080p (1920x1080)</li>
                            <li>권장 포맷: MP4 (H.264), MOV</li>
                            <li>업로드 중 창을 닫지 마세요.</li>
                        </ul>
                    </div>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-neutral-900/50">
                    <p className="text-neutral-500 italic">프로젝트를 먼저 선택해 주세요.</p>
                </div>
              )}

              {isSubmitting && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-vibrant-cyan mx-auto mb-4" />
                        <p className="text-xl font-bold">제출 처리 중...</p>
                        <p className="text-neutral-400 mt-2">잠시만 기다려주세요.</p>
                    </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
