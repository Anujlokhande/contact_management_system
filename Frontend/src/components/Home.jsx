import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-sm uppercase text-gray-300 tracking-wide">{label}</p>
    <p className="text-md text-white font-medium mt-1">{value}</p>
  </div>
);

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [contactDetail, setContactDetail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/contacts`
        );
        if (res.status == 200) {
          setContacts(res.data);
        }
      } catch (error) {
        alert(`${error.message}`);
      }
    };
    getAllContacts();
  }, []);

  const handleDelete = async (email) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete-contact`,
        { data: { email } }
      );
      if (res.status == 200) {
        alert(`${res.data.message}`);
        setContacts((prev) =>
          prev.filter((contact) => contact.email !== email)
        );

        setContactDetail({});
      }
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <>
      <div className="bg-gray-800 w-full min-h-screen flex justify-center items-start py-6">
        <div className="w-full lg:w-3/4 bg-gray-600 rounded-xl flex flex-col lg:flex-row p-4 gap-4">
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-semibold text-white">
                All Contacts
              </span>

              <button
                onClick={() => navigate("/create")}
                className="bg-green-500 hover:bg-green-600 transition px-3 py-2 rounded-lg text-white font-semibold text-sm"
              >
                Create
              </button>
            </div>

            <div className="flex-1 rounded-xl overflow-auto scrollbar space-y-2">
              {contacts.map((contact) => (
                <div
                  key={contact.email}
                  onClick={() => setContactDetail(contact)}
                  className={`w-full flex justify-between items-center p-4 rounded-xl cursor-pointer transition
              ${
                contactDetail.email === contact.email
                  ? "bg-blue-500"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
                >
                  <p className="text-white font-medium">{contact.name}</p>
                  <p className="text-white text-sm">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-gray-700 rounded-xl p-5 overflow-auto">
            {contactDetail.email ? (
              <div className="bg-gray-600 rounded-xl p-5 space-y-4 shadow-md">
                <div className="border-b border-gray-500 pb-3">
                  <h2 className="text-xl lg:text-2xl font-bold text-white">
                    {contactDetail.name}
                  </h2>
                  <p className="text-sm text-gray-300">Contact Information</p>
                </div>

                <div className="space-y-3">
                  <DetailRow label="Email" value={contactDetail.email} />
                  <DetailRow label="Phone" value={contactDetail.phone} />
                  <DetailRow
                    label="Message"
                    value={contactDetail.message || "No message added"}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white font-semibold w-full sm:w-auto"
                    onClick={() => handleDelete(contactDetail.email)}
                  >
                    Delete Contact
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-gray-300">
                <p className="text-lg">No contact selected</p>
                <p className="text-sm opacity-70 text-center">
                  Tap on a contact to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
