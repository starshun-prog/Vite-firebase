import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "./feature/userSlice"
import { auth } from "./firebase"
import Auth from "./Auth";
import Admin from "./Admin";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photoUrl: authUser.photoUrl,
          displayName: authUser.displayName,
        }))
      } else {
        dispatch(logout());
      }
    })
    return () => {
      unSub();
    }
  }, [dispatch])
  return (
    <>
      {
        user.uid ? (
          <Admin />
        ) : (
          <Auth />
        )
      }
    </>
  )
}

export default App;