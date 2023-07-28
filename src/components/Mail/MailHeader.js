import classes from "./MailHeader.module.css";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
const MailHeader = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("emailMC");
  const logoutHandler = () => {
    dispatch(authActions.logout());
    // history.replace("/");
  };
  return (
    <div className={classes.header}>
      <h3>Yahoo!Mail</h3>
      <div className={classes.findText}>
        <input
          type="text"
          placeholder="Find messages,documents,photos or people"
        />
        <button className={classes.searchButton}>Search</button>
      </div>

      <div className={classes.userId}>{userId}</div>
      <div>
        <button className={classes.logout} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MailHeader;
