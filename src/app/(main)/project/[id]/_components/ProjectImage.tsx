import { ResponseProject } from '@/types/project';
import Image from 'next/image';

const ProjectImage = ({ images }: ResponseProject) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {images?.map((img, index) => (
        <Image
          key={img.objectKey}
          src={img.imageUrl}
          alt={`Project Image ${index + 1}`}
          className="h-auto rounded-lg"
          width={500}
          height={300}
        />
      ))}
    </div>
  );
};

export default ProjectImage;
