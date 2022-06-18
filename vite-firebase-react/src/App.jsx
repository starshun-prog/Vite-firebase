import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { login, logout, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import Auth from "./Component/Auth";
import Admin from "./Component/Admin";
import Form from "./Component/Form";

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
          <Route path={"/form"} element={<Form />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
