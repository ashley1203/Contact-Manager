import axios from 'axios';

export class ContactService {
    static serverUrl = `http://localhost:9000`

    static getAllContacts() {
        let dataUrl = `${this.serverUrl}/contacts`
        return axios.get(dataUrl);
    }

    static getContact(id) {
        let dataUrl = `${this.serverUrl}/contacts/${id}`
        return axios.get(dataUrl);
    }

    static getGroups() {
        let dataUrl = `${this.serverUrl}/groups`
        return axios.get(dataUrl);
    }

    static getGroup(contact) {
        let id = contact.groupId;
        let dataUrl = `${this.serverUrl}/groups/${id}`
        return axios.get(dataUrl);
    }

    static createContact(contact) {
        let dataUrl = `${this.serverUrl}/contacts`
        return axios.post(dataUrl, contact);
    }

    static updateContact(contact, contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`
        return axios.put(dataUrl, contact);
    }

    static deleteContact(contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`
        return axios.delete(dataUrl);
    }
}
