"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import * as CSS from "csstype";
import * as yup from "yup";
import styles from "@/app/page.module.css";
import { createAccount, deleteAccount, getAccount } from "@/app/api/account";
import { AppTitle } from "@/app/components/apptitle";
import { Caption } from "@/app/components/caption";
import { LargeButton } from "@/app/components/button/large";
import { LoginUser } from "@/app/components/loginuser";
import { ADDACCOUNTPARAM } from "@/app/utillities/const";
import { getRegistButtonState } from "@/app/utillities/function";
import { Textbox } from "@/app/components/textbox/textbox";
import { accountStore, resetAccountStore } from "@/app/proxy/account";
import { Account } from "@/app/types/account";

export default function AccountDetail({ params }: { params: { id: string }}) {
  const router = useRouter();
  const { data: session } = useSession();
  const accountSnap = useSnapshot(accountStore);
  const schema = yup.object().shape({
    app: yup.string().required("アプリ名を入力してください。").test(
      "is-not-exist-application", "アプリケーションが存在しません。", async (value) => {
        return (
          accountSnap.appList.filter((appName) => appName === value).length > 0
        );
      }
    ),
    account: yup.string().required("アカウント名を入力してください。"),
  });
  const [accountInfo, setAccountInfo] = useState<Account>({
    id: 0,
    account: "",
    app: "",
    deleteflg: "",
    created_at: "",
    updated_at: "",
  })
  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
  const registButtonState = getRegistButtonState(params.id[0], session?.user?.name!);
  const fetchApplicationList = async () => {
    const accountDetailInfo: Account = await getAccount(
      accountSnap.app,
      accountSnap.account
    );
    setAccountInfo(accountDetailInfo);
  };

  // 登録・削除ボタン押下時の処理
  const onClickRegistButton = async () => {
    try {
      if (params.id[0] === ADDACCOUNTPARAM.Id) {
        await schema.validate(accountInfo);
      }
      if (!window.confirm(`アカウント情報を${registButtonState.caption}します。よろしいですか？`)) {
        return;
      }
      // 登録・削除処理
      params.id === ADDACCOUNTPARAM.Id
        ? await createAccount(accountInfo)
        : await deleteAccount(accountInfo);
      resetAccountStore();
      router.push("/account");
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        alert(error.message);
        return;
      }
      // Failed to fetchエラー
      if ((error as Error).message === "Failed to fetch") {
        resetAccountStore();
        alert(`アカウントを${registButtonState.caption}しました。`);
        router.push("/account");
        return;
      }
      alert(`アカウント情報の${registButtonState.caption}に失敗しました: ${error}`);
    }
  };

  // 戻るボタン押下時の処理
  const onClickBackButton = () => {
    resetAccountStore();
    router.push("/account");
  };

  // 初期表示でアカウント情報を取得し、applicationInfoとして設定する
  useState(() => {
    try {
      if (params.id[0] === ADDACCOUNTPARAM.Id) {
        return;
      }
      fetchApplicationList();
    } catch (error: unknown) {
      alert(`アカウントマスター情報の取得に失敗しました: ${error}`);
    }
  })

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="アカウントマスター詳細" />
        <div className="header" style={headerStyle}>
          <LargeButton caption="戻る" isEnabled={true} onClick={onClickBackButton} />
          <LargeButton caption={registButtonState.caption} isEnabled={registButtonState.isEnabled} onClick={onClickRegistButton} />
        </div>
        <div className={styles.detail}>
          <Caption caption="アプリ名" />
          <Textbox type="text" id="app" placeholder="アプリ名" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAccountInfo({ ...accountInfo, app: e.target.value });
          }} val={accountInfo.app} />
          <Caption caption="アカウント" />
          <Textbox type="text" id="account" placeholder="アカウント" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAccountInfo({ ...accountInfo, account: e.target.value });
          }} val={accountInfo.account} />
        </div>
      </div>
    </main>
  );
}