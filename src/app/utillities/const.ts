// APIのルートパス
const API_ROOT = process.env.NEXT_PUBLIC_API_BASE;

// アカウント区分
const ACCOUNTCLASS = {
  NoNeedAccount: "0",
  NeedAccount: "1",
};

const FUNCLIST: string[] = ["アカウントマスター", "パスワード検索", "自動登録済リスト"];
const ADMINFUNCLIST: string[] = ["アカウントマスター", "パスワード検索", "自動登録済リスト", "各種設定"];

// 新規登録画面遷移時に渡すパラメータ
const NEWID: number = 0;
const ADDACCOUNTPARAM: { Id: string; Other: string } = {
  Id: "id%3D0",
  Other: "",
};

// アプリの操作を許可するユーザー(ユーザー名)
const ADMINUSER: string = process.env.NEXT_PUBLIC_ADMIN_USER_NAME!;
const GENERALUSER: string = process.env.NEXT_PUBLIC_GENERAL_USER_NAME!;

// ワンタイムパスワード作成時に使う定数
const OTPPARAM: {
  markclas: string;
  otpctlcdPhonenumber: string;
  otpctlcdOtplength: string;
} = {
  markclas: "0",
  otpctlcdPhonenumber: "01",
  otpctlcdOtplength: "02",
}

export {
  API_ROOT,
  ACCOUNTCLASS,
  FUNCLIST,
  ADMINFUNCLIST,
  NEWID,
  ADDACCOUNTPARAM,
  ADMINUSER,
  GENERALUSER,
  OTPPARAM,
};