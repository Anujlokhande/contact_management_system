import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email must be unique"],
  },
  phone: {
    type: Number,
    required: true,
    unique: [true, "Phone Must Be Unique"],
  },
  message: {
    type: String,
  },
});

export const Contact = mongoose.model("Contact", contactSchema);
