import React, { useState } from "react";
import styles from "./Form.module.css";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { registerVersion } from "firebase/app";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { FirebaseApp } from 'firebase/app'

const schema = yup.object({
  email: yup
    .string()
    .required("必須項目です")
    .email("正しいメールアドレスを入力してください"),
  name: yup.string().required("必須項目です"),
  password: yup
    .string()
    .required("必須項目です")
    .min(6, "6文字以上で設定してください")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      "英字・数字・記号が最低1文字必要です"
    ),
});

const Form = () => {
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isConfirm, setIsConfirm] = useState(false);
  const [data, setData] = useState({ email: "", name: "", password: "" });

  const sendInfo = async () => {
    await addDoc(collection(db, "testSubmit"), {
      name: data.name,
      email: data.email,
      password: data.password,
      timestamp: serverTimestamp(),
    });
  };

  const dataSetHandler = (data) => {
    console.log(data);
    setData({ email: data.email, name: data.name, password: data.password });
    setIsConfirm(true);
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Stack spacing={3}>
        <TextField
          required
          label="メールアドレス"
          type="email"
          inputProps={{ readOnly: isConfirm }}
          {...register("email")}
          error={"email" in errors}
          helperText={errors.email?.message}
        />
        <TextField
          required
          label="お名前"
          type="name"
          inputProps={{ readOnly: isConfirm }}
          {...register("name")}
          error={"name" in errors}
          helperText={errors.name?.message}
        />
        <TextField
          required
          label="パスワード"
          type="password"
          inputProps={{ readOnly: isConfirm }}
          {...register("password")}
          error={"password" in errors}
          helperText={errors.password?.message}
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={!isConfirm ? handleSubmit(dataSetHandler) : sendInfo}
        >
          {!isConfirm ? "確認" : "送信"}
        </Button>
        {isConfirm && (
          <Button variant="outlined" onClick={() => setIsConfirm(false)}>
            戻る
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Form;
