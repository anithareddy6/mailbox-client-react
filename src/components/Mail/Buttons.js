import classes from "./Buttons.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { mailActions } from "../../store/MailSlice";

const Buttons = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const unRead = useSelector((state) => state.mail.unread);
  const userId = useSelector((state) => state.auth.userId);
  const composeButtonHandler = () => {
    history.push("./composeMail");
  };
  const openInboxHandler = () => {
    dispatch(mailActions.setInboxTrue(true));
    axios
      .get(
        `https://mailbox-client-10670-default-rtdb.firebaseio.com/mails/${userId}inbox.json`
      )
      .then((res) => {
        let datas = res.data;

        let mailArray = [];
        for (let id in datas) {
          let mails = datas[id];
          mails.id = id;
          mailArray.push(mails);
        }
        dispatch(mailActions.addMail(mailArray));
      });
    history.replace("./mailBox");
  };
  const openSentMailHandler = () => {
    dispatch(mailActions.setInboxTrue(false));
    axios
      .get(
        `https://mailbox-client-10670-default-rtdb.firebaseio.com/mails/${userId}sentbox.json`
      )
      .then((res) => {
        let datas = res.data;
        let mailArray = [];
        for (let id in datas) {
          let mails = datas[id];
          mails.id = id;
          mailArray.push(mails);
        }
        dispatch(mailActions.sentMail(mailArray));
      });
    history.replace("./mailBox");
  };
  return (
    <div>
      <button className={classes.composeButton} onClick={composeButtonHandler}>
        Compose
      </button>

      <div className={classes.views}>
        <div className={classes.unread}>
          <span className={classes.inbox} onClick={openInboxHandler}>
            Inbox
          </span>
          <span>{unRead}</span>
        </div>
        <div>Unread</div>
        <div>starred</div>
        <div>Drafts</div>
        <div className={classes.sent} onClick={openSentMailHandler}>
          Sent
        </div>
        <div>Archive</div>
        <div>spam</div>
        <div>Deleted Items</div>
      </div>
      <div className={classes.views}>
        <div>views</div>
        <div>photos</div>
        <div>documents</div>
        <div>subscription</div>
        <div>deals</div>
        <div>Travel</div>
      </div>
      <div className={classes.views}>
        <div>Folders</div>
        <div>+New Folder</div>
      </div>
    </div>
  );
};

export default Buttons;
