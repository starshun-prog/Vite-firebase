import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Complete = () => {
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
      </Grid>
    </Container>
  );
};

export default Complete;
