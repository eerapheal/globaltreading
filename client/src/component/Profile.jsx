import { useState } from "react";
import { useSelector } from "react-redux";

import { Button, TextInput } from "flowbite-react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg w-70 mx-auto p-3">
      <h1 className="my-7 font-bold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-[lightgray] border-5"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="eamil"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="sumbmit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-700 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
