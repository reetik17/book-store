import React from "react";
import "./styles/Button.scss";
const Button = (props) => {
  const { text, backgroundColor, textColor, onClick, type = null } = props;
  const buttonStyle = {
    backgroundColor: backgroundColor || "#007bff",
    color: textColor || "white",
  };

  return (
    <button
      className="customButton"
      style={buttonStyle}
      onClick={onClick}
      type={type ? type : ""}
    >
      {text}
    </button>
  );
};

export default Button;
