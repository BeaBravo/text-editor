import { openDB } from 'idb';

//using idb for indexeddb
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      // db.createObjectStore('jate');
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  if (content !== null) {
  // console.log("Post to jate",content);
  const jateDb = await openDB("jate",1);
  const tx = jateDb.transaction("jate", 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({content: content});
  const result = await request;
  console.log("Data saved to the db", result);
}
  // if (err) {console.error('putDb not implemented')};
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from jate db");
  const jateDb = await openDB("jate",1);
  const tx = jateDb.transaction("jate", 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  if (result.length === 0 ) {
    console.log("nothing in the db");
    return;
  }
  console.log("All results", result);
  if (result.length > 0) {
    //grab the last element of the array 
    const lastEl = result[result.length-1]
    return lastEl.content;
  }
  // return result;
}

initdb();
