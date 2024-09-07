// APIのルートパス
const API_ROOT = process.env.NEXT_PUBLIC_API_BASE;

// アカウント区分
const ACCOUNTCLASS = {
  NoNeedAccount: "0",
  NeedAccount: "1",
};

const FUNCLIST: string[] = ["アカウントマスター", "パスワード検索", "自動登録済リスト"];

// 新規登録画面遷移時に渡すパラメータ
const NEWID: number = 0;
const ADDACCOUNTPARAM: { Id: string; Other: string } = {
  Id: "id%3D0",
  Other: "",
};

// アプリの操作を許可するユーザー(ユーザー名)
const ADMINUSER: string = process.env.NEXT_PUBLIC_ADMIN_USER_NAME!;
const GENERALUSER: string = process.env.NEXT_PUBLIC_GENERAL_USER_NAME!;

export {
  API_ROOT,
  ACCOUNTCLASS,
  FUNCLIST,
  NEWID,
  ADDACCOUNTPARAM,
  ADMINUSER,
  GENERALUSER,
};