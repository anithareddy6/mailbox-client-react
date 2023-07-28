import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";

import classes from "./ComposeMail.module.css";
import { mailActions } from "../../store/MailSlice";
const ComposeMail = () => {
  const recieverIdRef = useRef();
  const subjectRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const editorState = EditorState.createEmpty();
  let message;
  const onEditorStateChange = (event) => {
    message = event.getCurrentContent().getPlainText();
    // console.log(message);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const recieverId = recieverIdRef.current.value;
    const subject = subjectRef.current.value;
    const reciever = recieverId.replace(/[@,.]/g, "");
    localStorage.setItem("reciever", reciever);

    const mailDetails = {
      to: recieverId,
      subject: subject,
      message: message,
    };

    axios.post(
      `https://mailbox-client-10670-default-rtdb.firebaseio.com/mails/${userId}sentbox.json`,
      mailDetails
    );
    axios
      .post(
        `https://mailbox-client-10670-default-rtdb.firebaseio.com/mails/${reciever}inbox.json`,
        mailDetails
      )

      .then((res) => {
        alert("Message sent successfully");
        dispatch(
          mailActions.addMailToList({
            to: recieverId,
            subject: subject,
            message: message,
            isRead: false,
            id: res.data.name,
          })
        );
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={classes.mailBox}>
      <form onSubmit={submitHandler}>
        <div className={classes.reciever}>
          <p>To</p>
          <input type="text" id="toAddress" required ref={recieverIdRef} />
        </div>
        <div className={classes.subject}>
          <input
            placeHolder="subject"
            type="text"
            id="subject"
            ref={subjectRef}
          />
        </div>
        <div className={classes.footer}>
          <div>
            <button className={classes.sendButton}>send</button>
          </div>
          <div>
            <Editor
              EditorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName={classes.wrapper}
              editorClassName={classes.editor}
              toolbarClassName={classes.toolBar}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;
