import { render, screen, fireEvent } from "@testing-library/react";
import { Listbox } from "../listbox";

describe("Listboxコンポーネント", () => {
    const mockProps = {
        id: "test-listbox",
        optionItems: ["選択肢1", "選択肢2", "選択肢3"],
        isEnabled: true,
        isWidemode: false,
        onChange: jest.fn()
    };

    test("正しくレンダリングされること", () => {
        render(<Listbox {...mockProps} />);
        const selectElement = screen.getByRole("combobox");
        expect(selectElement).toBeInTheDocument();
    });

    test("すべての選択肢が表示されること", () => {
        render(<Listbox {...mockProps} />);
        mockProps.optionItems.forEach(item => {
            const option = screen.getByText(item);
            expect(option).toBeInTheDocument();
        });
    });

    test("選択時にonChangeハンドラーが呼び出されること", () => {
        render(<Listbox {...mockProps} />);
        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: "選択肢2" } });
        expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    });

    test("通常モード時の正しいスタイルが適用されていること", () => {
        render(<Listbox {...mockProps} />);
        const selectElement = screen.getByRole("combobox");
        
        expect(selectElement).toHaveStyle({
            width: "80px",
            height: "50px",
            fontSize: "20px",
            marginBottom: "10px",
            marginLeft: "13px",
            paddingRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            maxWidth: "95%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        });
    });

    test("ワイドモード時の正しいスタイルが適用されていること", () => {
        render(<Listbox {...mockProps} isWidemode={true} />);
        const selectElement = screen.getByRole("combobox");
        
        expect(selectElement).toHaveStyle({
            width: "220px"
        });
    });

    test("無効時に選択肢が選択できないこと", () => {
        render(<Listbox {...mockProps} isEnabled={false} />);
        const options = screen.getAllByRole("option");
        options.forEach(option => {
            expect(option).toBeDisabled();
        });
    });

    test("有効時に選択肢が選択できること", () => {
        render(<Listbox {...mockProps} isEnabled={true} />);
        const options = screen.getAllByRole("option");
        options.forEach(option => {
            expect(option).not.toBeDisabled();
        });
    });

    test("ワイドモード時にdiv要素でラップされないこと", () => {
        render(<Listbox {...mockProps} isWidemode={true} />);
        const divElement = document.querySelector(".list");
        expect(divElement).not.toBeInTheDocument();
    });

    test("通常モード時にdiv要素でラップされること", () => {
        render(<Listbox {...mockProps} isWidemode={false} />);
        const divElement = document.querySelector(".list");
        expect(divElement).toBeInTheDocument();
        expect(divElement).toHaveStyle({
            textAlign: "left",
            marginLeft: "0.5rem"
        });
    });
});
