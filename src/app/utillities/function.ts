import { ADMINUSER, GENERALUSER, ADDACCOUNTPARAM } from "@/app/utillities/const";

const convertCaption = (account: string) => {
  return account.length > 10 ? account.slice(0, 20) + "..." : account;
};

const checkAdminUser = (user: string) => {
  return user === ADMINUSER;
}

const checkGeneralUser = (user: string) => {
  return user === GENERALUSER;
}

const getRegistButtonState = (id: string, username: string) => {
  const state = {
    isEnabled: false,
    caption: "登録"
  };
  // ボタン活性/非活性の判定
  if (username === ADMINUSER) {
    state.isEnabled = true;
  }
  // ボタンキャプションの設定
  if (id !== ADDACCOUNTPARAM.Id) {
    state.caption = "削除";
  }
  return state;
}

export { convertCaption, checkAdminUser, checkGeneralUser, getRegistButtonState };