import { Button } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../fireBase';
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app)
  const { loading} = useSelector((state) => state.user);

  const handleGoogleClick = async () => {
const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' });

try {
const resultsFromGoogle = await signInWithPopup(auth, provider)

const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: resultsFromGoogle.user.displayName,
    email: resultsFromGoogle.user.email,
    googlePhotoUrl: resultsFromGoogle.user.photoURL,
  }),
});

const data = await res.json();

if (data.success === false) {
  dispatch(signInFailure(data.message));
}

if (!res.ok) {
  dispatch(signInFailure(data.message));
} else {
  dispatch(signInSuccess(data));
  navigate("/");
}

} catch (error) {
console.log(error)
}
  }

    return (
        <Button type="button"  gradientDuoTone="purpleToBlue" onClick={handleGoogleClick}>
          <AiFillGoogleCircle className="w-6 h-6 mr-2" />
          Continue with Gmail
        </Button>
      );
}

export default Oauth;
