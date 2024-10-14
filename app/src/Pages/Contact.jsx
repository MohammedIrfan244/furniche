import ContactImage from "../assets/ContactPage.jpg";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_5mpp4sr",
        "template_pv9suw1",
        formData,
        "_VNHLR1ntbZuSJLEc"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Message sent successfully");
        },
        (err) => {
          console.log("FAILED...", err);
          toast.error("Failed to send message. Please try again.");
        }
      );
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="pt-[26%] sm:pt-[8%] flex flex-col items-center px-5">
      <h1
        className="text-xl sm:text-2xl font-serif tracking-wide underline mb-8 sm:mb-14"
        style={{ textShadow: "0 0 1px #000000" }}
      >
        CONTACT US
      </h1>
      <div className="shadow-md shadow-[#000000] gap-5 sm:gap-0 flex flex-col sm:flex-row w-[100%] sm:w-[80%] md:w-[65%] overflow-hidden bg-[#544A3E] p-2 rounded-3xl">
        <div className="w-[100%] sm:w-[45%]">
          <div className="rounded-2xl flex items-end overflow-hidden h-[400px]">
            <img
              className="hover:scale-[1.01] transition duration-500 ease-in-out Logo h-[600px]"
              src={ContactImage}
              alt="image"
            />
          </div>
        </div>
        <div className="w-[100%] sm:w-[55%] flex flex-col items-center justify-between">
          <div className="mt-10 mb-5 p-5 rounded-lg text-[#544A3E] bg-[#D7D2C9]">
            <p className="">
              <FontAwesomeIcon icon={faPhone} /> +91 8987675643
            </p>
            <p className="">
              <FontAwesomeIcon icon={faEnvelope} /> settle@gmail.com
            </p>
          </div>
          <form
            onSubmit={sendMail}
            className="bg-[#D7D2C9] rounded-2xl flex flex-col py-5 gap-5 w-[100%] sm:w-[70%] items-center"
          >
            <div className="w-[90%]">
              <input
                name="name"
                value={formData.name}
                required
                onChange={(e) =>
                  setFormData({ ...formData, ["name"]: e.target.value })
                }
                className="text-xs w-full rounded-md sm:rounded-lg px-3 sm:py-1 focus:outline-none"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="w-[90%]">
              <input
                name="email"
                value={formData.email}
                required
                onChange={(e) =>
                  setFormData({ ...formData, ["email"]: e.target.value })
                }
                className="text-xs px-3 sm:py-1 w-full rounded-md sm:rounded-lg focus:outline-none"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="w-[90%]">
              <textarea
                placeholder="Your message..."
                name="message"
                value={formData.message}
                required
                onChange={(e) =>
                  setFormData({ ...formData, ["message"]: e.target.value })
                }
                className="text-xs w-full rounded-md sm:rounded-lg px-3 sm:py-1 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-[#544A3E] hover:scale-[1.02] text-[#F9FCFA] rounded-md sm:rounded-lg border-none text-xs active:scale-95 px-5 py-1 sm:py-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
