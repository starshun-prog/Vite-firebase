import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box } from "@mui/system";
import Confirm from "./Confirm";

const schema = yup.object({
  email: yup
    .string()
    .required("必須項目です")
    .email("正しいメールアドレスを入力してください")
    .max(200, "200文字以上入力できません"),
  name: yup
    .string()
    .required("必須項目です")
    .max(16, "16文字以上入力できません"),
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

const Form = ({ setIsSubmitSuccessful, isConfirm, setIsConfirm }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    detail: "",
  });
  const [charChout, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const sendInfo = async () => {
    await addDoc(collection(db, "testSubmit"), {
      name: data.name,
      email: data.email,
      password: data.password,
      detail: data.detail,
      timestamp: serverTimestamp(),
      status: "未対応",
    });
    setIsSubmitSuccessful(true);
  };

  const dataSetHandler = (data) => {
    console.log(data);
    setData({
      name: data.name,
      email: data.email,
      password: data.password,
      detail: data.detail,
    });
    setIsConfirm(true);
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Grid component={Paper} padding="50px">
        <Stack spacing={3}>
          {!isConfirm ? (
            <>
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
                  onChange={(e) => setCharCount(e.target.value.length)}
                />
                <FormHelperText
                  sx={{
                    textAlign: "right",
                  }}
                >{`あと${2000 - charChout}文字`}</FormHelperText>
              </Box>
            </>
          ) : (
            <Confirm data={data} />
          )}
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={!isConfirm ? handleSubmit(dataSetHandler) : sendInfo}
          >
            {!isConfirm ? "確認する" : "送信する"}
          </Button>
          {isConfirm && (
            <Button variant="outlined" onClick={() => setIsConfirm(false)}>
              入力画面に戻る
            </Button>
          )}
        </Stack>
      </Grid>
    </Container>
  );
};

export default Form;
