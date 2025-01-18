import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { SmallButton } from "../small";

describe("SmallButtonコンポーネント", () => {
    test("正しいキャプションでレンダリングされること", () => {
        render(<SmallButton caption="Click Me" onClick={() => {}} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
    });

    test("isEnabledがtrueの場合、ボタンが有効になっていること", () => {
        render(<SmallButton caption="Click Me" onClick={() => {}} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeEnabled();
    });

    test("isEnabledがfalseの場合、ボタンが無効になっていること", () => {
        render(<SmallButton caption="Click Me" onClick={() => {}} isEnabled={false} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeDisabled();
    });

    test("有効時の正しいスタイルが適用されていること", () => {
        render(<SmallButton caption="Click Me" onClick={() => {}} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toHaveStyle("background-color: #3cb371");
    });

    test("無効時の正しいスタイルが適用されていること", () => {
        render(<SmallButton caption="Click Me" onClick={() => {}} isEnabled={false} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toHaveStyle("background-color: #808080");
    });

    test("有効時にクリックするとonClickハンドラーが呼び出されること", () => {
        const handleClick = jest.fn();
        render(<SmallButton caption="Click Me" onClick={handleClick} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("無効時にクリックしてもonClickハンドラーが呼び出されないこと", () => {
        const handleClick = jest.fn();
        render(<SmallButton caption="Click Me" onClick={handleClick} isEnabled={false} />);
        const buttonElement = screen.getByText("Click Me");
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });
});