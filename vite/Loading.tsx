import { useEffect, useState } from "react";
import { RadialGradient } from "./RadialGradient";
import styles from "./styles.module.css";

const MESSAGES = [
  "Initializing launch sequence...",
  "Connecting to GitHub API...",
  "Scanning repositories...",
  "Analyzing commit history...",
  "Calculating productivity velocity...",
  "Preparing your wrap...",
];

export const Loading = () => {
  const username = window.location.pathname.split("/")[2];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reset = urlParams.get("reset");

    const apiBaseUrl = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBaseUrl}/api/stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        refreshCache: Boolean(reset),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        if (payload.error) {
          // eslint-disable-next-line no-alert
          window.alert(payload.error);
          return;
        }

        window.location.href = `/${username}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <div className={styles.container}>
      <RadialGradient />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{
            width: 160,
            filter: "drop-shadow(0 0 40px rgba(0, 243, 255, 0.6)) drop-shadow(0 0 80px rgba(125, 95, 255, 0.4))",
            animation: "pulse 2s infinite ease-in-out",
          }}
          src="/cyber-cat.png"
          alt="loading"
        />
        <div
          style={{
            width: 240,
            height: 5,
            borderRadius: 8,
            overflow: "hidden",
            background: "rgba(255,255,255,0.08)",
            marginTop: 56,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className={styles.animateProgress}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)",
              width: "100%",
              boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)"
            }}
          />
        </div>
        <p
          style={{
            marginTop: 32,
            fontFamily: "var(--font-main)",
            fontSize: 15,
            color: "var(--accent-cyan)",
            opacity: 0.9,
            textAlign: "center",
            minWidth: 300,
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          {MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
};
