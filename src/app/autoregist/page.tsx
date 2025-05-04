"use client"
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as CSS from "csstype";
import { getAllAutoregistList } from '@/app/api/autoregist';
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from '@/app/components/button/large';
import { LoginUser } from '@/app/components/loginuser';
import { Plate } from '@/app/components/plate';
import { Autoregist } from '@/app/types/password';
import { getMenuRoute } from '@/app/utillities/function';

export default function AutoRegistList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [autoregistInfo, setAutoregistInfo] = useState<Autoregist[]>([]);

  useState(()=> {
    const fetchAutoregistList = async () => {
      const list = await getAllAutoregistList();
      setAutoregistInfo(list);
    };
    try {
      fetchAutoregistList();
    } catch (error: unknown) {
      alert(`仮登録済リストの取得に失敗しました: ${error}`);
    }
  });

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

  const moveToDetail = (uuid: string) => {
    router.push(`/autoregist/uuid=${uuid}`);
  };

  const convertCaption = (autoRegist: Autoregist) => {
    if (autoRegist.other_info === "") {
      return autoRegist.app;
    } else {
      return `${autoRegist.app}/${autoRegist.other_info}`;
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="仮登録済パスワードリスト" />
        <div className="header" style={headerStyle}>
          <LargeButton
            caption="戻る"
            isEnabled={true}
            onClick={() => router.push(getMenuRoute(session?.user?.name!))}
          />
        </div>
        {autoregistInfo.length === 0 ? (
            <AppTitle caption="仮登録済のパスワードはありません。" />
        ) : null}
        <div className="accountList" style={accountListStyle}>
          {autoregistInfo.map((rec, i) => (
            <Plate
              key={i}
              caption={convertCaption(rec)}
              isEnabled={true}
              onClick={() => moveToDetail(rec.uuid)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}