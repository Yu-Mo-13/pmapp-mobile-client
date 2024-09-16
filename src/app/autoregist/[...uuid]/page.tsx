"use client";
import React, { useState } from "react";
import styles from '@/app/page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as CSS from "csstype";
import { getAutoregistInfo, deleteAutoregistInfo } from "@/app/api/autoregist";
import { registPassword } from "@/app/api/password";
import { AppTitle } from '@/app/components/apptitle';
import { Caption } from '@/app/components/caption';
import { SmallButton } from '@/app/components/button/small';
import { LoginUser } from '@/app/components/loginuser';
import { ReadonlyTextbox } from "@/app/components/textbox/readonly";
import { Autoregist, UUID } from '@/app/types/password';
import { NEWID } from '@/app/utillities/const';
import { getRegistButtonState } from '@/app/utillities/function';

export default function AutoRegistDetail({ params }: { params: { uuid: UUID }}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [autoregistInfo, setAutoRegistInfo] = useState<Autoregist>({
    uuid: `${NEWID}`,
    pwd: "",
    app: "",
    other_info: "",
    registered_date: "",
  });

  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const registButtonState = getRegistButtonState(params.uuid[0], session?.user?.name!);

  const fetchAutoRegistInfo = async () => {
    const autoregistDetailInfo: Autoregist = await getAutoregistInfo(params.uuid[0]);
    setAutoRegistInfo(autoregistDetailInfo);
  };

  const onClickGetPasswordButton = async () => {
    if (autoregistInfo.pwd === "") {
      alert("パスワードをコピーできませんでした。");
      return;
    }
    navigator.clipboard.writeText(atob(autoregistInfo.pwd)).then(() => {
      alert("パスワードをコピーしました。");
    });
  };

  const onClickRegistButton = async () => {
    try {
      // 登録確認メッセージを表示
      if (!confirm("本登録しますか？")) return;
      // 本登録処理
      await registPassword(
        autoregistInfo.pwd,
        autoregistInfo.app,
        autoregistInfo.other_info
      );
      // 本登録後、自動登録情報を削除
      await deleteAutoregistInfo(params.uuid[0]);
      // 完了メッセージを表示
      alert(`本登録が完了しました。`);
      // 一覧画面に遷移
      router.push("/autoregist");
    } catch (error: unknown) {
      alert(`本登録に失敗しました。`);
    }
  }

  // 初期表示で自動登録情報を取得し、autoregistInfoに設定
  useState(() => {
    try {
      fetchAutoRegistInfo();
    } catch (error: unknown) {
      alert(`自動登録情報の取得に失敗しました。`);
    }
  })

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
            onClick={() => onClickGetPasswordButton()}
          />
          <SmallButton
            caption="本登録"
            isEnabled={registButtonState.isEnabled}
            onClick={() => onClickRegistButton()}
          />
        </div>
        <div className={styles.detail}>
          <Caption caption="アプリ名" />
          <ReadonlyTextbox type="text" id="app" placeholder="アプリ名" onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            setAutoRegistInfo({ ...autoregistInfo, app: e.target.value });
          }} val={autoregistInfo.app} />
          <Caption caption="アカウント" />
          <ReadonlyTextbox type="text" id="account" placeholder="アカウント" onChange={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            setAutoRegistInfo({ ...autoregistInfo, other_info: e.target.value });
          }} val={autoregistInfo.other_info} />
          </div>
      </div>
    </main>
  )
}