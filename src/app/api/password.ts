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

const registPassword = async (
  pwd: string,
  app: string,
  other_info: string,
) => {
  const res = await fetch(`${API_ROOT}/password/create?pwd=${pwd}&app=${app}&other_info=${other_info}`, {
    method: "POST",
  });
  const data = await res.json();
  return data;
}
export { getPassword, registPassword };