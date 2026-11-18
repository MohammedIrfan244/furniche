import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    district: { type: String, required: true },
    spaceType: { type: String, default: "Living Room Residence" },
    preferredMaterial: { type: String, default: "Nilambur Teak" },
    notes: { type: String, default: "" },
    status: { type: String, default: "Pending Atelier Review" },
  },
  { timestamps: true }
);

const consultationModel =
  mongoose.models.Consultation ||
  mongoose.model("Consultation", consultationSchema);

export default consultationModel;
