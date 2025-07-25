// src/lib/server/db/mongo.ts

import { MongoClient, ObjectId } from 'mongodb';
import { MONGO_URI } from '$env/static/private';

// --- Connexion mutualisée ---
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// --- Initialisation du client avec reconnexion robuste ---
async function getClient(): Promise<MongoClient> {
  if (client) return client;
  if (!clientPromise) {
    // Utiliser MONGO_URI ou fallback pour développement
    const uri = MONGO_URI || 'mongodb://localhost:27017/back-dev-bfirstai';
    client = new MongoClient(uri);
    clientPromise = client.connect()
      .then(() => {
        console.log('✅ MongoDB connecté:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
        return client!;
      })
      .catch((err) => {
        console.error('[mongo.ts] ❌ Erreur connexion MongoDB:', err.message);
        client = null;
        clientPromise = null;
        throw err;
      });
  }
  return clientPromise;
}

// --- Accès aux collections ---
export async function getCollection(collectionName: string) {
  try {
    const client = await getClient();
    return client.db('back_dev_bfirstai').collection(collectionName);
  } catch (error) {
    console.error(`❌ Erreur accès collection ${collectionName}:`, error);
    throw error;
  }
}

// --- Collections principales ---
export async function getUsersCollection() {
  return getCollection('users');
}

export async function getSessionsCollection() {
  return getCollection('sessions');
}

export async function getLogsCollection() {
  return getCollection('logs');
}

// --- Fonction de test de connexion ---
export async function testConnection(): Promise<boolean> {
  try {
    const client = await getClient();
    await client.db('back_dev_bfirstai').admin().ping();
    console.log('✅ Test ping MongoDB réussi');
    return true;
  } catch (error) {
    console.error('❌ Test ping MongoDB échoué:', error);
    return false;
  }
}

// --- Fonction de connexion explicite ---
export async function connect() {
  try {
    await getClient();
    return true;
  } catch (error) {
    console.error('❌ Connexion MongoDB échouée:', error);
    return false;
  }
}

// --- Utilitaires ---
export { ObjectId };

// --- Fermeture de connexion (pour les tests) ---
export async function disconnect() {
  if (client) {
    await client.close();
    client = null;
    clientPromise = null;
    console.log('🔌 MongoDB déconnecté');
  }
}
