"use client";
import React, { use } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import styles from "./page.module.css";
import { AppTitle } from './components/apptitle';
import { Textbox } from "./components/textbox/textbox";
import { LargeButton } from "./components/button/large";

const loginSchema = yup.object().shape({
  userId: yup.string().required("ログイン情報を入力してください。"),
  keyword: yup.string().required("ログイン情報を入力してください。"),
});

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const onClickLogin = async () => {
    try {
      await loginSchema.validate({ userId, keyword });
      router.push("/menu");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // バリデーションエラー
        alert(error.message);
        return;
      }
      if (error instanceof TypeError) {
        // ログインエラー
        alert("ユーザーIDまたはパスワードが間違っています。");
      }
      return;
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <AppTitle caption="PMAPP Mobile"/>
        {/* ユーザーIDを入力するテキストボックス */}
        <Textbox
          type="text"
          id="USERID"
          placeholder="ユーザーID"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
          val={userId}
        />
        {/* ユーザーIDを入力するテキストボックス */}
        <Textbox
          type="password"
          id="PASSWORD"
          placeholder="パスワード"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          val={keyword}
        />
        {/* ログインボタン */}
        <LargeButton caption="ログイン" onClick={onClickLogin} isEnabled={true} />
      </div>
    </main>
  );
}
