const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const response = await listContacts();
        console.log("🚀 ~ listContacts: ", response);
      } catch (error) {
        const msg = new Error("Cannot conect to BD");
        console.log(msg.message);
      }

      break;

    case "get":
      try {
        const contact = await getContactById(id);
        console.log(`🚀 ~ contact whith id "${id}": `, contact);
      } catch (error) {
        console.log("🚀 ~ error:", error.message);
      }

      break;

    case "add":
      try {
        const contact = await addContact(name, email, phone);
        console.log(`🚀 ~ Sucsess added "${contact.id}:"`, contact);
      } catch (error) {
        console.log("🚀 ~ error:", error.message);
      }

      break;

    case "remove":
      try {
        const response = await removeContact(id);
        console.log(`🚀 ~ removeContact whith id "${id}": `, response);
      } catch (error) {
        console.log("🚀 ~ error:", error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
