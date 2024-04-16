"use client";
// import libs
import Link from "next/link";
import Image from "next/image";
import classNameNames from "classnames/bind";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// import components
import { CustomerLogo } from "@/components";

// import css
import styles from "./header-nav.module.css";

import { BACKEND_URL, expirationTime } from "@/utils/commonConst";

const cx = classNameNames.bind(styles);

interface IUserLocal {
  user_id: string;
  user_name: string;
  user_avt: string;
}

export default function CustomerHeaderNav() {
  const [currentUser, setCurrentUser] = useState<(IUserLocal | null)>(null); // Định nghĩa biến currentUser ở đây

  const getCurrentUser = (): (IUserLocal | null) => {
    const storedUser = localStorage.getItem("userStore");
    let currentUser = null;
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
    return currentUser;
    // const currentUser = storedUser
    //   ? JSON.parse(storedUser)
    //   : null;
    // return currentUser;
  };

  useEffect(() => {
    const user: (IUserLocal | null) = getCurrentUser();
    setCurrentUser(user);
  }, []);

  // console.log("LocalStore2", currentUser);

  const handleLogout = async (e) => {
    e.preventDefault();
    const accessTokens = Cookies.get("accessToken");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (res.ok) {
        Cookies.remove("accessToken");
        localStorage.removeItem("userStore");
        setCurrentUser(null); // Đặt currentUser thành null sau khi đăng xuất
      } else {
        console.error("Logout failed:", await res.text());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <nav className={cx("header__nav")}>
      <div className={cx("header__nav-container")}>
        <div className={cx("header__support-info")}>
          <div className={cx("dropdown-help")}>
            <Link href="#">
              <span className="material-icons-outlined">help</span>
              Hỗ trợ
            </Link>
            <div className={cx("dropdown-help__content-container")}>
              <div className={cx("dropdown-help__content")}>
                <div className={cx("dropdown-help__qr-code-container")}>
                  <Image src="/imgs/qr-zalo.png" alt="help" fill />
                </div>
                <p>Quét mã QR để gửi thông tin cần hỗ trợ đến chúng tôi</p>
              </div>
            </div>
          </div>
          <Link href="#" className={cx("header__support-info__hotline")}>
            <span className="material-icons-outlined">call</span>
            Hotline: 1900 123 789
          </Link>
        </div>
        <CustomerLogo className={cx("header--mobile__logo")} white />
        <div className={cx("header__about-account")}>
          <div className={cx("dropdown-noti")}>
            <Link href="/notifications"
              className={cx("header__notifications")}>
              <span className="material-icons-outlined">notifications</span>
              Thông báo
            </Link>
            <div className={cx("dropdown-noti__content-container")}>
              <div className={cx("dropdown-noti__content")}>
                <div className={cx("dropdown-noti__unauth-user")}>
                  <div className={cx("unauth-user__img-container")}>
                    <Image src="/imgs/unauth-user.png" alt="unauth-user" fill />
                  </div>
                  <span className={cx("unauth-content__noti")}>
                    Đăng nhập để xem Thông báo
                  </span>
                </div>
                <div className={cx("unauth-content__btn")}>
                  <Link href="/login">Đăng nhập</Link>
                  <Link href="/register">Đăng ký</Link>
                </div>
              </div>
            </div>
          </div>
          {currentUser ? (
            <div className={cx("header__auth")}>
              <span className="material-icons-outlined">account_circle</span>
              <Link href="/profile" className={cx("header__auth-login")}>
                {currentUser.user_name}
              </Link>
              <form onSubmit={handleLogout}>
                <button type="submit" className={cx("header__auth-logout-btn")}>
                  Đăng xuất
                </button>
              </form>
            </div>
          ) : (
            <div className={cx("header__auth")}>
              <span className="material-icons-outlined">account_circle</span>
              <Link href="/login" className={cx("header__auth-login")}>
                Đăng nhập
              </Link>
              <span>|</span>
              <Link href="/register" className={cx("header__auth-register")}>
                Đăng ký
              </Link>
            </div>
          )}
        </div>
        <div className={cx("header--mobile__noti-support")}>
          <Link href="/notifications" className={cx("noti--mobile")}>
            <span className="material-icons-outlined" title="Thông báo">
              notifications
            </span>
          </Link>
          <Link href="#" className={cx("help--mobile")}>
            <span className="material-icons-outlined" title="Hỗ trợ">
              help
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
