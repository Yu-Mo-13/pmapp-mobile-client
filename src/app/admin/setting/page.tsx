"use client"
import React, { useState } from 'react';
import styles from "@/app/page.module.css";
import * as CSS from 'csstype';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getOtpctlList, updateOtpctl } from '@/app/api/otpctl';
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from '@/app/components/button/large';
import { Caption } from '@/app/components/caption';
import { LoginUser } from '@/app/components/loginuser';
import { Textbox } from '@/app/components/textbox/textbox';
import { Otpctl } from '@/app/types/otpctl';
import { getMenuRoute } from '@/app/utillities/function';

export default function Setting() {
  const router = useRouter();
  const { data: session } = useSession();
  const [otpctlList, setOtpctlList] = useState<Otpctl[]>([]);
  const headerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
  // 戻るボタン押下時の処理
  const onClickBackButton = () => {
    router.push(getMenuRoute(session?.user?.name!));
  };
  // 更新ボタン押下時の処理
  const onClickRegistButton = () => {
    if (!confirm("設定を更新しますか?")) return;
    otpctlList.forEach(async (otpctl) => {
        try {
          await updateOtpctl(otpctl.cd, otpctl.value);
        } catch (error) {
          alert(error);
        }
      }
    );
    alert("設定を更新しました。");
  };

  useState(async () => {
    try {
      setOtpctlList(await getOtpctlList());
    } catch (error) {
      alert(error);
    }
  });

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="管理者メニュー設定"/>
        <div className="header" style={headerStyle}>
          <LargeButton caption="戻る" isEnabled={true} onClick={onClickBackButton} />
          <LargeButton caption="更新" isEnabled={true} onClick={onClickRegistButton} />
        </div>
        <div className={styles.detail}>
          {otpctlList.map((otpctl, index) => (
            <React.Fragment key={index}>
              <Caption caption={otpctl.remarks} />
              <Textbox type="text" id={otpctl.name} placeholder={otpctl.remarks} val={otpctl.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setOtpctlList(otpctlList.map((item) => item.cd === otpctl.cd ? { ...item, value: e.target.value } : item));
              }} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  )
}