"use client";
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation';
import * as CSS from "csstype";
import { getMarkclasAndAutosize } from '@/app/api/application';
import { createAutoregistInfo } from '@/app/api/autoregist';
import { generatePassword } from '@/app/api/password';
import { AppTitle } from '@/app/components/apptitle';
import { LargeButton } from '@/app/components/button/large';
import { Caption } from '@/app/components/caption';
import { ReadonlyTextbox } from '@/app/components/textbox/readonly';
import { AUTOREGISTPASSWORD } from '@/app/utillities/const';

export default function AutoRegistDetail({ params }: { params: { app: string }}) {
  const router = useRouter();

  const footerStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const onClickPreRegistButton = async () => {
    try {
      // 登録確認ダイアログを表示
      if (!confirm("パスワードを作成し、仮登録しますか。")) return;
      const adminPass = prompt("管理者パスワードを入力してください。");
      // 管理者パスワードを入力するダイアログを表示
      if (!adminPass) return;
      if (adminPass !== AUTOREGISTPASSWORD) {
        alert("不正な管理者パスワードです。");
        return;
      };
      // markclasとautosizeを取得
      const markclasAndAutosize = await getMarkclasAndAutosize(params.app);
      // パスワードを生成
      const password = await generatePassword(markclasAndAutosize.markclas, markclasAndAutosize.autosize);
      await createAutoregistInfo(password, params.app, "");
      alert("パスワードの仮登録が完了しました。");
      // パスワードをクリップボードにコピー
      navigator.clipboard.writeText(atob(password)).then(() => {
        alert("パスワードをクリップボードにコピーしました。再度パスワードをコピーする場合は、パスワード仮登録済リスト画面から取得してください。");
        router.push("/");
      });
    } catch (error) {
      alert(`パスワードの仮登録に失敗しました。Error:${error}`);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <AppTitle caption="パスワード仮登録画面" />
        <div className={styles.detail}>
          <Caption caption="アプリ名" />
          <ReadonlyTextbox type="text" id="app" placeholder="" val={params.app} onChange={
            // 何も処理しない
            () => {}
          } />
        </div>
        <div className="footer" style={footerStyle}>
          <LargeButton
            caption="仮登録"
            isEnabled={true}
            onClick={() => onClickPreRegistButton()}
          />
        </div>
      </div>
    </main>
  )
}