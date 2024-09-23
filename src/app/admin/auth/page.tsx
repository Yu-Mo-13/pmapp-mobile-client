"use client";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import styles from "@/app/page.module.css";
import * as CSS from 'csstype';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { getOtpctl } from '@/app/api/otpctl';
import { generatePassword } from "@/app/api/password";
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from "@/app/components/button/large";
import { LoginUser } from "@/app/components/loginuser";
import { Textbox } from "@/app/components/textbox/textbox";
import {
  otpStore,
  setGenOtp,
  setSendOtp,
  resetOtp,
} from "@/app/proxy/admin";
import { OTPPARAM } from "@/app/utillities/const";
import { checkAdminUser } from "@/app/utillities/function";

export default function AdminAuth() {
  const router = useRouter();
  const store = useSnapshot(otpStore);
  const { data: session } = useSession();

  const footerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const onClickLogout = () => {
    // クライアント側にワンタイムパスワード情報を残さないようにする
    resetOtp();
    signOut({ callbackUrl: "/admin" });
  }

  const onClickLogin = () => {
    if (atob(store.genOtp) !== store.sendOtp) {
      alert("パスワードが一致しません。");
      return;
    }
    // クライアント側にワンタイムパスワード情報を残さないようにする
    resetOtp();
    router.push("/admin/menu");
  }

  const getOtpandSendtoSlack = async () => {
    // ワンタイムパスワードを取得
    const otpLength = await getOtpctl(OTPPARAM.otpctlcdOtplength);
    const getOtp = await generatePassword(OTPPARAM.markclas, otpLength.value);
    setGenOtp(getOtp);
    // Slack送信
    await fetch('/api/slack', {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body : JSON.stringify({message: `[PMAPP Mobile]\nワンタイムパスワードは${atob(getOtp)}です。`}),
    });
  }

  useState(async () => {
    try {
      await getOtpandSendtoSlack();
    } catch (error) {
      alert(`パスワードの送信に失敗しました: ${error}`);
      return
    }
  })

  return (
    <main className={styles.main}>
      <div className={styles.content}>
      <LoginUser caption={session?.user?.name!} />
      <AppTitle caption="ワンタイムパスワード入力画面"/>
      <Textbox type="text" id="otp" placeholder="パスワード" val={store.sendOtp} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSendOtp(e.target.value);
      }} />
      <div className="footer" style={footerStyle}>
        <LargeButton
          caption="ログアウト"
          isEnabled={true}
          onClick={onClickLogout}
        />
        <LargeButton
          caption="ログイン"
          isEnabled={checkAdminUser(session?.user?.name!)}
          onClick={onClickLogin}
        />
      </div>
      </div>
    </main>
  )
}