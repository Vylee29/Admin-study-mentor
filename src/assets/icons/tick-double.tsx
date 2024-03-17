import { ReactElement, ReactNode, SVGProps } from 'react';

interface TickDoubleProps extends SVGProps<SVGSVGElement> {
  children?: ReactNode;
}

export default function TickDoubleIcon(props: TickDoubleProps): ReactElement {
  const { className, color, ...rest } = props;

  return (
    <svg width='23' height='14' viewBox='0 0 23 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.98438 8.23438L11.8906 12.1406L21.2656 1.98438M1.73438 8.23438L5.64062 12.1406L1.73438 8.23438ZM11.1094 5.89062L15.0156 1.98438L11.1094 5.89062Z'
        stroke={color}
        strokeWidth='2.8125'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
