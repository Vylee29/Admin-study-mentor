import { Skeleton } from 'antd';

type CustomSkeletonParagraphProps = {
  isAvatar?: boolean;
  className?: string;
  height?: number;
  gap?: number;
  rows?: number;
  sizeAvatar?: number;
};

export default function CustomSkeletonParagraph({
  isAvatar,
  className,
  gap = 4,
  rows = 1,
  height = 120,
  sizeAvatar = 20,
}: CustomSkeletonParagraphProps) {
  return (
    <Skeleton
      active
      title={{
        style: { display: 'none' },
      }}
      paragraph={{
        rows: rows,
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: `${gap}px`,
          height: `${height}px`,
        },
      }}
      className={`rounded-md  w-full flex items-center ${className}`}
      avatar={
        isAvatar
          ? {
              shape: 'circle',
              style: {
                width: `${sizeAvatar}px`,
                height: `${sizeAvatar}px`,
                alignSelf: 'center',
              },
            }
          : undefined
      }
    />
  );
}
