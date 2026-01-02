import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContacts,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/contacts").get(getContacts);

router.route("/create-contact").post(createContact);
router.route("/delete-contact").delete(deleteContact);

export default router;
