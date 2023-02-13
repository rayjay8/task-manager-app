import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { useState, useEffect, useRef } from "react";
import Loading from "./components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(true);
  const [opacity, setOpacity] = useState(0);

  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  useEffect(() => {
    setTimeout(() => {
      setTime(false);
    }, 200);
  });

  return (
    <div>
      {loading ? <Loading></Loading> : null}
      <div className={styles.container}>
        <Head>
          <title>Taskker</title>
          <meta name="description" content="Task management app " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Content></Content>
      </div>
    </div>
  );
}
