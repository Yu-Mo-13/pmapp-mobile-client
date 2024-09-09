"use client"
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as CSS from "csstype";
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from '@/app/components/button/large';
import { LoginUser } from '@/app/components/loginuser';
import { setAutoregistStore } from '@/app/proxy/autoregist';
import { ADMINUSER } from '@/app/utillities/const';

export default function AutoRegistList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [applicationList, setApplicationList] = useState<string[]>([]);
  const [canSelect, setCanSelect] = useState<boolean>(false);

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const moveToDetail = (
    uuid: string,
    pwd: string,
    app: string,
    other_info: string,
    registered_date: string
  ) => {
    setAutoregistStore({
      uuid,
      pwd,
      app,
      other_info,
      registered_date,
    });
    router.push(`/account/id=${uuid}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="パスワード自動登録リスト一覧" />
        <div className="header" style={headerStyle}>
          <LargeButton
            caption="戻る"
            isEnabled={canSelect}
            onClick={() => router.push("/menu")}
          />
        </div>
      </div>
    </main>
  );
}