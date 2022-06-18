import { Box, Typography } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import React from "react";

const Status = ({ params }) => {
  const status =
    params === "未対応"
      ? red[900]
      : params === "対応中"
      ? green[900]
      : blue[900];
  return (
    <Box
      sx={{
        width: "100px",
        height: "35px",
        backgroundColor: `${status}`,
        borderRadius: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>
        {params}
      </Typography>
    </Box>
  );
};

export default Status;
