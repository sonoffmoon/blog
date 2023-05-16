import "../styles/Button.css";

const Button = ({ className, type, onClick, caption }) => {
  if (!className) {
    className = "btn";
  } else {
    className = "btn " + className;
  }
  return (
    <button className={className} type={type} onClick={onClick}>
      {caption}
    </button>
  );
};

export default Button;
