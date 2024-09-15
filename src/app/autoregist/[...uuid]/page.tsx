"use client";
import styles from '@/app/page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as CSS from "csstype";
import { AppTitle } from '@/app/components/apptitle';
import { SmallButton } from '@/app/components/button/small';
import { LoginUser } from '@/app/components/loginuser';
import { UUID } from '@/app/types/password';

export default function AutoRegistDetail({ params }: { params: { uuid: UUID }}) {
  const router = useRouter();
  const { data: session } = useSession();

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="パスワード自動登録リスト" />
        <div className="header" style={headerStyle}>
          <SmallButton
            caption="戻る"
            isEnabled={true}
            onClick={() => router.push("/autoregist")}
          />
          <SmallButton
            caption="コピー"
            isEnabled={true}
            onClick={() => alert("コピーしました")}
          />
          <SmallButton
            caption="本登録"
            isEnabled={true}
            onClick={() => alert("本登録しました")}
          />
        </div>
      </div>
    </main>
  )
}