import { render, screen } from "@testing-library/react";
import { AppTitle } from "../apptitle";

describe("AppTitleコンポーネント", () => {
    const mockProps = {
        caption: "テストタイトル"
    };

    test("正しくレンダリングされること", () => {
        render(<AppTitle {...mockProps} />);
        const titleElement = screen.getByText(mockProps.caption);
        expect(titleElement).toBeInTheDocument();
    });

    test("キャプションが正しく表示されること", () => {
        render(<AppTitle {...mockProps} />);
        const titleElement = screen.getByText(mockProps.caption);
        expect(titleElement).toHaveTextContent("テストタイトル");
    });

    test("正しいスタイルが適用されていること", () => {
        render(<AppTitle {...mockProps} />);
        const titleElement = screen.getByText(mockProps.caption);
        
        expect(titleElement).toHaveStyle({
            width: "100%",
            height: "4rem",
            fontSize: "1.4rem",
            textAlign: "center"
        });
    });

    test("p要素として描画されていること", () => {
        render(<AppTitle {...mockProps} />);
        const titleElement = screen.getByText(mockProps.caption);
        expect(titleElement.tagName).toBe("P");
    });
});
