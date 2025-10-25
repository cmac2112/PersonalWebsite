import React from 'react'
import "./Button.css"
import MaterialIcon from '../MaterialIcon/MaterialIcon';
interface ButtonProps{
    label: string;
    OnClickCallback: () => void;
    disabled?: boolean;
    className?: string;
    variant?: string;
    materialIcon?: string;
    iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
    label,
    OnClickCallback,
    disabled = false,
    variant = 'primary',
    className = '',
    materialIcon,
    iconPosition = 'left',
}) => {

    const baseClasses = 'button-component';
    const variantClass = `button--${variant}`;
    const disabledClass = disabled ? 'button--disabled' : '';
    const combinedClasses = `${baseClasses} ${variantClass} ${disabledClass} ${className}`.trim();


    
  // Content rendering with proper icon positioning
    const renderContent = () => {
        if (!materialIcon) {
            return <span className="button__label">{label}</span>;
        }

        const icon = <MaterialIcon name={materialIcon} />;
        const text = <span className="button__label">{label}</span>;

        return iconPosition === 'left' ? (
            <>
                {icon}
                {text}
            </>
        ) : (
            <>
                {text}
                {icon}
            </>
        );
    };

    return (
        <button
            className={combinedClasses}
            onClick={OnClickCallback}
            disabled={disabled}
            type="button"
            aria-label={materialIcon ? `${label} with ${materialIcon} icon` : label}
        >
            {renderContent()}
        </button>
    );
}

export default Button
