import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import List from "./List";

const Admin = () => {
  return (
    <>
      <List />
    </>
  );
};

export default Admin;
