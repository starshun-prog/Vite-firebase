import React from "react";
import styles from "./ChatMessages.module.css";
{
  /* 6/25追加 */
}
const ChatMessages = ({ history, sender, time }) => {
  const chatStyle =
    sender === history.from ? styles.ownMessage : styles.otherMessage; // senderの値によってstyleを変更する
  const createNewTime = (time) => {
    const [h, m, s] = time.split(":");
    const hh = h < 10 ? `0${h}` : h;
    const mm = m < 10 ? `0${m}` : m;
    return `${hh}:${mm}`;
  };
  return (
    <ul className={chatStyle}>
      <li>{history.from}</li>
      <li>{history.message}</li>
      <li>{createNewTime(time)}</li>
    </ul>
  );
};

export default ChatMessages;
