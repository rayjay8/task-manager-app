import React from "react";
import styles from "../../styles/components/Loading.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import BarLoader from "react-spinners/BarLoader";
import Head from "next/head";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Head>
        <title>loading...</title>
      </Head>
      <BarLoader color={"#ff69b4"} loading={true} size={15} />
    </div>
  );
};

export default Loading;
