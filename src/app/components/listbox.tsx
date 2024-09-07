import * as CSS from "csstype";
import { ListboxProps } from "@/app/types/listbox";

export const Listbox = (props: ListboxProps) => {
  const { id, optionItems, isEnabled, isWidemode, onChange } =
    props;

  const listBoxStyle: CSS.Properties = {
    width: isWidemode ? "220px" : "80px",
    height: "50px",
    fontSize: "20px",
    marginBottom: "10px",
    marginLeft: "13px",
    paddingRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    maxWidth: "95%",
    // はみ出す場合は、・・・で省略する
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const divStyle: CSS.Properties = {
    textAlign: "left",
    marginLeft: "0.5rem",
  };

  if (isWidemode) {
    return (
      <select style={listBoxStyle} onChange={onChange}>
        {/* propsで渡された配列の個数分optionを生成 */}
        {optionItems.map((item: string, index: number) => {
          return (
            <option key={index} id={id} value={item} disabled={!isEnabled}>
              {item}
            </option>
          );
        })}
      </select>
    );
  } else {
    return (
      <div className="list" style={divStyle}>
        <select
          style={listBoxStyle}
          onChange={onChange}
        >
          {/* propsで渡された配列の個数分optionを生成 */}
          {optionItems.map((item: string, index: number) => {
            return (
              <option key={index} id={id} value={item} disabled={!isEnabled}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
};