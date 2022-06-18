import { Box, Typography } from "@mui/material";
import styles from "./Confirm.module.css";
import React from "react";

const Confirm = ({ data }) => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'游ゴシック', '游ゴシック体'",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        入力内容
      </Typography>
      <Box>
        <label className={styles.confirm_label}>
          お名前
          <Typography>{data.name}</Typography>
        </label>
      </Box>
      <Box>
        <label className={styles.confirm_label}>
          メールアドレス
          <Typography>{data.email}</Typography>
        </label>
      </Box>
      <Box>
        <label className={styles.confirm_label}>
          パスワード
          <Typography>{data.password}</Typography>
        </label>
      </Box>
      <Box>
        <label className={styles.confirm_label}>
          お問い合わせ内容
          <Typography>{data.detail}</Typography>
        </label>
      </Box>
    </>
  );
};

export default Confirm;
