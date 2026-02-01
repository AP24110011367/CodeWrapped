import { Link } from "@tanstack/react-router";
import { PrivateContributionsIcon } from "../../../icons/PrivateContributionsIcon";
import { UserIcon } from "../../../icons/UserIcon";
import { signInWithGitHubLink } from "../../sign-in-with-github";
import { FurtherAction } from "./FurtherAction";
import styles from "./styles.module.css";

export const FurtherActions: React.FC = () => {
  if (window.__USER__ === "not-found") {
    return;
  }

  return (
    <div className={styles.furtherActionsWrapper}>
      <div className={styles.furtherActionsButtonContainer}>
        <Link to="/">
          <FurtherAction
            icon={(params) => <UserIcon {...params} width={15} />}
            label="Generate Wrapped for another User"
          />
        </Link>
      </div>
    </div>
  );
};
