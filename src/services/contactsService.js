/**
 * Contacts service — CRUD operations for contacts.
 *
 * This module provides a consistent API interface for contact operations.
 * Currently delegates to localStorage; will switch to the real API backend
 * once it is available.
 */

import api from './apiClient.js';

const RESOURCE = '/contacts';

const contactsService = {
  /**
   * Fetch all contacts.
   * @returns {Promise<Array>}
   */
  async getAll() {
    return api.get(RESOURCE);
  },

  /**
   * Fetch a single contact by ID.
   * @param {string} id
   * @returns {Promise<object>}
   */
  async getById(id) {
    return api.get(`${RESOURCE}/${id}`);
  },

  /**
   * Create a new contact.
   * @param {object} data — contact fields (name, company, email, phone, notes)
   * @returns {Promise<object>} — the created contact
   */
  async create(data) {
    return api.post(RESOURCE, data);
  },

  /**
   * Update an existing contact.
   * @param {string} id
   * @param {object} data — fields to update
   * @returns {Promise<object>} — the updated contact
   */
  async update(id, data) {
    return api.put(`${RESOURCE}/${id}`, data);
  },

  /**
   * Delete a contact by ID.
   * @param {string} id
   * @returns {Promise<null>}
   */
  async remove(id) {
    return api.delete(`${RESOURCE}/${id}`);
  },

  /**
   * Search contacts by query string.
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async search(query) {
    return api.get(`${RESOURCE}?q=${encodeURIComponent(query)}`);
  },
};

export default contactsService;
