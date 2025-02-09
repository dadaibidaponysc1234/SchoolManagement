"use client";
import { useState } from "react";
import LeftAuth from "./Components/LeftAuth";
import styles from "./css/StudentAuth.module.css";
import Link from "next/link";
import { PiEyeLight } from "react-icons/pi";
import { IoEyeOffOutline } from "react-icons/io5";

interface CustomError extends Error {
  message: string;
}
export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameerror, setUsernameerror] = useState<string>("");
  const [passworderror, setPassworderror] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameerror("");
    setPassworderror("");

    let valid = true;
    if (!username) {
      setUsernameerror("Username is required");
      valid = false;
    }

    if (!password) {
      setPassworderror("Password is required");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Invalid Username") {
          setUsernameerror(errorData.message);
        } else if (errorData.error === "Invalid Password") {
          setPassworderror(errorData.message);
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        const data = await response.json();
        // Handle successful login
        console.log("Login successful", data);
        // Use Next.js router to navigate
        // router.push("/dashboard");
      }
    } catch (error) {
      const customError = error as CustomError;
      setPassworderror(customError.message);
      setUsernameerror(customError.message);
    }
  };
  return (
    <div className={styles.Student_Auth_Container}>
      <LeftAuth />
      <div className={styles.Student_Right_Auth}>
        <div className={styles.login_box}>
          <div className={styles.logo}>
            <img src="/logo.svg" alt="" />
          </div>
          <div className={styles.login_form}>
            <div className={styles.title}>
              <p>Welcome to Foursquare Management System</p>
            </div>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.Login_input}>
                <label htmlFor="Username">Username</label>
                <input
                  className={styles.username}
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onChange={e => setUsername(e.target.value)}
                  required
                />
                {usernameerror &&
                  <p className={styles.error}>
                    {usernameerror}
                  </p>}
              </div>
              <div className={styles.Login_input}>
                <div className={styles.pswd}>
                  <label htmlFor="Password">Password</label>
                  {passworderror && <p>Forgot Password?</p>}
                </div>
                <div className={styles.toggle}>
                  <input
                    className={`${passworderror ? "" : styles.username}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
                {passworderror &&
                  <p className={styles.error}>
                    {passworderror}
                  </p>}
              </div>
              <div className={styles.loginbtn}>
                <button type="submit">LOG IN</button>
              </div>
            </form>
            <p className={styles.NoAccount}>
              Don&#39;t have an account?
              <Link href="/Register">
                <span>Register now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
