"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../css/StudentAuth.module.css";
import { LuCopy } from "react-icons/lu";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const Get_token = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const token = "6583-0251-4789-3560";
  const [copied, setCopied] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const registrationFormPath =
    role === "teacher"
      ? `/Register/Teacher/Registration-Form`
      : `/Register/Student/Registration-Form`;
  return (
    <div className={styles.Token_Container}>
      {copied &&
        <p className={styles.copiedMessage}>Token copied to clipboard!</p>}
      <div className={styles.Token_box}>
        <div className={styles.title}>
          <h2>Verification Successful</h2>
        </div>
        <div>
          <p className={styles.copytokentitle}>Copy Token to Proceed</p>
          <div className={styles.copytoken}>
            <p>
              {token}
            </p>
            <LuCopy size={20} onClick={handleCopyToken} />
          </div>

          <div />
        </div>
        <Link href={registrationFormPath}>
          <button className={styles.continuebtn}>Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default Get_token;
