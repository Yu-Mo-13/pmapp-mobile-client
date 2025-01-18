import { render, screen, fireEvent } from "@testing-library/react";
import { LargeButton } from "../large";

describe("LargeButtonコンポーネント", () => {
    test("正しいキャプションでレンダリングされること", () => {
        render(<LargeButton caption="Click Me" onClick={() => {}} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeInTheDocument();
    });

    test("isEnabledがtrueの場合、ボタンが有効になっていること", () => {
        render(<LargeButton caption="Click Me" onClick={() => {}} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeEnabled();
    });

    test("isEnabledがfalseの場合、ボタンが無効になっていること", () => {
        render(<LargeButton caption="Click Me" onClick={() => {}} isEnabled={false} />);
        const buttonElement = screen.getByText("Click Me");
        expect(buttonElement).toBeDisabled();
    });

    test("有効時の正しいスタイルが適用されていること", () => {
        render(<LargeButton caption="Click Me" onClick={() => {}} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        
        expect(buttonElement).toHaveStyle({
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
            backgroundColor: "#3cb371"
        });
    });

    test("無効時の正しいスタイルが適用されていること", () => {
        render(<LargeButton caption="Click Me" onClick={() => {}} isEnabled={false} />);
        const buttonElement = screen.getByText("Click Me");
        
        expect(buttonElement).toHaveStyle({
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
            backgroundColor: "#808080"
        });
    });

    test("有効時にクリックするとonClickハンドラーが呼び出されること", () => {
        const handleClick = jest.fn();
        render(<LargeButton caption="Click Me" onClick={handleClick} isEnabled={true} />);
        const buttonElement = screen.getByText("Click Me");
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("無効時にクリックしてもonClickハンドラーが呼び出されないこと", () => {
        const handleClick = jest.fn();
        render(<LargeButton caption="Click Me" onClick={handleClick} isEnabled={false} />);
        const buttonElement = screen.getByText("Click Me");
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });
});
