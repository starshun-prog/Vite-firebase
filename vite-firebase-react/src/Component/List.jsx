import { Box, Grid, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { COLUMNS } from "../const/COLUMNS";
import { db } from "../firebase";
import MenuBar from "./Basic/MenuBar";
import styles from "./List.module.css";

const List = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
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
      <DataGrid
        rows={posts}
        columns={COLUMNS}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </>
  );
};

export default List;
