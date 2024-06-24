import { ReactElement, ReactNode, SVGProps } from 'react';

interface SendIconProps extends SVGProps<SVGSVGElement> {
  children?: ReactNode;
}

export default function SendIcon(props: SendIconProps): ReactElement {
  const { className, ...rest } = props;

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...rest}
    >
      <path
        d='M22 2L15 22L11 13M22 2L2 9L11 13M22 2L11 13'
        stroke='#4EA8B4'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
