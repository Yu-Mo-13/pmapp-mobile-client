// APIのルートパス
// export const API_ROOT = process.env.VITE_API_BASE_URL;
export const API_ROOT = process.env.API_BASE;

// アカウント区分
export const ACCOUNTCLASS = {
  NoNeedAccount: "0",
  NeedAccount: "1",
};

export const FUNCLIST: string[] = ["ユーザーマスター", "アカウントマスター","自動登録済リスト"];

// 新規登録画面遷移時に渡すパラメータ
export const ADDUSERPARAM: number = 0;
export const ADDACCOUNTPARAM: { Id: number; Other: string } = {
  Id: 0,
  Other: "",
};