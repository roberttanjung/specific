import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Silakan definisikan variabel lingkungan MONGODB_URI di dalam file .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      // INDIKATOR SUKSES
      console.log('🚀 [Database] Berhasil terhubung ke MongoDB!');
      return mongoose;
    }).catch((error) => {
      // INDIKATOR GAGAL
      console.error('❌ [Database] Gagal terhubung ke MongoDB:', error);
      throw error;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;