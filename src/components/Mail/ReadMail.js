import classes from "./ReadMail.module.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const ReadMail = () => {
  const history = useHistory();
  const currentMail = useSelector((state) => state.mail.currentMail);
  const closeMailHandler = () => {
    history.replace("./mailBox");
  };
  return (
    <div className={classes.mail}>
      <div className={classes.header}>
        <div>
          <button>Archive</button>
          <button>Move</button>
          <button>Delete</button>
          <button>Spam</button>
        </div>
        <div>
          <button onClick={closeMailHandler}> X</button>
        </div>
      </div>
      <div>
        <div className={classes.to}>{currentMail.to}</div>
        <div className={classes.subject}>{currentMail.subject}</div>
        <div className={classes.message}>{currentMail.message}</div>
        <div className={classes.actions}>
          <button>Reply</button>
          <button>Forward</button>
        </div>
      </div>
    </div>
  );
};

export default ReadMail;