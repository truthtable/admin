export default class MapObjectManager {
    constructor() {
        this.map = new Map();
    }

    // Add or update a key with merged object data
    merge(key, value) {
        const existing = this.map.get(key) || {};
        this.map.set(key, {...existing, ...value});
    }

    // Get object for a given key
    get(key) {
        return this.map.get(key) || {};
    }

    // Remove a specific key
    deleteKey(key) {
        this.map.delete(key);
    }

    // Convert map to plain object
    toObject() {
        return Object.fromEntries(this.map);
    }

    // Clear all data
    clear() {
        this.map.clear();
    }
}