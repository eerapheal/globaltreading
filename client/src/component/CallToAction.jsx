import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <section
      className="bg-gradient-to-r from-indigo-600
    via-purple-500 to-blue-500 sm:flex-row p-5 border border-blue-400 border-b-4 border-l-2 border-r-2 justify-center items-center text-center rounded-br-3xl rounded-bl-3xl"
    >
      <h1 className="p-10 text-xl sm:text-3xl text-white font-bold">
        Join our community of writers and readers spanning the globe.
      </h1>
      <div className="flex flex-col sm:flex-row  gap-10 p-5 border border-blue-400 border-b-none border-l-2 border-r-2 justify-between items-center text-center rounded-br-3xl rounded-bl-none">
        <div className="flex flex-col gap-2">
          <h2 className=" text-2xl sm:text-4xl text-orange-200 font-bold">
            Are you looking to take your brand online?
          </h2>
          <p className="text-white text-xl font-semibold">
            <span>Santtech</span> offers full-stack Website design, SEO,
            graphics, content creation, and brand awareness services with
            amazing prize
          </p>
          <Button
            outline
            className="border-none bg-gradient-to-r from-indigo-600
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
        <div className="">
          <img
            className="hidden sm:flex max-w-sm "
            src="https://t-hub.mx/storage/blog/77JSoBvBGARAVowHNqTk82hO2IF8Ln5GhPPBq5uQ.jpeg"
            alt="image"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
