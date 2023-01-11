const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');
console.log("contactsPath__", contactsPath);

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const contactById = contacts.find(contact => contact.id === contactId);
        return contactById;
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        const contactsWithOutId = contacts.filter(contact => contact.id !== contactId);
        return contactsWithOutId;
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const newContact = {
            id: "11",
            name: name,
            email: email,
            phone: phone,
        }
        const data = await fs.appendFile(contactsPath, newContact, 'utf8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};