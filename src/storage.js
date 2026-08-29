// Thin wrapper around localStorage so the rest of the app deals with a
// small, consistent async API rather than calling localStorage directly.
// Swapping the backing store later (e.g. a real API) only means editing
// this file.

const NAMESPACE = "ledger-crm";

function keyFor(key) {
  return `${NAMESPACE}:${key}`;
}

export async function get(key) {
  try {
    const raw = window.localStorage.getItem(keyFor(key));
    if (raw === null) return null;
    return { key, value: raw };
  } catch (err) {
    throw new Error(`storage.get failed for "${key}": ${err.message}`);
  }
}

export async function set(key, value) {
  try {
    window.localStorage.setItem(keyFor(key), value);
    return { key, value };
  } catch (err) {
    throw new Error(`storage.set failed for "${key}": ${err.message}`);
  }
}

export async function remove(key) {
  try {
    window.localStorage.removeItem(keyFor(key));
    return { key, deleted: true };
  } catch (err) {
    throw new Error(`storage.remove failed for "${key}": ${err.message}`);
  }
}

export async function getJSON(key, fallback) {
  const res = await get(key);
  if (!res) return fallback;
  try {
    return JSON.parse(res.value);
  } catch {
    return fallback;
  }
}

export async function setJSON(key, value) {
  return set(key, JSON.stringify(value));
}
