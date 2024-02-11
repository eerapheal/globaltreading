import { Alert, Button, FileInput, TextInput, Select } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
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
          />
          <Select required>
            <option value="uncategorized">Select Category</option>
            <option value="sport">Sport</option>
            <option value="health">Health</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Life styles</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-blue-500 border-dotted p-3">
          <FileInput type="file" accept="image" required />
          <Button
            type="button"
            className="bg-gradient-to-r from-indigo-600 via-purple-500 to-orange-500 rounded-lg"
            size="sm"
            outline
          >
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write your article"
          className="h-72 mb-12"
          required
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 rounded-lg border-none"
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
