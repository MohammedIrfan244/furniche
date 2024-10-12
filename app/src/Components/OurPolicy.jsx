import {
  faCheckCircle,
  faHandshake,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function OurPolicy() {
  return (
    <div className="flex flex-col items-center mt-[50%] sm:mt-[10%]">
      <div className="flex flex-col items-center text-center sm:flex-row justify-between sm:px-10">
        <div className="w-[70%] sm:w-[20%]">
          <FontAwesomeIcon className="sm:mt-10 text-4xl" icon={faHandshake} />
          <p className="text-l sm:text-xl">Easy Exchange</p>
          <p className="text-xs mt-2">
            We gladly accept exchanges within 30 days of purchase. To be
            eligible, items must be unused and in their original packaging.
            Please contact our customer support team to initiate your exchange.
          </p>
        </div>
        <div className="w-[70%] sm:w-[20%]">
          <FontAwesomeIcon className="mt-10 text-4xl" icon={faCheckCircle} />
          <p className="text-l sm:text-xl">7 Days Return</p>
          <p className="text-xs mt-2">
            You can return any unused product within 7 days of delivery for a
            full refund. The product must be in its original packaging, and a
            proof of purchase is required.
          </p>
        </div>
        <div className="w-[70%] sm:w-[20%]">
          <FontAwesomeIcon className="mt-10 text-4xl" icon={faHeadset} />
          <p className="text-l sm:text-xl">Customer Suppor</p>
          <p className="text-xs mt-2">
            Our customer support team is available 24/7 to assist you with any
            inquiries or issues. You can reach us through{" "}
            <Link to={"/contact"} className="text-[#544A3E] text-sm">
              email
            </Link>
            , and we strive to respond within 3 days.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
