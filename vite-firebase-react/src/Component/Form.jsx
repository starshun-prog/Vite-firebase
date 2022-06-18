import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import {
  Button,
  Container,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/system";
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
  detail: yup
    .string()
    .required("必須項目です")
    .max(2000, "2000文字いないで入力してください"),
});

const Form = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [charChout, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      email: "",
      name: "",
      password: "",
      detail: "",
    });
    setIsConfirm(false);
  }, [isSubmitSuccessful]);

  const sendInfo = async (data) => {
    await addDoc(collection(db, "testSubmit"), {
      name: data.name,
      email: data.email,
      password: data.password,
      detail: data.detail,
      timestamp: serverTimestamp(),
    });
  };

  const charCountHandler = () => {
    const values = getValues("detail");
    const len = values.length;
    setCharCount(len);
  };

  const dataSetHandler = () => {
    const values = getValues();
    console.log(values);
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
        <Box>
          <TextField
            fullWidth
            required
            label="お問い合わせ内容"
            multiline
            rows={6}
            inputProps={{ readOnly: isConfirm }}
            {...register("detail")}
            error={"detail" in errors}
            helperText={errors.detail?.message}
            onChange={charCountHandler}
          />
          <FormHelperText
            sx={{
              textAlign: "right",
            }}
          >{`あと${2000 - charChout}文字`}</FormHelperText>
        </Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={!isConfirm ? dataSetHandler : handleSubmit(sendInfo)}
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
