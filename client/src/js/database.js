import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate';

const initdb = async () => {
  try {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
          store.createIndex('content', 'content');
        } else {
          console.log('jate database already exists');
        }
      },
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.add({ content });
    await tx.done;
    console.log('Data added to the database:', content);
  } catch (error) {
    console.error('Error adding data to the database:', error);
  }
};

const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const data = await store.getAll();
    await tx.done;
    console.log('Data retrieved from the database:', data);
    return data || []; // Return an empty array if no data is found
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    return []; // Return an empty array as a fallback value
  }
};

initdb();

export { putDb, getDb };