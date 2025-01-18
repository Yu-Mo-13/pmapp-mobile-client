import { render, screen } from "@testing-library/react";
import { ReadonlyTextbox } from "../readonly";

describe("ReadonlyTextboxコンポーネント", () => {
    const mockProps = {
        type: "text",
        id: "test-input",
        placeholder: "テスト用プレースホルダー",
        val: "テスト値",
        onChange: jest.fn()
    };

    test("正しくレンダリングされること", () => {
        render(<ReadonlyTextbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    test("読み取り専用属性が設定されていること", () => {
        render(<ReadonlyTextbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toHaveAttribute("readonly");
    });

    test("入力値が正しく表示されること", () => {
        render(<ReadonlyTextbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toHaveValue(mockProps.val);
    });

    test("正しいスタイルが適用されていること", () => {
        render(<ReadonlyTextbox {...mockProps} />);
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
        render(<ReadonlyTextbox {...mockProps} />);
        const inputElement = screen.getByPlaceholderText(mockProps.placeholder);
        expect(inputElement).toHaveAttribute("autocomplete", "off");
    });
});
