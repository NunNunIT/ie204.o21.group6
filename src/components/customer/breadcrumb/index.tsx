"use client";

// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

// import css
import styles from "./breadcrumb.module.css";

const cx = classNames.bind(styles);

const decryptNamePage = (namePage: string, prevNamePage: string) => {
  const data = {
    " ": { text: "Trang chủ", url: "/" },
    "news": { text: "Tin tức", url: "/news" },
    "account": { text: "Tài khoản" },
    "information": { text: "Thông tin cá nhân", url: "/account/information" },
    "purchase-history": { text: "Lịch sử đơn hàng", url: "/account/purchase-history" },
    "change-password": { text: "Đổi mật khẩu", url: "/account/change-password" },
    "search-result": { text: "Kết quả tìm kiếm" },
    "cart": { text: "Giỏ hàng", url: "/cart" },
    "order-information": { text: "Đặt hàng", url: "/order-information" },
    "review": { text: "Đánh giá sản phẩm" },
  }

  if (prevNamePage == " ") {
    return { text: "Chi tiết sản phẩm" };
  }

  if (!data[namePage] && data[prevNamePage]) {
    return { text: `Chi tiết ${data[prevNamePage].text.toLowerCase()}` }
  }

  return data[namePage];
}

export default function Breadcrumb() {
  const pathName: string = " " + usePathname();
  const namePage: string[] = pathName.split("/");
  let data = [{ text: "Trang chủ", url: "/" }];
  for (let i = 1; i < namePage.length; ++i) {
    data.push(decryptNamePage(namePage[i], namePage[i - 1]));
  }

  return (
    <Suspense fallback={<>Đang nạp dữ liệu</>}>
      <nav className={cx("breadcrumb__container")}>
        <ul className={cx("breadcrumb")}>
          {/* <li>{data.map(d => d.text).join("-")}</li> */}
          {data.map((d, index: number) => (
            <li key={index}>
              {d.url
                ? <Link href={d.url}>{d.text}</Link>
                : <span>{d.text}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </Suspense>
  )
}