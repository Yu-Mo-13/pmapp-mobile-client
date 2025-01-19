"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import styles from "@/app/page.module.css";
import * as CSS from "csstype";
import { getMenu } from "@/app/api/menu";
import { AppTitle } from "@/app/components/apptitle";
import { LoginUser } from "@/app/components/loginuser";
import { Plate } from "@/app/components/plate";
import { Spinner } from "@/app/components/spinner";
import { checkAdminUser } from "@/app/utillities/function";
import { type Menu } from "@/app/types/menu";

export default function Menu() {
  const router = useRouter();
  const { data: session } = useSession();
  const [menu, setMenu] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const menuStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  };

  useEffect(() => {
    const fetchMenu = async () => {
      const list = await getMenu(true);
      setMenu(list);
      setLoading(false);
    };
    try {
      fetchMenu();
    } catch (error: unknown) {
      alert(`メニューの取得に失敗しました: ${error}`);
      setLoading(false);
    }
  }, []);

  const onClickLogout = () => {
    signOut({ callbackUrl: "/admin" });
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <LoginUser caption={session?.user?.name!} />
        <AppTitle caption="メニュー"/>
        {loading ? (
          <Spinner />
        ) : (
          <div className="menu" style={menuStyle}>
            {menu.map((m) => (
              <Plate
                key={m.id}
                caption={m.name}
                isEnabled={checkAdminUser(session?.user?.name!)}
                onClick={() => router.push(m.url)}
              />
            ))}
          </div>
        )}
        <Plate caption="ログアウト" isEnabled={!loading} onClick={onClickLogout} />
      </div>
    </main>
  );
}