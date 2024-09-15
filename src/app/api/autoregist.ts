import { API_ROOT } from "@/app/utillities/const";
import { Autoregist } from '@/app/types/password';

const getAllAutoregistList = async () => {
  const res = await fetch(`${API_ROOT}/autoregist`);
  const data = await res.json();
  const autoregistList: Autoregist[] = new Array(data.length);
  // UUIDとアプリ名とアカウント名を取得して、autoregistListに格納する
  for (let i = 0; i < data.length; i++) {
    autoregistList[i] = {
      uuid: data[i].uuid,
      pwd: "",
      app: data[i].app,
      other_info: data[i].other_info,
      registered_date: "",
    };
  }
  return autoregistList;
};

const getAutoregistInfo = async (uuid: string) => {
  const res = await fetch(`${API_ROOT}/autoregist/id=${uuid}`);
  const data = await res.json();
  const autoregistInfo: Autoregist = data[0];
  return autoregistInfo;
}

export { getAllAutoregistList, getAutoregistInfo };