/**
 * HTTP client wrapper for the Ledger CRM API.
 *
 * Provides a thin abstraction over `fetch` with:
 *  - base URL prefixing
 *  - automatic JSON serialization / deserialization
 *  - timeout support
 *  - consistent error handling
 *
 * Currently the app runs entirely on localStorage; this module is
 * scaffolded so the migration to a real API backend is painless.
 */

const DEFAULT_BASE_URL = 'http://localhost:3000/api';
const DEFAULT_TIMEOUT = 30_000;

class ApiClient {
  /**
   * @param {object} opts
   * @param {string} [opts.baseUrl]  — API base URL
   * @param {number} [opts.timeout] — request timeout in ms
   */
  constructor({ baseUrl, timeout } = {}) {
    this.baseUrl = (baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.timeout = timeout || DEFAULT_TIMEOUT;
  }

  /**
   * Generic request helper.
   *
   * @param {string} path     — URL path relative to baseUrl (e.g. `/contacts`)
   * @param {object} options  — fetch options + `timeout`
   * @returns {Promise<any>}
   */
  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const body = await response.text();
        throw new ApiError(response.status, response.statusText, body);
      }

      // 204 No Content
      if (response.status === 204) return null;

      return response.json();
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new ApiError(0, 'Request Timeout', `Request to ${url} timed out after ${this.timeout}ms`);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /** GET helper */
  get(path, options) {
    return this.request(path, { method: 'GET', ...options });
  }

  /** POST helper */
  post(path, body, options) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /** PUT helper */
  put(path, body, options) {
    return this.request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /** PATCH helper */
  patch(path, body, options) {
    return this.request(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /** DELETE helper */
  delete(path, options) {
    return this.request(path, { method: 'DELETE', ...options });
  }
}

/**
 * Structured API error.
 */
class ApiError extends Error {
  /**
   * @param {number} status
   * @param {string} statusText
   * @param {string} body
   */
  constructor(status, statusText, body) {
    super(`API ${status} ${statusText}: ${body}`);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export { ApiClient, ApiError };
export default new ApiClient();
