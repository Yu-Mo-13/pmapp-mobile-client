// パスワード検索画面のプロキシ
import { proxy } from "valtio";
import { Password } from "@/app/types/password";

const passwordStore: Password = proxy({
  no: 0,
  pwd: "",
  app: "",
  other_info: "",
  registered_date: "",
});

const resetPasswordStore = () => {
  passwordStore.no = 0;
  passwordStore.pwd = "";
  passwordStore.app = "";
  passwordStore.other_info = "";
  passwordStore.registered_date = "";
};

export { passwordStore, resetPasswordStore };