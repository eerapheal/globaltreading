import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Button, TextInput, Alert } from "flowbite-react";
import { app } from "../fireBase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";


const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
    const [imageFileUploading, setImageFileUploading] =
    useState(null);
    const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
    const [formData, setFormData] = useState({});
const dispatch = useDispatch()

  const handleIamgeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //Image upload to firebase storage

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read, write: if request.resource.size < 2 * 1024 * 1024
    //       && request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileUploading(true)
    setImageFileUploadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // decemal removal
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadingError("Could not upload image above 2MB");
        setImageFileUploadingError(null);
        setImageFile(null);
        imageFileUrl(null);
        setImageFileUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false)
        });
      }
    );
  };

  // update data function
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value}) // Corrected
  }  
  // submit data
const handleSubmit = async (e) => {
  e.preventDefault();
  setUpdateUserError(null);
  setUpdateUserSuccess(null);
  if (Object.keys(formData).length === 0) {
    setUpdateUserError('No change made')
    return;
  };
  if (imageFileUploading) {
    setUpdateUserError('Please for for image to upload')
    return
  };
  try {
    dispatch(updateStart());
      const res = await fetch(`/api/auth/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
      }

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
        setUpdateUserError(data.message);
    }
  };

  return (
    <div className="max-w-lg w-70 mx-auto p-3">
      <h1 className="my-7 font-bold text-center">Profile</h1>
      <input
        type="file"
        accept="image/="
        onChange={handleIamgeChange}
        ref={filePickerRef}
        hidden
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div
          className="w-32 h-32 self-center relative"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover  border-5 border-[lightgray]
            ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }
            `}
          />
        </div>
        {imageFileUploadingError && (
          <Alert color="failure">{imageFileUploadingError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-700 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserSuccess && (
        <Alert color='faliure' className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
    </div>
  );
};

export default Profile;
