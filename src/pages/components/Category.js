import React from "react";
import Link from "next/link";
import styles from "../../styles/components/Category.module.css";

const Category = ({ category, color, userId }) => {
  return (
    <Link className={styles.category} href="/[category]" as={`/${category}`}>
      <div
        style={{
          backgroundColor: color,
        }}
      ></div>
      <h1>{category}</h1>
    </Link>
  );
};

export default Category;
