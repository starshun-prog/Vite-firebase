import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Status from "./Status";
import { Box, Menu, MenuItem } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailButton = ({ params }) => {
  const [open, setOpen] = React.useState(false);
  const [afterChanged, setAfterChanged] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
    console.log(params.row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveChange = async () => {
    afterChanged !== "" &&
      (await updateDoc(doc(db, "testSubmit", params.id), {
        status: afterChanged,
        timestampUpdate: serverTimestamp(),
      }));
    setAfterChanged("");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        詳細
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              ID「{params.id}」の詳細情報
            </Typography>
            <Button
              autoFocus
              variant="contained"
              color="secondary"
              onClick={saveChange}
            >
              保存する
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box
              maxWidth="300px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button {...bindTrigger(popupState)}>
                      <Status params={params.row.status} />
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          setAfterChanged("未対応");
                          popupState.close();
                        }}
                      >
                        <Status params="未対応" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAfterChanged("対応中");
                          popupState.close();
                        }}
                      >
                        <Status params="対応中" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAfterChanged("対応済");
                          popupState.close();
                        }}
                      >
                        <Status params="対応済" />
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
              {afterChanged !== "" && (
                <>
                  <Typography
                    sx={{
                      fontSize: "36px",
                      lineHeight: "35px",
                      padding: "6px",
                    }}
                  >
                    →
                  </Typography>
                  <Button>
                    <Status params={afterChanged} />
                  </Button>
                </>
              )}
            </Box>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="ID" secondary={params.id} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="お名前" secondary={params.row.name} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="メールアドレス"
              secondary={params.row.email}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="お問い合わせ内容"
              secondary={params.row.detail}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="お問い合わせ日時"
              secondary={params.row.timestamp}
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
};
export default DetailButton;
