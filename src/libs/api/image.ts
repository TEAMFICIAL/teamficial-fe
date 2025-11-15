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
