import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Footers = () => {
  return (
    <Footer container>
      <div className="w-full border border-t-transparent border-b-2 p-5 border-cyan-500">
        <div className="grid w-full gap-5 justify-around sm:flex sm:justify-around md:flex md:grid-cols-1">
          <div className="mb-6 sm:mb-auto flex-1">
            <Link
              to="/"
              className=" 
text-sm sm:text-xl font-bold dark:text-white"
            >
              <div className="px-2 py-1 flex items-center">
                <img
                  className="w-[55px] h-[55px]"
                  src="/images/GT.png"
                  alt="Global Treadings Logo"
                />
                <span className=" px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-orange-500 rounded-lg text-white">
                  Global Treadings
                </span>
              </div>
            </Link>
            <p className="text-sm mt-5">
              Global Treadings: Your Passport to Worldwide Blogging. Join our
              community of writers and readers spanning the globe. Share your
              stories, explore diverse perspectives, and connect with
              like-minded individuals. Unleash your creativity and join the
              conversation on Global Treadings today!
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Our Team</Footer.Link>
                <Footer.Link href="#">Write For Us</Footer.Link>
                <Footer.Link href="#">Global Treadings</Footer.Link>
                <Footer.Link href="#">Website Design</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="social icon"
                >
                  {" "}
                  Facebook
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="social icon"
                >
                  Twitter
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="social icon"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="social icon"
                >
                  YouTube
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="social icon"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="hidden sm:flex flex-col">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/privacy-Policy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms-conditions">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center  justify-around">
          <Footer.Copyright
            href="#"
            by=" Global Treadings™"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              alt="social icon"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              alt="social icon"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              alt="social icon"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              alt="social icon"
              icon={BsYoutube}
            />
            <Footer.Icon
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              alt="social icon"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footers;
