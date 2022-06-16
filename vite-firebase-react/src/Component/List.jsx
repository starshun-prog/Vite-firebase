import { Box, Grid, Paper } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import MenuBar from "./Basic/MenuBar";
import styles from "./List.module.css";

const List = () => {
  const [posts, setPosts] = useState([
    {
      name: "",
      email: "",
      timestamp: "",
    },
  ]);
  useEffect(() => {
    const q = query(collection(db, "testSubmit"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          timestamp: new Date(
            doc.data().timestamp.toDate()
          ).toLocaleDateString(),
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <>
      <MenuBar />
      <Grid
        container
        component="main"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid item sm={8} component={Paper}>
          <h1>一覧</h1>
          <Box component="table">
            <thead>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>タイムスタンプ</th>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className={styles.list}>
                  <td>{post.name}</td>
                  <td>{post.email}</td>
                  <td>{post.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default List;
