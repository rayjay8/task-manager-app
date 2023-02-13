import "@/styles/globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import MobileMenu from "./components/MobileMenu";
import {
  AuthProvider,
  UserIdProvider,
  useFetchUserId,
} from "../context/AuthContext";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function App({ Component, pageProps, userId, children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, id } = useFetchUserId();

  return (
    <UserIdProvider value={{ userId }}>
      <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      {/* {showSidebar && <Sidebar />} */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <MobileMenu showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Component {...pageProps} />
    </UserIdProvider>
  );
}
