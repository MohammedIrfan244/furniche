import Consultation from "../models/consultationModel.js";

export const createConsultation = async (req, res) => {
  const { name, phone, email, district, spaceType, preferredMaterial, notes } =
    req.body;

  if (!name || !phone || !district) {
    return res.status(400).json({
      status: "error",
      message: "Client name, telephone contact, and Kerala district are required",
    });
  }

  const consultation = new Consultation({
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() || "",
    district: district.trim(),
    spaceType: spaceType || "Living Room Residence",
    preferredMaterial: preferredMaterial || "Nilambur Teak",
    notes: notes?.trim() || "",
    status: "Pending Atelier Review",
  });

  await consultation.save();

  res.status(201).json({
    status: "success",
    message: "Atelier consultation requested successfully",
    data: consultation,
  });
};

export const getPincodeEstimate = async (req, res) => {
  const { pin } = req.params;

  const numericPin = parseInt(pin, 10);
  if (isNaN(numericPin) || pin.length !== 6) {
    return res.status(400).json({
      status: "error",
      message: "Please specify a valid 6-digit postal pincode",
    });
  }

  // Kerala postal range: 670001 - 695615
  const isKerala = numericPin >= 670001 && numericPin <= 695615;

  let district = "Kerala Coastal Region";
  let hub = "Kochi Central Atelier Logistics";
  let businessDays = 3;

  if (numericPin >= 682000 && numericPin <= 683999) {
    district = "Ernakulam & Kochi Metro";
    hub = "Ernakulam Hub (Same-Day / Next-Day White Glove)";
    businessDays = 2;
  } else if (numericPin >= 695000 && numericPin <= 695999) {
    district = "Thiruvananthapuram Capital District";
    hub = "Trivandrum South Atelier Line";
    businessDays = 3;
  } else if (numericPin >= 673000 && numericPin <= 673999) {
    district = "Kozhikode & Malabar Coast";
    hub = "Calicut Northern Atelier Hub";
    businessDays = 3;
  } else if (numericPin >= 680000 && numericPin <= 680999) {
    district = "Thrissur Cultural Belt";
    hub = "Thrissur Logistics Line";
    businessDays = 2;
  } else if (numericPin >= 686000 && numericPin <= 686999) {
    district = "Kottayam & Kumarakom Lake Area";
    hub = "Central Travancore Hub";
    businessDays = 3;
  } else if (numericPin >= 670000 && numericPin <= 670999) {
    district = "Kannur & North Malabar";
    hub = "Kannur Atelier Route";
    businessDays = 4;
  } else if (numericPin >= 678000 && numericPin <= 678999) {
    district = "Palakkad Gateway";
    hub = "Palakkad Inland Route";
    businessDays = 3;
  } else if (numericPin >= 691000 && numericPin <= 691999) {
    district = "Kollam Port District";
    hub = "South Coast Route";
    businessDays = 3;
  } else if (numericPin >= 688000 && numericPin <= 688999) {
    district = "Alappuzha Backwaters";
    hub = "Coastal Travancore Route";
    businessDays = 3;
  } else if (numericPin >= 685000 && numericPin <= 685999) {
    district = "Idukki & High Ranges";
    hub = "Highland Specialized Route";
    businessDays = 4;
  } else if (numericPin >= 676000 && numericPin <= 676999) {
    district = "Malappuram Region";
    hub = "Malabar Express Route";
    businessDays = 3;
  } else if (numericPin >= 689000 && numericPin <= 689999) {
    district = "Pathanamthitta & Thiruvalla";
    hub = "Central Travancore Line";
    businessDays = 3;
  } else if (numericPin >= 671000 && numericPin <= 671999) {
    district = "Kasaragod Northern District";
    hub = "North Coast Corridor";
    businessDays = 4;
  } else if (!isKerala) {
    district = "National Express Tier-1 City";
    hub = "Pan-India Specialized Freight";
    businessDays = 6;
  }

  // Calculate target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + businessDays);
  const formattedDate = targetDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  res.json({
    status: "success",
    data: {
      pincode: pin,
      isKerala,
      district,
      hub,
      estimatedDeliveryDate: formattedDate,
      days: businessDays,
      service: "Complimentary White-Glove Installation Included",
    },
  });
};
