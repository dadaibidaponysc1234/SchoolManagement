import React from "react";
import styles from "../css/StudentAuth.module.css";

const LeftAuth = () => {
  return (
    <div className={styles.Student_Left_Auth}>
      <div className={styles.login_img}>
        <img src="/loginimage.svg" alt="" />
      </div>
    </div>
  );
};

export default LeftAuth;
