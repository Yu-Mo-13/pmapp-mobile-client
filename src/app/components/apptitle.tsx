import * as CSS from "csstype";
import { AppTitleProps } from "@/app/types/apptitle";

export const AppTitle = (props: AppTitleProps) => {
  const { caption } = props;

  const captionStyle: CSS.Properties = {
    width: "100%",
    height: "4rem",
    fontSize: "1.4rem",
    textAlign: "center",
  };

  const captionText = caption;

  return <p style={captionStyle}>{captionText}</p>;
};