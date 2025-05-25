import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import React from "react";
import { ToastContainer } from 'react-toastify';
import "./globals.css";


export const metadata = {
  title: "GetMeAChai",
  description: "A fund rasing website for chai lovers",
};

const MemoNav = React.memo(Navbar);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className="bg-[#000000] text-white bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
        >
          <MemoNav/>
          {children}
          <ToastContainer/>
        </body>
      </SessionWrapper>
    </html>
  );
}
