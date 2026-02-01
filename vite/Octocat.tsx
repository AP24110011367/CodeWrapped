import styles from "./styles.module.css";

export const Octocat: React.FC<{ userNotFound: boolean }> = ({
  userNotFound,
}) => {
  return userNotFound ? (
    <img
      src="/cyber-cat.png"
      alt="Cyber Cat (Sad)"
      className={styles.octocat}
      style={{ filter: "grayscale(100%)" }}
    />
  ) : (
    <img
      src="/cyber-cat.png"
      alt="Cyber Cat"
      className={styles.octocat}
    />
  );
};
