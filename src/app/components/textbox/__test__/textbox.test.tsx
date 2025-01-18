import { render, screen, fireEvent } from "@testing-library/react";
import { Textbox } from "../textbox";

describe("Textboxコンポーネント", () => {
    const mockProps = {
        type: "text",
        id: "test-input",
        placeholder: "テスト用プレースホルダー",
        val: "テスト値",
        onChange: jest.fn()
    };

    test("正しくレンダリングされること", () => {
        render(<Textbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    test("入力値が正しく表示されること", () => {
        render(<Textbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toHaveValue(mockProps.val);
    });

    test("入力時にonChangeハンドラーが呼び出されること", () => {
        render(<Textbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        
        fireEvent.change(inputElement, { target: { value: "新しい値" } });
        expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });

    test("正しいスタイルが適用されていること", () => {
        render(<Textbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        
        expect(inputElement).toHaveStyle({
            width: "99%",
            height: "50px",
            fontSize: "20px",
            marginBottom: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
        });
    });

    test("autoComplete属性がoffに設定されていること", () => {
        render(<Textbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toHaveAttribute("autocomplete", "off");
    });

    test("読み取り専用属性が設定されていないこと", () => {
        render(<Textbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).not.toHaveAttribute("readonly");
    });
});
