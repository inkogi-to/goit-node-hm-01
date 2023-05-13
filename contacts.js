const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};


const getContactById = async (contactId) => {
  const contact = await listContacts();
  const res = contact.find((item) => item.id === contactId);
  return res || null;
};


const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};


const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid().toString(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
