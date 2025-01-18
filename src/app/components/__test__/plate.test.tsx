import { render, screen, fireEvent } from "@testing-library/react";
import { Plate } from "../plate";

describe("Plateコンポーネント", () => {
    const baseProps = {
        caption: "テストプレート",
        isEnabled: true,
        onClick: jest.fn()
    };

    beforeEach(() => {
        // 各テストケース前にモック関数をリセット
        jest.clearAllMocks();
    });

    test("正しくレンダリングされること", () => {
        render(Plate(baseProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        expect(buttonElement).toBeInTheDocument();
    });

    test("キャプションが正しく表示されること", () => {
        render(Plate(baseProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        expect(buttonElement).toHaveTextContent("テストプレート");
    });

    test("有効時の正しいスタイルが適用されていること", () => {
        render(Plate(baseProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        
        expect(buttonElement).toHaveStyle({
            width: "18rem",
            height: "5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "7px",
            marginTop: "15px",
            textAlign: "center",
            backgroundColor: "#3cb371"
        });
    });

    test("無効時の正しいスタイルが適用されていること", () => {
        const mockProps = { ...baseProps, isEnabled: false };
        render(Plate(mockProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        
        expect(buttonElement).toHaveStyle({
            backgroundColor: "#808080"
        });
    });

    test("有効時にクリックするとonClickハンドラーが呼び出されること", () => {
        const mockOnClick = jest.fn();
        const mockProps = { ...baseProps, onClick: mockOnClick };
        render(Plate(mockProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        fireEvent.click(buttonElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("無効時にクリックしてもonClickハンドラーが呼び出されないこと", () => {
        const mockOnClick = jest.fn();
        const mockProps = { ...baseProps, isEnabled: false, onClick: mockOnClick };
        render(Plate(mockProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        fireEvent.click(buttonElement);
        expect(mockOnClick).not.toHaveBeenCalled();
    });

    test("button要素として描画されていること", () => {
        render(Plate(baseProps, { key: "" }));
        const buttonElement = screen.getByText(baseProps.caption);
        expect(buttonElement.tagName).toBe("BUTTON");
    });
});
