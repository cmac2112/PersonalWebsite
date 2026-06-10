import React from 'react'
import MaterialIcon from '../MaterialIcon/MaterialIcon';

interface ButtonProps {
  label: string;
  OnClickCallback: () => void;
  disabled?: boolean;
  className?: string;
  materialIcon?: string;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  label,
  OnClickCallback,
  disabled = false,
  className = '',
  materialIcon,
  iconPosition = 'left',
}) => {
  const icon = materialIcon && (
    <MaterialIcon
      name={materialIcon}
      className="text-[1.2em] leading-none transition-colors duration-300 group-hover:text-[#1c1c1c]"
    />
  );

  return (
    <button
      type="button"
      onClick={OnClickCallback}
      disabled={disabled}
      aria-label={materialIcon ? `${label} with ${materialIcon} icon` : label}
      className={`
        group relative isolate w-full overflow-hidden
        flex items-center justify-center gap-2.5
        min-w-[9rem] sm:min-w-[10rem] lg:min-w-[11rem]
        rounded-2xl border border-white/5
        bg-[#1c1c1c] px-5 py-3 sm:px-6 sm:py-3.5
        text-[0.8125rem] font-medium tracking-wide text-white/90 sm:text-sm lg:text-[0.9375rem]
        cursor-pointer select-none
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,207,13,0.25)]
        active:translate-y-0 active:shadow-[0_4px_14px_rgba(255,207,13,0.35)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcf0d]
        disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none
        motion-reduce:transition-none motion-reduce:hover:translate-y-0
        before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-[5px] before:rounded-l-2xl before:bg-[#ffcf0d] before:content-['']
        after:absolute after:inset-y-0 after:left-[5px] after:-z-10 after:w-0 after:rounded-r-2xl after:bg-[#ffcf0d] after:content-['']
        after:transition-[width] after:duration-300 after:ease-out
        hover:after:w-[calc(100%-5px)] active:after:w-[calc(100%-5px)]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {iconPosition === 'left' && icon}
      <span className="relative transition-colors duration-300 group-hover:text-[#1c1c1c]">{label}</span>
      {iconPosition === 'right' && icon}
    </button>
  );
}

export default Button
