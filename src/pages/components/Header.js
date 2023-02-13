import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styles from "../../styles/components/Header.module.css";
import { AuthContext, useFetchUserId } from "../../context/AuthContext";
import { unsetToken } from "../../auth";
import Head from "next/head";
import Router from "next/router";

const Header = ({ initialTime, showSidebar, setShowSidebar }) => {
  const [time, setTime] = useState(initialTime);
  const [showDropdown, setShowDropdown] = useState(false);
  const [changepfp, setChangepfp] = useState(false);
  const [border, setBorder] = useState(false);
  const [color, setColor] = useState("none");
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const [profile, setProfile] = useState(
    "/uploads/juicy_men_icon_1_f2eca458d1.png"
  );
  const { user, id } = useFetchUserId();

  const uid = Math.floor(Math.random() * 1000000000 + 1);

  useEffect(() => {
    if (border) {
      setColor("2px solid #ff69b4");
    } else {
      setColor("none");
    }
  }, [border]);

  useEffect(() => {
    if (id) {
      fetch(`http://192.168.29.217:1337/api/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.picture !== null) {
            setProfile(data.picture);
          }
        });
    }
  }, [id]);

  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({
    filePath: "/uploads/juicy_men_icon_1_f2eca458d1.png",
  });
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", file);
    console.log(formData);

    try {
      const res = await fetch(`http://192.168.29.217:1337/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setUploadedFile({ fileName: data[0].name, filePath: data[0].url });
      // send a post request to the server with the file path
      const res2 = await fetch(`http://192.168.29.217:1337/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ picture: data[0].url }),
      }).then(window.location.reload());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.header}>
      <Head></Head>
      <div className={styles.left}>
        <div className={styles.menu} onClick={toggleMenu}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <Link href="/">
          <h1>TASKKER</h1>
        </Link>
      </div>
      <div className={styles.right}>
        {user ? (
          <div className={styles.profile}>
            {profile && (
              <img
                src={`http://192.168.29.217:1337${profile}`}
                alt="Profile Picture"
                className={styles.pfp}
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setChangepfp(false);
                  setBorder(!border);
                }}
                style={{ outline: color }}
              />
            )}
            {showDropdown && (
              <ul className={styles.dropdownMenu}>
                <li>{user}</li>
                <li
                  onClick={() => {
                    !setChangepfp(!changepfp);
                  }}
                  className={styles.changepfp}
                >
                  Profile&nbsp;Picture
                </li>
                {changepfp && (
                  <form onSubmit={onSubmit}>
                    <label htmlFor="file">
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={onChange}
                        name="file"
                      />
                      {file ? <p>{file.name}</p> : <p>Custom Upload</p>}
                    </label>
                    <button
                      type="submit"
                      style={{
                        cursor: "pointer",
                        width: "100px",
                        backgroundColor: "transparent",
                        fontSize: ".8rem",
                      }}
                    >
                      Upload
                    </button>
                  </form>
                )}
                <li
                  onClick={() => {
                    unsetToken();
                  }}
                  className={styles.logout}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div>
            <Link href="/signin">
              <p className={styles.signin}>Sign in</p>
            </Link>
          </div>
        )}
        <Link href={user ? "/form" : "/signin"}>
          <button
            style={{
              cursor: "pointer",
            }}
          >
            +
          </button>
        </Link>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  );
};

Header.getInitialProps = async () => {
  return {
    initialTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

export default Header;
