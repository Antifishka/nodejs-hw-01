const fs = require('fs').promises;
const path = require('path');
const { uid } = require("uid");
require('colors');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);
        console.table(contacts);
        console.log(`Total contacts: ${contacts.length}`.green);
    } catch (error) {
        console.error(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);

        const contactById = contacts.find(contact => contact.id === contactId);
        console.table(contactById);
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);

        const newContact = {
            id: uid(3),
            name,
            email,
            phone,
        };
        console.table(newContact);

        const newData = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2), 'utf8');
        console.log(`Contact ${name} successfully added.`.yellow);
        return newContact;
    } catch (error) {
        console.error(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf8');
        const contacts = JSON.parse(data);

        const deletedContact = contacts.find(contact => contact.id === contactId);
        console.table(deletedContact);

        const contactsWithOutId = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(contactsWithOutId, null, 2), 'utf8');
        console.log(`Contact with id=${contactId} successfully deleted.`.blue);
        return deletedContact;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};