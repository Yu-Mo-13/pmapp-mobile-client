import { render, screen } from "@testing-library/react";
import { Caption } from "../caption";

describe("Captionコンポーネント", () => {
    const mockProps = {
        caption: "テストキャプション"
    };

    test("正しくレンダリングされること", () => {
        render(<Caption {...mockProps} />);
        const captionElement = screen.getByText(mockProps.caption);
        expect(captionElement).toBeInTheDocument();
    });

    test("キャプションが正しく表示されること", () => {
        render(<Caption {...mockProps} />);
        const captionElement = screen.getByText(mockProps.caption);
        expect(captionElement).toHaveTextContent("テストキャプション");
    });

    test("正しいスタイルが適用されていること", () => {
        render(<Caption {...mockProps} />);
        const captionElement = screen.getByText(mockProps.caption);
        
        expect(captionElement).toHaveStyle({
            width: "8rem",
            height: "3rem",
            fontSize: "1.3rem",
            marginBottom: "0rem",
            textAlign: "left"
        });
    });

    test("p要素として描画されていること", () => {
        render(<Caption {...mockProps} />);
        const captionElement = screen.getByText(mockProps.caption);
        expect(captionElement.tagName).toBe("P");
    });
});
