'use client';

import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { RecruitFormType } from '@/libs/schemas/projectSchema';
import { uploadPostImages } from '@/libs/api/image';
import { ProjectImage } from '@/types/project';

const MAX_IMAGE_COUNT = 2;

type ImageItem = {
  objectKey: string;
  previewUrl: string;
};

type PostImageProps = {
  initialImages?: ProjectImage[];
};

export default function PostImage({ initialImages }: PostImageProps) {
  const { setValue } = useFormContext<RecruitFormType>();
  const [images, setImages] = useState<ImageItem[]>(() =>
    (initialImages ?? []).map((img) => ({
      objectKey: img.objectKey,
      previewUrl: img.imageUrl, // 서버 URL을 previewUrl로
    })),
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const syncImageKeys = (updated: ImageItem[]) => {
    setValue(
      'imageKeys',
      updated.map((img) => img.objectKey),
      { shouldDirty: true },
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = MAX_IMAGE_COUNT - images.length;

    if (files.length > remaining) {
      alert(`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부할 수 있어요.`);
    }

    const filesToUpload = files.slice(0, remaining);
    if (!filesToUpload.length) return;

    setIsUploading(true);
    try {
      const objectKeys = await uploadPostImages(filesToUpload);
      const newItems: ImageItem[] = filesToUpload.map((file, i) => ({
        objectKey: objectKeys[i],
        previewUrl: URL.createObjectURL(file),
      }));

      const updated = [...images, ...newItems];
      setImages(updated);
      syncImageKeys(updated);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteImage = (index: number) => {
    const confirmed = window.confirm('이미지를 삭제할까요?');
    if (!confirmed) return;

    URL.revokeObjectURL(images[index].previewUrl);

    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    syncImageKeys(updated);
  };

  const canAddMore = images.length < MAX_IMAGE_COUNT;

  return (
    <div className="flex flex-col gap-3">
      {/* 이미지 없을 때: 카메라 버튼 */}
      {images.length === 0 && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-gray-400 px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          <CameraIcon />
          <span>{isUploading ? '업로드 중...' : '사진'}</span>
        </button>
      )}

      {/* 이미지 미리보기 */}
      {images.length > 0 && (
        <div className="flex gap-5">
          {images.map((img, index) => (
            <div
              key={img.objectKey}
              className="relative shrink-0 overflow-hidden rounded-xl bg-gray-100"
              style={{ width: 200, height: 200 }}
            >
              <Image
                src={img.previewUrl}
                alt={`첨부 이미지 ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 transition-colors hover:bg-black/70"
                aria-label="이미지 삭제"
              >
                <CloseIcon />
              </button>
            </div>
          ))}

          {/* 이미지 1장일 때 추가 버튼 */}
          {canAddMore && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-500 disabled:opacity-50"
              style={{ width: 200, height: 200 }}
              aria-label="이미지 추가"
            >
              {isUploading ? (
                <span className="text-sm text-gray-400">업로드 중...</span>
              ) : (
                <PlusIcon />
              )}
            </button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="1" y1="1" x2="9" y2="9" />
      <line x1="9" y1="1" x2="1" y2="9" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
