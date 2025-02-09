"use client";
import { useState } from "react";
import styles from "../../css/StudentAuth.module.css";
import Link from "next/link";
import { PiEyeLight } from "react-icons/pi";
import { IoEyeOffOutline } from "react-icons/io5";
import LeftAuth from "@/app/Components/LeftAuth";

interface CustomError extends Error {
  message: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [schoolid, setSchoolid] = useState<string>("");
  const [Pin, setPin] = useState<string>("");
  const [schooliderror, setSchooliderror] = useState<string>("");
  const [pinerror, setPinerror] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Handle Form Submission

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSchooliderror("");
    setPinerror("");

    let valid = true;
    if (!schoolid) {
      setSchooliderror("School ID is required");
      valid = false;
    }

    if (!Pin) {
      setPinerror("Pin is required");
      valid = false;
    }

    if (!valid) {
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolid, Pin })
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "School ID does not exist") {
          setSchooliderror(errorData.message);
        } else if (errorData.error === "Invalid Pin or used OTP") {
          setPinerror(errorData.message);
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        const data = await response.json();
        // Handle successful registration
        console.log("Registration successfu", data);
        // Use Next.js router to navigate
        // router.push("/dashboard");
      }
    } catch (error) {
      const customError = error as CustomError;
      setPinerror(customError.message);
      setSchooliderror(customError.message);
    }
  };

  return (
    <div className={styles.Student_Auth_Container}>
      <LeftAuth />
      <div className={styles.Student_Right_Auth}>
        <div className={styles.Reg_box2}>
          <div className={styles.login_form}>
            <div className={styles.Regtitle2}>
              <h1>Register Now</h1>
              <p>Kindly provide the requested information to register.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.Login_input}>
                <label htmlFor="SchoolID">School ID</label>
                <input
                  className={styles.username}
                  type="text"
                  value={schoolid}
                  placeholder="Enter School ID"
                  onChange={e => setSchoolid(e.target.value)}
                  required
                />
                {schooliderror &&
                  <p className={styles.error}>
                    {schooliderror}
                  </p>}
              </div>

              <div className={styles.Login_input}>
                <div className={styles.pswd}>
                  <label htmlFor="Pin">Pin</label>
                </div>
                <div className={styles.toggle}>
                  <input
                    className={styles.username}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Pin"
                    value={Pin}
                    onChange={e => setPin(e.target.value)}
                    required
                  />
                  {showPassword
                    ? <PiEyeLight
                        className={styles.eye}
                        size={20}
                        onClick={togglePasswordVisibility}
                      />
                    : <IoEyeOffOutline
                        className={styles.eye}
                        size={20}
                        onClick={togglePasswordVisibility}
                      />}
                </div>
                {pinerror &&
                  <p className={styles.error}>
                    {pinerror}
                  </p>}
              </div>
              <div className={styles.loginbtn}>
                <button type="submit">Register</button>
              </div>
            </form>
            <p className={styles.NoAccount}>
              Already Registered?
              <Link href={"/"}>
                <span>Log In here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
