import { render, screen } from "@testing-library/react";
import { LoginUser } from "../loginuser";

describe("LoginUserコンポーネント", () => {
    const mockProps = {
        caption: "テストユーザー"
    };

    test("正しくレンダリングされること", () => {
        render(<LoginUser {...mockProps} />);
        const userElement = screen.getByText(`ユーザー:${mockProps.caption}`);
        expect(userElement).toBeInTheDocument();
    });

    test("ユーザー名が正しく表示されること", () => {
        render(<LoginUser {...mockProps} />);
        const userElement = screen.getByText(`ユーザー:${mockProps.caption}`);
        expect(userElement).toHaveTextContent("ユーザー:テストユーザー");
    });

    test("正しいスタイルが適用されていること", () => {
        render(<LoginUser {...mockProps} />);
        const userElement = screen.getByText(`ユーザー:${mockProps.caption}`);
        
        expect(userElement).toHaveStyle({
            width: "14rem",
            height: "2rem",
            fontSize: "0.8rem",
            marginTop: "0rem",
            marginBottom: "0rem",
            textAlign: "center",
            position: "absolute",
            top: "1.5rem",
            right: "0.5rem"
        });
    });

    test("p要素として描画されていること", () => {
        render(<LoginUser {...mockProps} />);
        const userElement = screen.getByText(`ユーザー:${mockProps.caption}`);
        expect(userElement.tagName).toBe("P");
    });

    test("画面右上に配置されていること", () => {
        render(<LoginUser {...mockProps} />);
        const userElement = screen.getByText(`ユーザー:${mockProps.caption}`);
        expect(userElement).toHaveStyle({
            position: "absolute",
            top: "1.5rem",
            right: "0.5rem"
        });
    });
});
