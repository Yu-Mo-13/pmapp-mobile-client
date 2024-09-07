import * as CSS from "csstype";
import { ButtonProps } from "@/app/types/button";

export const LargeButton = (props: ButtonProps) => {
  const { caption, onClick, isEnabled } = props;

  const buttonStyle: CSS.Properties = {
    width: "7rem",
    height: "3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    marginTop: "10px",
    marginBottom: "20px",
    marginLeft: "30px",
    marginRight: "30px",
    textAlign: "center",
    backgroundColor: isEnabled ? "#3cb371" : "#808080",
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={!isEnabled}>
      {caption}
    </button>
  );
};