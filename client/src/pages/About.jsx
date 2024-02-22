import { useState } from "react";
import { Button, Modal } from "flowbite-react";

const About = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-blue-500 p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-6 md:mb-0">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Global Treadings
        </h1>
        <p className="text-white text-lg lg:text-xl mb-6">
          Your Passport to Worldwide Blogging. Join our community of writers and
          readers spanning the globe. Share your stories, explore diverse
          perspectives, and connect with like-minded individuals. Unleash your
          creativity and join the conversation on Global Treadings today!
        </p>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full shadow hover:bg-blue-400 hover:text-white focus:outline-none focus:shadow-outline"
        >
          Join Now
        </button>
      </div>
      <div className="md:w-1/2">
        <img
          src="https://www.googobits.com/wp-content/uploads/2018/06/writers-office.jpg"
          alt="Global Treadings"
          className="rounded-lg shadow-md"
        />
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header>
          <Modal.Body>
            <form className="mt-8 mb-8">
              <div className="flex flex-col items-center justify-center gap-6">
                <input
                  type="text"
                  placeholder="Registered username"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Current Country"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Registered Email"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Age"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <select
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option disabled selected>
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <textarea
                  placeholder="Tell us what you know about content copyright "
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  required
                />
                <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow hover:bg-blue-400 hover:text-white focus:outline-none focus:shadow-outline">
                  Submit
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default About;
