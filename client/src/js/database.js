import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate';

const initdb = async () => {
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
};

const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add({ content });
  await tx.done;
  console.log('Data added to the database:', content);
};

const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const data = await store.getAll();
  await tx.done;
  console.log('Data retrieved from the database:', data);
  return data;
};

initdb();

export { putDb, getDb };
