const Badge = ({ className = "", children }) => {
  return <span className={`pill ${className}`.trim()}>{children}</span>;
};

export default Badge;
