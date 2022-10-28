const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    throw error;
  }
};

async function getContactById(contactId) {
  try {
    const idStr =contactId.toString()
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === idStr);
    return contact ? contact : 0;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const idStr =contactId.toString()

    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => {
      return id === idStr;
    });
    if (index === -1) {
      return `No Contact whith id ${contactId} to remove`;
    }
    const removedContacts = contacts.splice(index, 1);
    const data = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, data, "utf-8");
    return removedContacts[0];
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      return `Not completed by the obligation parameters: name, email, phone`;
    }
    const contactToAdd = {
      id: uid(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    contacts.push(contactToAdd);
    const data = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, data, "utf-8");
    return contactToAdd;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
