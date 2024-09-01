import { ADMINUSER, GENERALUSER } from "@/app/utillities/const";

const convertCaption = (account: string) => {
  return account.length > 10 ? account.slice(0, 20) + "..." : account;
};

const checkAllowUser = (user: string) => {
  return user === ADMINUSER || user === GENERALUSER;
}

export { convertCaption, checkAllowUser };