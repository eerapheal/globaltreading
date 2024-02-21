import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div
      className="flex flex-col bg-gradient-to-r from-indigo-600
    via-purple-500 to-blue-500 sm:flex-row pl-5 border border-blue-400 border-b-4 border-l-2 border-r-2 justify-center items-center text-center rounded-tr-3xl rounded-bl-3xl"
    >
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-4xl text-orange-200 font-bold">
          Are you looking to take your brand online?
        </h2>
        <p className="text-white text-2xl font-semibold">
          <span>Santtech</span> offers full-stack Website design, SEO, graphics,
          content creation, and brand awareness services with amazing prize
        </p>
        <Button
          outline
          className="border-none w-full bg-gradient-to-r from-indigo-600
            via-purple-500 to-blue-500"
        >
          <a
            href="https://www.linkedin.com/in/ekpenisiraphael/"
            alt="@ekpenisiraphael"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to reach out to us now.
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img
          className="w-full"
          src="https://t-hub.mx/storage/blog/77JSoBvBGARAVowHNqTk82hO2IF8Ln5GhPPBq5uQ.jpeg"
          alt="image"
        />
      </div>
    </div>
  );
};

export default CallToAction;
