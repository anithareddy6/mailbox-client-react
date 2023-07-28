import MailHeader from "./MailHeader";
import Buttons from "./Buttons";
import classes from "./MailBox.module.css";
import MailList from "./MailList";
import { useSelector } from "react-redux";
const MailBox = () => {
  const mails = useSelector((state) => state.mail.mails);
  console.log(mails);
  const mailList = mails.map((mail) => (
    <MailList
      key={mail.id}
      subject={mail.subject}
      to={mail.to}
      id={mail.id}
      message={mail.message}
      isRead={mail.isRead}
    />
  ));
  return (
    <div>
      <MailHeader />
      <div className={classes.main}>
        <div className={classes.buttons}>
          <Buttons />
        </div>
        <div className={classes.list}> {mailList}</div>
      </div>
    </div>
  );
};

export default MailBox;
