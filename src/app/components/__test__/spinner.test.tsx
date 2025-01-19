import React from "react";
import { render } from "@testing-library/react";
import { Spinner } from '../spinner';

describe("Spinnerコンポーネント", () => {
  it("正しくレンダリングされていること", () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild;
    expect(spinner).toBeInTheDocument();
  });

  it("2つのbouncing divsを含むこと", () => {
    const { container } = render(<Spinner />);
    const bouncingDivs = container.querySelectorAll(".doubleBounce1, .doubleBounce2");
    expect(bouncingDivs.length).toBe(2);
  });

  // it("スタイルが正しく適用されていること", () => {
  //   const { container } = render(<Spinner />);
  //   const spinner = container.firstChild;
  //   expect(spinner).toHaveStyle({
  //     width: "40px",
  //     height: "40px",
  //     position: "relative",
  //     margin: "100px auto",
  //   });

  //   const doubleBounce1 = container.querySelector(".doubleBounce1");
  //   const doubleBounce2 = container.querySelector(".doubleBounce2");

  //   expect(doubleBounce1).toHaveStyle({
  //     width: "100%",
  //     height: "100%",
  //     borderRadius: "50%",
  //     backgroundColor: "#333",
  //     opacity: "0.6",
  //     position: "absolute",
  //     top: "0",
  //     left: "0",
  //     animation: "bounce 2.0s infinite ease-in-out",
  //   });

  //   expect(doubleBounce2).toHaveStyle({
  //     animationDelay: "-1.0s",
  //   });
  // });
});