'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPresignedUrl, uploadToS3 } from '@/libs/api/image';
import { updateProfileImage } from '@/libs/api/profile';

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profileId, file }: { profileId: number; file: File }) => {
      const { preSignedUrl, objectKey } = await getPresignedUrl(file.name);

      const success = await uploadToS3(preSignedUrl, file);
      if (!success) throw new Error('Failed to upload to S3');

      await updateProfileImage(profileId, objectKey);

      return objectKey;
    },

    onSuccess: (_, { profileId }) => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profileId],
      });
    },
  });
};
