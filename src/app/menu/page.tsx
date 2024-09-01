"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "@/app/page.module.css";
import * as CSS from "csstype";
import { AppTitle } from "@/app/components/apptitle";
import { LoginUser } from "@/app/components/loginuser";
import { Plate } from "@/app/components/plate";
import { FUNCLIST } from "@/app/utillities/const";
import { checkAllowUser } from "@/app/utillities/function";

export default function Menu() {
  const router = useRouter();
  const { data: session } = useSession();
  const menuStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };
  const onClickLogout = () => {
    signOut({ callbackUrl: "/" });
  }
  const onClickPlate = (funcname: string) => {
    if (!checkAllowUser(session?.user?.name!)) {
      alert("アクセス権限がありません。");
      return;
    }
    switch (funcname) {
      case FUNCLIST[0]:
        router.push("/account");
        break;
      case FUNCLIST[1]:
        router.push("/password");
        break;
      case FUNCLIST[2]:
        router.push("/autoregist");
        break;
      default:
        alert("Coming soon...");
        break;
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="メニュー"/>
        <div className="funcList" style={menuStyle}>
          {FUNCLIST.map((funcname) => (
            <Plate key={funcname} caption={funcname} isEnabled={true} onClick={() => onClickPlate(funcname)}/>
          ))}
        </div>
        <Plate caption="ログアウト" isEnabled={true} onClick={onClickLogout} />
      </div>
    </main>
  );
}