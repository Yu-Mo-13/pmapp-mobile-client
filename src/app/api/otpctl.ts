import { API_ROOT } from "@/app/utillities/const"
import { Otpctl } from "@/app/types/otpctl"

export const getOtpctlList = async () => {
  const res = await fetch(`${API_ROOT}/otpctl`)
  const data = await res.json()
  const otpctlList: Otpctl[] = new Array(data.length)
  for (let i = 0; i < data.length; i++) {
    otpctlList[i] = {
      cd: data[i].cd,
      name: data[i].name,
      value: data[i].value,
      remarks: data[i].remarks,
      created_at: data[i].created_at,
      updated_at: data[i].updated_at,
    }
  }
  return otpctlList
}

// CDをキーにOTP制御情報を取得する
// URL: /otpctl/cd={cd}
export const getOtpctl = async (cd: string) => {
  const res = await fetch(`${API_ROOT}/otpctl/cd=${cd}`)
  const data = await res.json()
  const otpctlInfo: Otpctl = {
    cd: data.cd,
    name: data.name,
    value: data.value,
    remarks: data.remarks,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
  return otpctlInfo
}

// CDをキーにOTP制御情報を更新する(PUTメソッド)
// URL: /otpctl/cd={cd}
export const updateOtpctl = async (cd: string, value: string) => {
  const res = await fetch(`${API_ROOT}/otpctl/cd=${cd}?cd=${cd}&value=${value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return res
}