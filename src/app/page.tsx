"use client";
import React from "react";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";
import { AppTitle } from './components/apptitle';
import { LargeButton } from "./components/button/large";
import * as CSS from 'csstype';

export default function Home() {
  const loginStyle: CSS.Properties = {
    marginTop: "9rem",
  }

  const onClickLogin = () => {
    try {
      signIn("google", { callbackUrl: "/menu" }, { prompt: "login"});
    } catch (error) {
      alert("ログインに失敗しました。");
      return;
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.content} style={loginStyle}>
        <AppTitle caption="PMAPP Mobile"/>
        {/* ログインボタン */}
        <LargeButton caption="ログイン" onClick={onClickLogin} isEnabled={true} />
      </div>
    </main>
  );
}
