import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { LuPhone, LuMessageSquare } from "react-icons/lu";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 min-h-[100vh]">
      <h1 className="text-2xl sm:text-4xl font-poppins font-bold tracking-wide text-sofaBlue mb-10">
        Contact Us
      </h1>
      <div className="flex flex-col items-center w-full sm:w-[80%] md:w-[60%] bg-[#F9FCFA] shadow-md shadow-gray-400 p-6">
        <div className="flex flex-col gap-5 w-full items-center mb-8">
          <div className="flex items-center gap-2">
            <LuPhone className="text-sofaBlue text-xl" />
            <p className="text-base text-gray-600">+91 8987675643</p>
          </div>
          <div className="flex items-center gap-2">
            <LuMessageSquare className="text-sofaBlue text-xl" />
            <p className="text-base text-gray-600">furniche@gmail.com</p>
          </div>
        </div>

        <form
          onSubmit={sendMail}
          className="w-full flex flex-col gap-5 items-center"
        >
          <input
            name="name"
            value={formData.name}
            required
            onChange={(e) =>
              setFormData({ ...formData, ["name"]: e.target.value })
            }
            className="text-sm w-[90%] sm:w-[70%] rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofaBlue transition duration-300 ease-in-out"
            type="text"
            placeholder="Your Name"
          />
          <input
            name="email"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData({ ...formData, ["email"]: e.target.value })
            }
            className="text-sm w-[90%] sm:w-[70%] rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofaBlue transition duration-300 ease-in-out"
            type="email"
            placeholder="Your Email"
          />
          <textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            required
            onChange={(e) =>
              setFormData({ ...formData, ["message"]: e.target.value })
            }
            className="text-sm w-[90%] sm:w-[70%] rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sofaBlue transition duration-300 ease-in-out"
            rows="5"
          />
          <button
            type="submit"
            className="bg-sofaBlue text-white text-sm font-medium rounded-lg px-6 py-2 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sofaBlue transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
