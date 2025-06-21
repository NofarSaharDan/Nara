import { v4 as uuidv4 } from "uuid";

const a = localStorage.getItem("xp_logs");
const XP_LOG_COLLECTION = Object.keys(a || {}).length > 0 ? JSON.parse(a) : [];

export class XpLog {
  static async create(logData) {
    const newLog = { id: uuidv4(), ...logData, date: new Date().toISOString() };
    XP_LOG_COLLECTION.push(newLog);
    localStorage.setItem("xp_logs", JSON.stringify(XP_LOG_COLLECTION));
    return newLog;
  }

  static async list() {
    return XP_LOG_COLLECTION;
  }

  static async filter(criteria, sortBy) {
    let logs = [...XP_LOG_COLLECTION];

    if (criteria) {
      logs = logs.filter((log) => {
        return Object.keys(criteria).every((key) => log[key] === criteria[key]);
      });
    }

    if (sortBy) {
      const field = sortBy.startsWith("-") ? sortBy.substring(1) : sortBy;
      const order = sortBy.startsWith("-") ? -1 : 1;
      logs.sort((a, b) => {
        if (a[field] < b[field]) return -1 * order;
        if (a[field] > b[field]) return 1 * order;
        return 0;
      });
    }

    return logs;
  }
}
