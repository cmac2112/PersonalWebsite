interface MaterialIconProps {
  name: string;
  className?: string;
}

const MaterialIcon = ({ name, className = "" }: MaterialIconProps) => (
  <span
    className={`material-symbols-outlined select-none ${className}`.trim()}
    aria-hidden="true"
  >
    {name}
  </span>
);

export default MaterialIcon;
