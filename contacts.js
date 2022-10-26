const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

const read = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    const msg = new Error("Cannot conect to BD");
    throw msg;
  }
};

async function listContacts() {
  try {
    const data = await read();
    return data;
  } catch (error) {
    throw "";
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await read();
    const contact = contacts.filter(({ id }) => id === `${contactId}`)[0];
    if (!contact) {
      const msg = new Error(`Can't find contact whith id "${contactId}"`);
      throw msg;
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await read();
    const newContacts = contacts.reduce((acc, item) => {
      if (item.id !== `${contactId}`) {
        return [...acc, item];
      }
      return acc;
    }, []);

    if (newContacts.length === contacts.length) {
      const msg = new Error(`No Contact whith id ${contactId} to remove`);
      throw msg;
    }
    const data = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, data, "utf-8");
    return `Sucsess remove contact by id ${contactId}`;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactToAdd = {
      id: uid(),
      name,
      email,
      phone,
    };
    if (!name || !email || !phone) {
      const msg = new Error(
        `Not completed by the obligation parameters: name, email, phone`
      );
      throw msg;
    }
    const contacts = await read();
    const updateContacts = [...contacts, contactToAdd];
    const data = JSON.stringify(updateContacts);
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
