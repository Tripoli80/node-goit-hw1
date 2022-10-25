const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

const todo = (call, msg) =>
  fs
    .readFile(contactsPath, "utf-8")
    .then(JSON.parse)
    .then(call)
    .then(() => {
      if (msg) console.log(msg);
    })
    .catch(console.log);

function listContacts() {
  todo(console.log);
}

function getContactById(contactId) {
  const search = (contacts) => {
    const contact = contacts.filter(({ id }) => id === `${contactId}`)[0];
    if (contact) {
      console.log("🚀 ~ contact by ID", contact);
    } else throw `Can not fins contact whith id ${contactId}`;
  };

  todo(search);
}

function removeContact(contactId) {
  removeContact = (contacts) => {
    const newContacts = contacts.filter(({ id }) => id !== `${contactId}`);
    if (newContacts.length === contacts.length) {
      throw `No Contact whith id ${contactId}`;
    }
    data = JSON.stringify(newContacts);
    fs.writeFile(contactsPath, data, "utf-8");
  };
  const msg = `Sucsess remove contact by id ${contactId}`;
  todo(removeContact, msg);
}

function addContact(name, email, phone) {
  const contactToAdd = {
    id: uid(),
    name,
    email,
    phone,
  };

  const adding = (contacts) => {
    if (!name || !email || !phone) {
      throw "Not completed by the obligation parameters: name, email, phone ";
    }
    contacts.push(contactToAdd);
    data = JSON.stringify(contacts);
    fs.writeFile(contactsPath, data, "utf-8");
  };

  const msg = `Sucsess added contact whitht ${contactToAdd.id}`;

  todo(adding, msg);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
