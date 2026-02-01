import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { GithubIcon } from "../../icons/GithubIcon";
import { NewRocketIcon } from "../../icons/NewRocketIcon";
import styles from "./burger.module.css";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const transition = useTransition(isOpen, {
    config: { mass: 0.5, clamp: true },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div style={style} className={styles.navWrapper}>
              <a
                target="_blank"
                href={"https://github.com/AP24110011367/CodeWrapped"}
              >
                <div className={styles.navLink}>
                  <GithubIcon width={24} height={24} />
                  Source Code
                </div>
              </a>
              <a
                target="_blank"
                href={"https://github.com/AP24110011367/CodeWrapped/blob/main/README.md"}
              >
                <div className={styles.navLink}>
                  <NewRocketIcon width={24} height={24} />
                  About Unwrapped
                </div>
              </a>
            </animated.div>
          ),
      )}
      <div className={styles.icon} onClick={() => setIsOpen((o) => !o)}>
        <div
          className={
            isOpen
              ? [styles.menui, styles.topMenu, styles.topAnimate].join(" ")
              : [styles.menui, styles.topMenu].join(" ")
          }
        />
        <div
          className={
            isOpen
              ? [styles.menui, styles.midMenu, styles.midAnimate].join(" ")
              : [styles.menui, styles.midMenu].join(" ")
          }
        />
        <div
          className={
            isOpen
              ? [styles.menui, styles.bottomMenu, styles.bottomAnimate].join(
                " ",
              )
              : [styles.menui, styles.bottomMenu].join(" ")
          }
        />
      </div>
    </>
  );
};
