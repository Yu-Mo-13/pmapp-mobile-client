"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as CSS from "csstype";
import styles from '@/app/page.module.css';
import {
  getAccountClas,
  getAccountList,
  getAllApplicationList,
} from "@/app/api/application";
import { getAccount } from "@/app/api/account";
import { getPassword } from "@/app/api/password";
import { AppTitle } from "@/app/components/apptitle";
import { Caption } from "@/app/components/caption";
import { LargeButton } from "@/app/components/button/large";
import { LoginUser } from "@/app/components/loginuser";
import { Listbox } from "@/app/components/listbox";
import { Plate } from "@/app/components/plate";
import { resetPasswordStore } from "@/app/proxy/password";
import { AccountandPassword } from "@/app/types/account";
import { ACCOUNTCLASS, NEWID } from "@/app/utillities/const";
import { convertCaption } from "@/app/utillities/function";

export default function Password() {
  const [passwordInfo, setPasswordInfo] = useState<AccountandPassword[]>([]);
  const [selectedAppName, setSelectedAppName] = useState<string>("");
  const [appList, setAppList] = useState<string[]>([]);
  const [accountClass, setAccountClass] = useState<string>("");
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [canSelectPlate, setCanSelectPlate] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const accountListStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  const createAccountList = async (app: string, accountClas: string) => {
    const accountList = await getAccountList(app, accountClas);
    accountList.map(async (rec) => {
      const accountInfo = await getAccount(app, rec);
      const password = await getPassword(app, accountClas, rec);
      // 各アカウント情報をpasswordDetailInfoにpushする
      setPasswordInfo((prev) => [
        ...prev,
        {
          id: accountInfo.id,
          app: accountInfo.app,
          account: rec,
          deleteflg: accountInfo.deleteflg,
          created_at: accountInfo.created_at,
          updated_at: accountInfo.updated_at,
          password: password,
        },
      ]);
    });
  };

  const onClickReadButton = async () => {
    setPasswordInfo([]);
    if (accountClass === ACCOUNTCLASS.NeedAccount) {
      createAccountList(selectedAppName, accountClass);
      return;
    }
    setPasswordInfo([
      {
        id: NEWID,
        app: selectedAppName,
        account: "",
        deleteflg: "",
        created_at: "",
        updated_at: "",
        password: await getPassword(selectedAppName, accountClass, ""),
      },
    ]);
    setCanSelectPlate(true);
  };

  const onClickBackButton = () => {
    resetPasswordStore();
    router.push("/menu");
  };

  const onClickGetPasswordButton = async (p: string) => {
    if (p === "") {
      alert("パスワードが登録されていません。");
      return;
    }
    navigator.clipboard.writeText(atob(p)).then(() => {
      if (
        !window.confirm(
          "パスワードをクリップボードにコピーしました。メニュー画面に戻りますか？"
        )
      )
        return;
      onClickBackButton();
    });
  };

  useState(async () => {
    try {
      setAppList(await getAllApplicationList());
    } catch (error: unknown) {
      alert(`アプリケーション情報の取得に失敗しました: ${error}`);
    }
  });

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="パスワード検索画面" />
        <div className={styles.detail}>
          <Caption caption="アプリ名" />
          <Listbox
          id="app"
          optionItems={appList}
          isEnabled={true}
          isWidemode={true}
          onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
            setIsPressed(true);
            setCanSelectPlate(false);
            setSelectedAppName(e.target.value);
            setAccountClass(await getAccountClas(e.target.value));
            setPasswordInfo([]);
          }}
          />
        </div>
        <div className="header" style={headerStyle}>
          <LargeButton
            caption="戻る"
            onClick={() => onClickBackButton()}
            isEnabled={true}
          />
          <LargeButton
            caption="読込"
            onClick={() => onClickReadButton()}
            isEnabled={isPressed}
          />
        </div>
        <div className="accountList" style={accountListStyle}>
          {/* passwordDetailInfo.accountList.mapを使って、Plateのリストを作る */}
          {accountClass === ACCOUNTCLASS.NeedAccount ? (
            passwordInfo.map((rec, i) => (
              <Plate
                key={i}
                caption={convertCaption(rec.account)}
                isEnabled={true}
                onClick={() => onClickGetPasswordButton(rec.password)}
              />
            ))
          ) : (
            <Plate
              key={0}
              caption={"取得"}
              isEnabled={canSelectPlate}
              onClick={() =>
                onClickGetPasswordButton(passwordInfo[0].password)
              }
            />
          )}
        </div>
      </div>
    </main>
  )
}