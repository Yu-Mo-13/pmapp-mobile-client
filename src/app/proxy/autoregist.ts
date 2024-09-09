// パスワード検索画面のプロキシ
import { proxy } from "valtio";
import { Autoregist } from "@/app/types/password";

const autoregistStore: Autoregist = proxy({
  uuid: "",
  pwd: "",
  app: "",
  other_info: "",
  registered_date: "",
});

const setAutoregistStore = ({
  uuid,
  pwd,
  app,
  other_info,
  registered_date,
}: Autoregist) => {
  autoregistStore.uuid = uuid;
  autoregistStore.pwd = pwd;
  autoregistStore.app = app;
  autoregistStore.other_info = other_info;
  autoregistStore.registered_date = registered_date;
};

const resetAutoregistStore = () => {
  autoregistStore.uuid = "";
  autoregistStore.pwd = "";
  autoregistStore.app = "";
  autoregistStore.other_info = "";
  autoregistStore.registered_date = "";
};

export { autoregistStore, setAutoregistStore, resetAutoregistStore };