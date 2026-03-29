import axios from 'axios';
import api from './api';
import { CommonResponse } from '@/types/common';
import { PresignedUrlResponse } from '@/types/image';

export const uploadToS3 = async (presignedUrl: string, file: File): Promise<boolean> => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return false;
  }
};

export async function getPresignedUrl(imageName: string): Promise<PresignedUrlResponse> {
  try {
    const { data } = await api.post<CommonResponse<PresignedUrlResponse>>(
      `/preSigned-url?imageName=${encodeURIComponent(imageName)}`,
    );

    if (!data.isSuccess) {
      throw new Error(data.message || 'Failed to get presigned URL');
    }

    return data.result;
  } catch (error) {
    console.error('getPresignedUrl Error:', error);
    throw error;
  }
}

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const { preSignedUrl, objectKey } = await getPresignedUrl(file.name);

    const success = await uploadToS3(preSignedUrl, file);

    if (!success) {
      throw new Error('S3 upload failed');
    }

    return objectKey;
  } catch (error) {
    console.error('uploadImage Error:', error);
    return null;
  }
};

// 게시글 이미지용 presigned URL 여러 장 한번에 발급
export async function getPostImagePresignedUrls(
  fileNames: string[],
): Promise<PresignedUrlResponse[]> {
  try {
    const params = new URLSearchParams();
    fileNames.forEach((name) => params.append('fileNames', name));

    const { data } = await api.post<CommonResponse<PresignedUrlResponse[]>>(
      `/post-images/presigned-url?${params.toString()}`,
    );

    if (!data.isSuccess) {
      throw new Error(data.message || 'Failed to get post image presigned URLs');
    }

    return data.result;
  } catch (error) {
    console.error('getPostImagePresignedUrls Error:', error);
    throw error;
  }
}

// 게시글 이미지 여러 장 S3 업로드 → objectKey[] 반환
export async function uploadPostImages(files: File[]): Promise<string[]> {
  const presignedList = await getPostImagePresignedUrls(files.map((f) => f.name));

  if (presignedList.length !== files.length) {
    throw new Error(
      `Presigned URL count mismatch: expected ${files.length}, got ${presignedList.length}`,
    );
  }

  const results = await Promise.all(
    files.map(async (file, i) => {
      const target = presignedList[i];
      const success = await uploadToS3(target.preSignedUrl, file);
      if (!success) throw new Error(`S3 upload failed: ${file.name}`);
      return target.objectKey;
    }),
  );

  return results;
}
