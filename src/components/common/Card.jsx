const Card = ({ className = "", as: Tag = "article", children, ...rest }) => {
  return (
    <Tag className={`panel ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

export default Card;
