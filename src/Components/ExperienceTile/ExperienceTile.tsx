import React, { useState, useRef, useEffect } from 'react';
import './ExperienceTile.css';

interface ExperienceTileProps {
    title: string;
    subtitle?: string;
    technologies?: string[];
    children: React.ReactNode;
    className?: string;
}

const ExperienceTile: React.FC<ExperienceTileProps> = ({ 
    title, 
    subtitle, 
    technologies = [], 
    children, 
    className = '' 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const tileRef = useRef<HTMLDivElement>(null);
    const [tilePosition, setTilePosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

    // Capture tile position before expanding
    const handleTileClick = () => {
        if (tileRef.current && !isExpanded) {
            const rect = tileRef.current.getBoundingClientRect();
            setTilePosition({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
            setIsAnimating(true);
            setIsExpanded(true);
        }
    };

    const handleClose = () => {
        setIsAnimating(true);
        setIsExpanded(false);
    };

    // Handle animation end
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Match CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isExpanded]);

    return (
        <>
            {/* Main Tile */}
            <div 
                ref={tileRef}
                className={`experience-tile ${className} ${isExpanded ? 'tile-expanded' : ''}`}
                onClick={handleTileClick}
                style={{
                    '--tile-top': `${tilePosition.top}px`,
                    '--tile-left': `${tilePosition.left}px`,
                    '--tile-width': `${tilePosition.width}px`,
                    '--tile-height': `${tilePosition.height}px`,
                } as React.CSSProperties}
            >
                <div className="tile-header">
                    <h3 className="tile-title">{title}</h3>
                    {subtitle && <p className="tile-subtitle">{subtitle}</p>}
                </div>
                
                <div className="tile-preview">
                    {children}
                </div>

                {technologies.length > 0 && (
                    <div className="tile-tech-preview">
                        {technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className="tech-badge-preview">
                                {tech}
                            </span>
                        ))}
                        {technologies.length > 3 && (
                            <span className="tech-more">+{technologies.length - 3}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Backdrop Blur */}
            {isExpanded && (
                <div 
                    className={`experience-backdrop ${isAnimating ? 'backdrop-animating' : ''}`}
                    onClick={handleClose}
                />
            )}

            {/* Full-Screen Modal */}
            {isExpanded && (
                <div 
                    className={`experience-modal ${isAnimating ? 'modal-animating' : ''}`}
                    style={{
                        '--tile-top': `${tilePosition.top}px`,
                        '--tile-left': `${tilePosition.left}px`,
                        '--tile-width': `${tilePosition.width}px`,
                        '--tile-height': `${tilePosition.height}px`,
                    } as React.CSSProperties}
                >
                    <div className="modal-header">
                        <div>
                            <h2 className="modal-title">{title}</h2>
                            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
                        </div>
                        <button 
                            className="modal-close"
                            onClick={handleClose}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>

                    <div className="modal-content">
                        <div className="modal-body">
                            {children}
                        </div>

                        {technologies.length > 0 && (
                            <div className="modal-technologies">
                                <h4>Technologies Used</h4>
                                <div className="tech-grid">
                                    {technologies.map((tech, index) => (
                                        <div key={index} className="tech-badge">
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ExperienceTile;
