import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import MenuBar from "./Basic/MenuBar";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import ChatMessages from "./ChatMessages";

const ChatRoom = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const [data, setData] = useState({});
  const [histories, setHistories] = useState([]); // 6/24追加分
  const [message, setMessage] = useState("");
  const sender = user.uid ? "担当者" : data.name;

  const headerColor = grey[900];
  const sendColor = grey[50];
  const chatBgColor = blue[200];
  const inputBgColor = blueGrey[100];

  useEffect(() => {
    const q = query(collection(db, "testSubmit"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      snapshot.docs.map(
        (doc) =>
          doc.id === id &&
          setData({
            id: doc.id,
            status: doc.data().status ? doc.data().status : "未対応",
            name: doc.data().name,
            email: doc.data().email,
            detail: doc.data().detail,
            timestamp: new Date(doc.data().timestamp.toDate()).toLocaleString(),
          })
      );
    });
    // 6/24追加分
    const m = query(
      collection(db, "testSubmit", id, "messages"),
      orderBy("timestamp", "asc")
    );
    const unSub2 = onSnapshot(m, (snapshot) => {
      setHistories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          from: doc.data().from,
          message: doc.data().message,
          timestamp: new Date(doc.data().timestamp.toDate()).toLocaleString(),
        }))
      );
    });

    return () => {
      unSub();
      unSub2(); // 6/24追加分
    };
  }, []);

  // 6/24追加分
  const sendMessage = async () => {
    await addDoc(collection(db, "testSubmit", id, "messages"), {
      from: sender,
      message: message,
      timestamp: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <>
      <MenuBar
        color={headerColor}
        menuTitle={
          <Typography variant="h1" sx={{ fontSize: "30px" }}>
            {id}のチャットルーム
          </Typography>
        }
      />
      <Box
        maxWidth="100%"
        sx={{
          maxHeight: "calc(100vh - 66.5px)", // 76.5 > 66.5
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 106px)",
            backgroundColor: chatBgColor,
            px: "20px", // 追加
            py: "20px", // 追加
            boxSizing: "border-box", // 追加
            overflowY: "auto",
          }}
        >
          {/* 6/25追加 */}
          {histories.map((history, index) => {
            const [date, time] = history.timestamp.split(" "); // timestampを日付と時間に分ける
            const preDate =
              index !== 0 && histories[index - 1].timestamp.split(" ")[0]; // indexが0じゃないとき1つ前のメッセージと日付を入れる
            return index === 0 || preDate !== date ? (
              <>
                <Box
                  textAlign="center"
                  margin="0 auto"
                  padding="10px"
                  borderRadius="48px"
                  maxWidth="150px"
                  sx={{
                    backgroundColor: "rgba(51, 51, 51, 0.3)",
                  }}
                  key={date.toString()}
                >
                  {date}
                </Box>
                <ChatMessages
                  key={history.id}
                  history={history}
                  sender={sender}
                  time={time}
                />
              </>
            ) : (
              <ChatMessages
                key={history.id}
                history={history}
                sender={sender}
                time={time}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundColor: inputBgColor,
            py: "25px",
          }}
        >
          <TextField
            variant="outlined"
            sx={{ width: "60%", mr: "20px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            sx={{ width: "40px", height: "40px" }}
            onClick={sendMessage}
          >
            <SendIcon color={sendColor} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ChatRoom;
