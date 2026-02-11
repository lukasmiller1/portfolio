import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my-projects";

let cached = (global as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}).mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  (global as typeof globalThis & { mongoose?: typeof cached }).mongoose = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!cached) {
    cached = { conn: null, promise: null };
    (global as typeof globalThis & { mongoose?: typeof cached }).mongoose = cached;
  }
  const c = cached;
  if (c.conn) {
    return c.conn;
  }

  if (!c.promise) {
    c.promise = mongoose.connect(MONGODB_URI).catch((err) => {
      c.promise = null;
      throw err;
    });
  }

  try {
    c.conn = await c.promise;
    return c.conn;
  } catch (err) {
    c.promise = null;
    throw err;
  }
}

