import { Contact } from "../models/contact.model.js";

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All Feilds Are Required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message: message || undefined,
    });

    res.status(201).json({ message: "Contact Saved Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save contact",
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while getting all contacts" });
  }
};

const deleteContact = async (req, res) => {
  const { email } = req.body;
  try {
    const deletedContact = await Contact.findOneAndDelete({ email });

    res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { createContact, getContacts, deleteContact };
