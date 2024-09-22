"use client";
import React from "react";
import styles from "@/app/page.module.css";
import * as CSS from 'csstype';
import { useRouter } from "next/navigation";
import { getOtpctl } from '@/app/api/otpctl';
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from "@/app/components/button/large";
import { Otpctl } from "@/app/types/otpctl";
import { sendSms } from "@/app/utillities/aws";

export default function AdminHome() {
  const router = useRouter();
  const loginStyle: CSS.Properties = {
    marginTop: "9rem",
  }

  const onClickLogin = async () => {
    try {
      // SMS送信
      // CD=01のOTP制御情報を取得
      const otpctlInfo: Otpctl = await getOtpctl("01");
      // SMS送信
      sendSms(otpctlInfo.value, "管理者ログインがありました。");
      router.push("/admin");
    } catch (error) {
      alert("ログインに失敗しました。");
      return
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.content} style={loginStyle}>
        <AppTitle caption="PMAPP Mobile(管理者メニュー)"/>
        {/* ログインボタン */}
        <LargeButton caption="ログイン" onClick={onClickLogin} isEnabled={true} />
      </div>
    </main>
  );
}
