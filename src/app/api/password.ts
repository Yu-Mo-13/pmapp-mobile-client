import { API_ROOT } from "@/app/utillities/const"

const getPassword = async (
  app: string,
  accountClas: string,
  account: string
) => {
  const param = accountClas === "1" ? `app=${app}/account=${account}` : `app=${app}`;
  const res = await fetch(`${API_ROOT}/password/${param}`);
  const data = await res.json();
  return data.pwd;
};
export { getPassword };