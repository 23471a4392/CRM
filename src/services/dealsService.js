/**
 * Deals service — CRUD operations for deals.
 *
 * Mirrors the contacts service pattern. Currently scaffolded for
 * future API integration; the app still runs on localStorage today.
 */

import api from './apiClient.js';

const RESOURCE = '/deals';

const STAGES = ['Lead', 'Contacted', 'Proposal', 'Won', 'Lost'];

const dealsService = {
  /**
   * Fetch all deals.
   * @returns {Promise<Array>}
   */
  async getAll() {
    return api.get(RESOURCE);
  },

  /**
   * Fetch a single deal by ID.
   * @param {string} id
   * @returns {Promise<object>}
   */
  async getById(id) {
    return api.get(`${RESOURCE}/${id}`);
  },

  /**
   * Create a new deal.
   * @param {object} data — deal fields (title, contactId, value, stage, closeDate, notes)
   * @returns {Promise<object>} — the created deal
   */
  async create(data) {
    return api.post(RESOURCE, data);
  },

  /**
   * Update an existing deal.
   * @param {string} id
   * @param {object} data — fields to update
   * @returns {Promise<object>} — the updated deal
   */
  async update(id, data) {
    return api.put(`${RESOURCE}/${id}`, data);
  },

  /**
   * Delete a deal by ID.
   * @param {string} id
   * @returns {Promise<null>}
   */
  async remove(id) {
    return api.delete(`${RESOURCE}/${id}`);
  },

  /**
   * Move a deal to a new pipeline stage.
   * @param {string} id
   * @param {string} stage — one of STAGES
   * @returns {Promise<object>}
   */
  async updateStage(id, stage) {
    if (!STAGES.includes(stage)) {
      throw new Error(`Invalid stage "${stage}". Must be one of: ${STAGES.join(', ')}`);
    }
    return api.patch(`${RESOURCE}/${id}`, { stage });
  },

  /**
   * Fetch deals filtered by stage.
   * @param {string} stage
   * @returns {Promise<Array>}
   */
  async getByStage(stage) {
    return api.get(`${RESOURCE}?stage=${encodeURIComponent(stage)}`);
  },

  /**
   * Fetch deals for a specific contact.
   * @param {string} contactId
   * @returns {Promise<Array>}
   */
  async getByContact(contactId) {
    return api.get(`${RESOURCE}?contactId=${encodeURIComponent(contactId)}`);
  },

  /** Available pipeline stages */
  STAGES,
};

export default dealsService;
