"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from '@/app/page.module.css';
import * as CSS from "csstype";
import { getApplicationList } from "@/app/api/application";
import { getAccountList } from "@/app/api/account";
import { AppTitle } from "@/app/components/apptitle";
import { Caption } from "@/app/components/caption";
import { LargeButton } from "@/app/components/button/large";
import { Listbox } from "@/app/components/listbox";
import { Plate } from "@/app/components/plate";
import { LoginUser } from "@/app/components/loginuser";
import { setAccountStore } from "@/app/proxy/account";
import { Account } from "@/app/types/account";
import { ADDACCOUNTPARAM, ADMINUSER } from "@/app/utillities/const";
import { convertCaption, getMenuRoute } from "@/app/utillities/function";

export default function AccountList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [applicationList, setApplicationList] = useState<string[]>([]);
  const [canSelect, setCanSelect] = useState<boolean>(false);

  useState(() => {
    const fetchApplicationList = async () => {
      const list = await getApplicationList();
      setApplicationList(list);
      setCanSelect(true);
    };
    try {
      fetchApplicationList();
    } catch (error: unknown) {
      alert(`アプリケーションマスターの取得に失敗しました: ${error}`);
    }
  });

  const accountMasterListStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const refreshAccountList = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedApp(e.target.value);
    setAccountList(await getAccountList(e.target.value));
  };

  const moveToDetail = (
    id: number,
    app: string,
    account: string,
    applicationList: string[]
  ) => {
    setAccountStore(id, app, account, applicationList);
    router.push(`/account/id=${id}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="アカウントマスター一覧" />
        <div className="header" style={headerStyle}>
          <LargeButton
            caption="戻る"
            isEnabled={canSelect}
            onClick={() => router.push(getMenuRoute(session?.user?.name!))}
          />
          <LargeButton
            caption="新規作成"
            isEnabled={canSelect && session?.user?.name! === ADMINUSER}
            onClick={() =>
              moveToDetail(
                0,
                ADDACCOUNTPARAM.Other,
                ADDACCOUNTPARAM.Other,
                applicationList
              )
            }
          />
        </div>
        <div className={styles.detail}>
          <Caption caption="アプリ名" />
          <input type="hidden" value={selectedApp} />
          <Listbox
            id="app"
            optionItems={applicationList}
            isEnabled={canSelect}
            isWidemode={true}
            onChange={refreshAccountList}
          />
        </div>
        <div className="accountList" style={accountMasterListStyle}>
          {accountList.map((account) => (
            <Plate
              key={account.id}
              caption={convertCaption(account.account)}
              isEnabled={canSelect}
              onClick={() =>
                moveToDetail(
                  account.id,
                  account.app,
                  account.account,
                  applicationList
                )
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}
