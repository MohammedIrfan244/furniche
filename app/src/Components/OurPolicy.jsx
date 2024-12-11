import {
  faCheckCircle,
  faHandshake,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

function OurPolicy() {
  return (
    <div className="flex flex-col items-center mt-[50%] sm:mt-[10%]">
      <div className="flex flex-col items-center text-center sm:flex-row justify-between sm:px-10">
        <motion.div
          className="w-[70%] sm:w-[20%]"
          initial={{ y: 30, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }} 
        >
          <FontAwesomeIcon className="sm:mt-10 text-4xl text-[#112558]" icon={faHandshake} />
          <p className="text-l sm:text-xl text-[#112558] mt-3">Easy Exchange</p>
          <p className="text-xs mt-2 text-[#333]">
            We gladly accept exchanges within 30 days of purchase. To be
            eligible, items must be unused and in their original packaging.
            Please contact our customer support team to initiate your exchange.
          </p>
        </motion.div>
        
        <motion.div
          className="w-[70%] sm:w-[20%]"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} 
        >
          <FontAwesomeIcon className="mt-10 text-4xl text-[#112558]" icon={faCheckCircle} />
          <p className="text-l sm:text-xl text-[#112558] mt-3">7 Days Return</p>
          <p className="text-xs mt-2 text-[#333]">
            You can return any unused product within 7 days of delivery for a
            full refund. The product must be in its original packaging, and a
            proof of purchase is required.
          </p>
        </motion.div>

        <motion.div
          className="w-[70%] sm:w-[20%]"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }} 
        >
          <FontAwesomeIcon className="mt-10 text-4xl text-[#112558]" icon={faHeadset} />
          <p className="text-l sm:text-xl text-[#112558] mt-3">Customer Support</p>
          <p className="text-xs mt-2 text-[#333]">
            Our customer support team is available 24/7 to assist you with any
            inquiries or issues. You can reach us through{" "}
            <Link to={"/contact"} className="text-[#544A3E] text-sm">
              email
            </Link>
            , and we strive to respond within 3 days.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default OurPolicy;
