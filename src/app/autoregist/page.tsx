"use client"
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as CSS from "csstype";
import { getAllApplicationList } from '@/app/api/application';
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from '@/app/components/button/large';
import { LoginUser } from '@/app/components/loginuser';
import { Plate } from '@/app/components/plate';
import { AccountandUUID } from '@/app/types/account';
import { ADMINUSER, ACCOUNTCLASS } from '@/app/utillities/const';
import { convertCaption } from '@/app/utillities/function';

export default function AutoRegistList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [autoregistInfo, setAutoregistInfo] = useState<AccountandUUID[]>([]);
  const [accountClass, setAccountClass] = useState<string>("");
  const [appList, setAppList] = useState<string[]>([]);
  const [canSelect, setCanSelect] = useState<boolean>(false);

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

  const onClickReadButton = async () => {
    setCanSelect(true);
  };

  const moveToDetail = (uuid: string) => {
    router.push(`/account/id=${uuid}`);
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
        <AppTitle caption="パスワード自動登録リスト" />
        <div className="header" style={headerStyle}>
          <LargeButton
            caption="戻る"
            isEnabled={true}
            onClick={() => router.push("/menu")}
          />
          <LargeButton
              caption="読込"
              onClick={() => onClickReadButton()}
              isEnabled={true}
          />
        </div>
        <div className="accountList" style={accountListStyle}>
          {/* autoregistInfo.accountList.mapを使って、Plateのリストを作る */}
          {accountClass === ACCOUNTCLASS.NeedAccount ? (
            autoregistInfo.map((rec, i) => (
              <Plate
                key={i}
                caption={convertCaption(rec.account)}
                isEnabled={true}
                onClick={() => moveToDetail(rec.uuid)}
              />
            ))
          ) : (
            <Plate
              key={0}
              caption={"詳細"}
              isEnabled={canSelect}
              onClick={() =>
                moveToDetail(autoregistInfo[0].uuid)
              }
            />
          )}
        </div>
      </div>
    </main>
  );
}