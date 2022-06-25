import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { login, logout, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import Auth from "./Component/Auth";
import Admin from "./Component/Admin";
import ContactForm from "./Component/ContactForm";
import ChatRoom from "./Component/ChatRoom";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoUrl,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={user.uid ? <Admin /> : <Auth />} />
          <Route path={"/form"} element={<ContactForm />} />
          <Route path={"/:id"} element={<ChatRoom />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
