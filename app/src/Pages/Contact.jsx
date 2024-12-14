import ContactImage from "../assets/ContactPage.jpg";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { LuPhone ,LuMessageSquare} from "react-icons/lu";

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
    <div className="pt-[26%] sm:pt-[8%] flex flex-col items-center px-5">
      <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline mb-8 sm:mb-14 text-[#544A3E]">
        CONTACT US
      </h1>
      <div className="shadow-md shadow-[#000000] gap-5 sm:gap-0 flex flex-col sm:flex-row w-[100%] sm:w-[80%] md:w-[65%] overflow-hidden bg-[#544A3E] p-2 rounded-3xl">
        <div className="w-[100%] sm:w-[45%]">
          <div className="rounded-2xl flex items-end overflow-hidden h-[400px] sm:h-[500px]">
            <img
              className="hover:scale-[1.01] object-cover transition duration-500 ease-in-out Logo h-[600px] w-full sm:w-auto"
              src={ContactImage}
              alt="contact-image"
            />
          </div>
        </div>
        <div className="w-[100%] sm:w-[55%] flex flex-col items-center justify-between">
          <div className="mt-10 mb-5 p-5 rounded-lg text-[#544A3E] bg-[#D7D2C9]">
            <p className="text-sm">
              <LuPhone className="mr-2" />
              +91 8987675643
            </p>
            <p className="text-sm">
              <LuMessageSquare className="mr-2" />
              furniche@gmail.com
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
                className="text-xs w-full rounded-md sm:rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#544A3E] transition duration-300 ease-in-out"
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
                className="text-xs px-3 py-2 w-full rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#544A3E] transition duration-300 ease-in-out"
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
                className="text-xs w-full rounded-md sm:rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#544A3E] transition duration-300 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="bg-[#544A3E] hover:scale-[1.02] text-[#F9FCFA] rounded-md sm:rounded-lg border-none text-xs active:scale-95 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9FCFA] transition duration-300 ease-in-out"
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
