import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Complete = ({ setIsConfirm, setIsSubmitSuccessful, data }) => {
  const backToForm = () => {
    setIsSubmitSuccessful(false);
    setIsConfirm(false);
  };
  const [id, setId] = useState("");
  useEffect(() => {
    const q = query(collection(db, "testSubmit"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      snapshot.docs.map((doc) => {
        if (
          doc.data().name === data.name &&
          doc.data().email === data.email &&
          doc.data().detail === data.detail
        ) {
          setId(doc.id);
        }
      });
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Grid component={Paper} textAlign="center" padding="50px">
        <Typography
          variant="h2"
          sx={{
            fontSize: "40px",
          }}
        >
          送信完了
        </Typography>
        <Box sx={{ marginTop: "30px" }}>
          <Typography variant="subtitle1">
            お問い合わせありがとうございます。
          </Typography>
          <Typography variant="subtitle1">
            下記URLにて担当スタッフよりご連絡申し上げます。
          </Typography>
          <Typography variant="subtitle1">
            今しばらくお待ちください。
          </Typography>
        </Box>
        <Link to={`/${id}`}>{`http://localhost:3000/${id}`}</Link>
      </Grid>
      <Button
        variant="outlined"
        sx={{ marginTop: "50px" }}
        onClick={backToForm}
      >
        お問い合わせフォームに戻る
      </Button>
    </Container>
  );
};

export default Complete;
