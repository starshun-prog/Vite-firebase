import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import MenuBar from "./Basic/MenuBar";
import Complete from "./Complete";
import Form from "./Form";

const ContactForm = () => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const color = grey[900];
  return (
    <>
      <MenuBar color={color} menuTitle="お問い合わせフォーム" />
      {!isSubmitSuccessful ? (
        <Form setIsSubmitSuccessful={setIsSubmitSuccessful} />
      ) : (
        <Complete />
      )}
    </>
  );
};

export default ContactForm;
