import { Alert, Button, FileInput, TextInput, Select } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireBase";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      setImageFileUploadError("Please select an image");
      if (!file) {
        return;
      }
      setImageFileUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Error uploading image: " + error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImageFileUploadProgress(null);
              setImageFileUploadError(null);
              setFormData({ ...formData, image: downloadURL });
            })
            .catch((error) => {
              setImageFileUploadError(
                "Error getting download URL: " + error.message
              );
            });
        }
      );
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      if (data.success === false) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        navigate(`/post/${data.slug}`);
      } else {
        setPublishError("Failed to create post");
      }
    } catch (error) {
      setPublishError("An error occurred");
    }
  };

  return (
    <div className="p3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-bold">Create post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            required
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select Category</option>
            <option value="sport">Sport</option>
            <option value="health">Health</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Life styles</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-blue-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="">
            <Button
              type="button"
              className="bg-gradient-to-r from-indigo-600 via-purple-500 to-orange-500 rounded-lg relative"
              size="sm"
              outline
              onClick={handleUploadImage}
              disabled={imageFileUploadProgress}
            >
              {imageFileUploadProgress ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircularProgressbar
                      value={imageFileUploadProgress}
                      text={`${imageFileUploadProgress || 0}%`}
                      strokeWidth={5}
                    />
                  </div>
                  <span className="z-10">Uploading</span>
                </>
              ) : (
                "Upload image"
              )}
            </Button>
          </div>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-60 object-cover"
          />
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write your article"
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          className=" mb-5 bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 rounded-lg border-none"
        >
          Publish
        </Button>
        {publishError && (
          <Alert className="mb-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
