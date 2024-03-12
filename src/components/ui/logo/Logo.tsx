import clsx from 'clsx';
import LogoIcon from '../../../assets/icons/logo';

function Logo({
  size,
  title,
  className,
  onClick,
}: {
  size?: string;
  title: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <div className={`flex h-full items-center cursor-pointer ${className}`} onClick={onClick}>
      <LogoIcon
        className={clsx({
          'h-[32px] w-[34px]': !size,
          'h-[10px] w-[10px]': size === 'sm',
          'mr-3': true,
        })}
      />
      <div className={`text-2xl font-bold text-[#5BB9E2]`}>{title}</div>
    </div>
  );
}

export default Logo;
