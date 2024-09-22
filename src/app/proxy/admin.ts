import { proxy } from "valtio";
import { Otp } from "@/app/types/otpctl";

const otpStore: Otp = proxy({
  genOtp: "",
  sendOtp: "",
});

const setGenOtp = (genOtp: string) => {
  otpStore.genOtp = genOtp;
}

const setSendOtp = (sendOtp: string) => {
  otpStore.sendOtp = sendOtp;
}

const resetOtp = () => {
  otpStore.genOtp = "";
  otpStore.sendOtp = "";
}

export { otpStore, setGenOtp, setSendOtp, resetOtp };