const fs = require('fs').promises;
const path = require('path');
const { uid } = require("uid");

const contactsPath = path.resolve('./db/contacts.json');

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

        await fs.writeFile(contactsPath, JSON.stringify(contactsWithOutId, null, 2), 'utf8');

        return contactsWithOutId;
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();

        const newContact = {
            id: uid(3),
            name,
            email,
            phone,
        };

        const newData = [...contacts, newContact];

        await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), 'utf8');

        return newData;
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