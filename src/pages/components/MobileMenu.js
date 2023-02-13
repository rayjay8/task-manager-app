import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/components/Sidebar.module.css";
import Category from "./Category";
import Link from "next/link";
const randomColor = require("randomcolor");
import { AuthContext, useFetchUserId } from "../../context/AuthContext";
import { unsetToken } from "../../auth";

const MobileMenu = ({ showSidebar, setShowSidebar }) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [add, setAdd] = useState(false);
  const [hide, setHide] = useState(true);
  const [hideAdd, setHideAdd] = useState(true);
  const [hideCancel, setHideCancel] = useState(true);

  const mobileView = {
    transform: showSidebar ? "translateX(0)" : "translateX(-100%)",
  };

  const { user, id } = useFetchUserId();

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/categories" +
          "?filters[userId][$eq]=" +
          id
      )
        .then((response) => response.json())
        .then(
          (data) => {
            setCategories(data.data);
          },
          [id]
        );
    }
  }, [id]);

  const handleVisibility = () => {
    setHide(false);
    setHideAdd(false);
    setHideCancel(false);
    setAdd(true);
  };

  const handleClick = () => {
    const category = {
      color: randomColor(),
      category: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      userId: id,
    };
    fetch(
      "http://192.168.29.217:1337/api/categories" +
        "?filters[userId][$eq]=" +
        id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            category: category.category,
            userId: id,
            color: category.color,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories([...categories, data.data]);
        setCategoryName("");
      });
    setHideAdd(true);
    setHideCancel(true);
    setHide(true);
    setAdd(false);
  };

  const handleCancel = () => {
    setHide(true);
    setHideAdd(true);
    setHideCancel(true);
    setAdd(false);
    setCategoryName("");
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <aside
      className={styles.sidebar}
      style={{
        ...mobileView,
      }}
    >
      <Link href="/">
        <button
          className={styles.titleBtn}
          style={{
            cursor: "pointer",
          }}
          onClick={closeSidebar}
        >
          <span
            className="material-icons"
            style={{
              fontSize: "22px",
              color: "#f5f5f5",
            }}
          >
            home
          </span>
          <h1 className={styles.title}>Home</h1>
        </button>
      </Link>
      <button className={styles.titleBtn}>
        <span
          className="material-icons"
          style={{
            fontSize: "20px",
            color: "#f5f5f5",
            fontWeight: "100",
          }}
        >
          category
        </span>
        <h1 className={styles.title}>Categories</h1>
      </button>
      <div className={styles.categories} onClick={closeSidebar}>
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            color={category.attributes.color}
            category={category.attributes.category}
            userId={category.attributes.userId}
          />
        ))}
      </div>
      <div className={hide ? styles.hide : styles.input}>
        <div className={styles.addCategory}>
          <div></div>
          <input
            type="text"
            placeholder="New category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            ref={(input) => input && input.focus()}
          />
        </div>
      </div>
      <div className={styles.center}>
        <button
          onClick={handleVisibility}
          className={add ? styles.hide : styles.add}
        >
          Add Category +
        </button>
        <div className={styles.row}>
          <button onClick={handleClick} className={hideAdd ? styles.hide : ""}>
            Add +
          </button>
          <button
            onClick={handleCancel}
            className={hideCancel ? styles.hide : styles.cancel}
          >
            Cancel ×
          </button>
        </div>
      </div>
      <Link href="/stats">
        <button
          className={styles.titleBtn}
          style={{
            cursor: "pointer",
          }}
          onClick={closeSidebar}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "22px",
              color: "#f5f5f5",
            }}
          >
            stacked_line_chart
          </span>
          <h1 className={styles.title}>Stats</h1>
        </button>
      </Link>
    </aside>
  );
};

export default MobileMenu;
