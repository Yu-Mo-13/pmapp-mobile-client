import React from "react";
import styles from "@/app/components/spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1}></div>
      <div className={styles.doubleBounce2}></div>
    </div>
  );
};