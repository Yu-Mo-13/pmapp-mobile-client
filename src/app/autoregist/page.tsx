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
import { convertCaption, getMenuRoute } from '@/app/utillities/function';

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
      alert(`自動登録リストの取得に失敗しました: ${error}`);
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

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="パスワード自動登録リスト" />
        <div className="header" style={headerStyle}>
          <LargeButton
            caption="戻る"
            isEnabled={true}
            onClick={() => router.push(getMenuRoute(session?.user?.name!))}
          />
        </div>
        {autoregistInfo.length === 0 ? (
            <AppTitle caption="自動登録されたパスワードはありません。" />
        ) : null}
        <div className="accountList" style={accountListStyle}>
          {autoregistInfo.map((rec, i) => (
            <Plate
              key={i}
              caption={rec.other_info === "" ? rec.app : convertCaption(`${rec.app}/${rec.other_info}`)}
              isEnabled={true}
              onClick={() => moveToDetail(rec.uuid)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}