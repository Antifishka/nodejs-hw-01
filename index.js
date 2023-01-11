const action = require('./contacts.js');

// async function getList() {
//     const contacts = await action.listContacts();
//     console.table(contacts);
// }
// getList();

// async function getContact(id) {
//     const contactById = await action.getContactById(id);
//     console.table(contactById);
// }
// getContact("2");

// async function deleteContact(id) {
//     const contacts = await action.removeContact(id);
//     console.table(contacts);
// }
// deleteContact("5");

async function appendContact(name, email, phone) {
    const contacts = await action.addContact(name, email, phone);
    console.table(contacts);
}
appendContact("Anna", "anna@gmail.com", "09999999");

