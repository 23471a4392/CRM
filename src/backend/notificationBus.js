/**
 * Ledger CRM — Real-Time Notification & Event Bus
 * Dispatches real-time events across windows/tabs and local state
 * without requiring any page reload.
 */

class NotificationEventBus {
  constructor() {
    this.listeners = new Set();
    this.channel = null;

    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        this.channel = new BroadcastChannel("ledger_crm_realtime_events");
        this.channel.onmessage = (event) => {
          if (event.data) {
            this._notifyLocal(event.data);
          }
        };
      } catch (err) {
        console.warn("BroadcastChannel not available, using in-memory bus", err);
      }
    }
  }

  /**
   * Subscribe a listener callback
   * @param {Function} callback (event) => void
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Publish an event to all subscribers and cross-tab BroadcastChannel
   * @param {Object} event { type, recipientId, recipientRole, payload, timestamp }
   */
  publish(event) {
    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    };

    // Broadcast to other tabs
    if (this.channel) {
      try {
        this.channel.postMessage(enrichedEvent);
      } catch (err) {
        console.warn("Failed to broadcast message", err);
      }
    }

    // Notify local subscribers
    this._notifyLocal(enrichedEvent);
  }

  _notifyLocal(event) {
    this.listeners.forEach((callback) => {
      try {
        callback(event);
      } catch (err) {
        console.error("Error in notification listener", err);
      }
    });
  }
}

export const notificationBus = new NotificationEventBus();
