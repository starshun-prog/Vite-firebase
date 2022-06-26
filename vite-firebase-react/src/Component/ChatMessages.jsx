import { Avatar } from "@mui/material";
import React from "react";
import styles from "./ChatMessages.module.css";
{
  /* 6/25追加 */
}
const ChatMessages = ({ history, sender, time }) => {
  const chatStyle =
    sender === history.from ? styles.ownMessage : styles.otherMessage; // senderの値によってstyleを変更する
  // 秒を取り除いて桁を合わせる
  const createNewTime = (time) => {
    const [h, m, s] = time.split(":");
    const hh = h < 10 ? `0${h}` : h;
    return `${hh}:${m}`;
  };
  return (
    <ul className={chatStyle}>
      <li className={styles.chatUser}>
        <p className={styles.chatName}>{history.from}</p>
        <Avatar className={styles.chatAvatar} />
      </li>
      <li className={styles.chatbg}>
        <p className={styles.chatMessage}>{history.message}</p>
      </li>
      <li className={styles.chatTime}>{createNewTime(time)}</li>
    </ul>
  );
};

export default ChatMessages;
