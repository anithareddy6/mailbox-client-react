import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/MailSlice";
import { useHistory } from "react-router-dom";
import classes from "./MailList.module.css";
const MailList = (props) => {
  console.log(props.id);
  const userId = useSelector((state) => state.auth.userId);
  const inbox = useSelector((state) => state.mail.inbox);
  const dispatch = useDispatch();
  const history = useHistory();
  const readMessageHandler = () => {
    if (inbox) {
      axios
        .put(
          `https://mailbox-client-10670-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`,
          {
            to: props.to,
            subject: props.subject,
            message: props.message,
            isRead: true,
            id: props.id,
          }
        )
        .then((res) => {
          console.log(props.id);
          dispatch(
            mailActions.updateMail({
              key: props.id,
              to: props.to,
              subject: props.subject,
              message: props.message,
              isRead: true,
              id: props.id,
            })
          );
        })
        .catch((err) => alert(err));
    } else {
      dispatch(
        mailActions.updateMail({
          key: props.id,
          to: props.to,
          subject: props.subject,
          message: props.message,
          isRead: false,
          id: props.id,
        })
      );
    }
    history.push("./readMail");
  };
  const deleteMailHandler = () => {
    axios
      .delete(
        `https://mailbox-client-10670-default-rtdb.firebaseio.com/mails/${userId}inbox/${props.id}.json`
      )

      .then((res) => {
        dispatch(mailActions.deleteMail(props.id));
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div className={classes.list}>
        <div className={classes.symbolTo} onClick={readMessageHandler}>
          {!props.isRead && <div className={classes.circle} />}
          <div className={classes.to}>{props.to}</div>
        </div>
        <div className={classes.subject}>{props.subject}</div>
        <div className={classes.delete}>
          <button onClick={deleteMailHandler}>Delete</button>
        </div>
      </div>
    </>
  );
};
export default MailList;
