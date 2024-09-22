"use client";
import React from "react";
import styles from "@/app/page.module.css";
import * as CSS from 'csstype';
import { signIn } from "next-auth/react";
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from "@/app/components/button/large";

export default function AdminHome() {
  const loginStyle: CSS.Properties = {
    marginTop: "9rem",
  }

  const onClickLogin = async () => {
    try {
      signIn("google", { callbackUrl: "/admin/auth" }, { prompt: "login"});
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
