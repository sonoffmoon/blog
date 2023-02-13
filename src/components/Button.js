const Button = ({ type, onClick, caption }) => {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {caption}
    </button>
  );
};

export default Button;
