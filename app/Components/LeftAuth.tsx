import React from "react";
import styles from "../css/StudentAuth.module.css";
import Image from "next/image";

const LeftAuth = () => {
  return (
    <div className={styles.Student_Left_Auth}>
      <div className={styles.login_img}>
        <Image src="/loginimage.svg" alt="" width={200} height={100}/>
      </div>
    </div>
  );
};

export default LeftAuth;
