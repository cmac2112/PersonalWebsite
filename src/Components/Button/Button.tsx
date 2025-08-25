import React from 'react'
import "./Button.css"

interface ButtonProps{
    Label: string;
    OnClickCallback: () => void;
    disabled?: boolean;
    className?: string;
    variant?: string;
}

const Button: React.FC<ButtonProps> = ({
    Label,
    OnClickCallback,
    disabled = false,
    variant = 'primary',
    className = ''
}) => {

    const baseClasses = 'button-component';
    const variantClass = `button--${variant}`;
    const disabledClass = disabled ? 'button--disabled' : '';
    const combinedClasses = `${baseClasses} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button
    className={combinedClasses}
    onClick={OnClickCallback}
    disabled={disabled}
    type="button"
    >
        
        {Label}
    </button>
  )
}

export default Button
