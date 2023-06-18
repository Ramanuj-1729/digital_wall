// db.js

const DB_NAME = 'myDatabase';
const DB_VERSION = 1;
const OBJECT_STORE_NAME_1 = 'boardDataBase';
const OBJECT_STORE_NAME_2 = 'postDataBase';


let db;

export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION) ||
            window.mozIndexedDB.open(DB_NAME, DB_VERSION) ||
            window.webkitIndexedDB.open(DB_NAME, DB_VERSION) ||
            window.msIndexedDB.open(DB_NAME, DB_VERSION) ||
            window.shimIndexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Failed to open the database', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            console.log('Database opened successfully!');
            db = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create an board store if it doesn't exist
            if (!db.objectStoreNames.contains(OBJECT_STORE_NAME_1)) {
                db.createObjectStore(OBJECT_STORE_NAME_1, { keyPath: 'id', autoIncrement: true });
            }
            // Create an post store if it doesn't exist
            if (!db.objectStoreNames.contains(OBJECT_STORE_NAME_2)) {
                db.createObjectStore(OBJECT_STORE_NAME_2, { keyPath: 'id', autoIncrement: true });
            }

        };
    });
};

export const addBoard = (data) => {
    const transaction = db.transaction([OBJECT_STORE_NAME_1], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_1);

    return new Promise((resolve, reject) => {
        const request = objectStore.add(data);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error('Failed to add data', event.target.error);
            reject(event.target.error);
        };
    });
};

export const addPost = (data) => {
    const transaction = db.transaction([OBJECT_STORE_NAME_2], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_2);

    return new Promise((resolve, reject) => {
        const request = objectStore.add(data);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error('Failed to add data', event.target.error);
            reject(event.target.error);
        };
    });
};

export const getAllBoard = () => {
    const transaction = db.transaction([OBJECT_STORE_NAME_1], 'readonly');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_1);

    return new Promise((resolve, reject) => {
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error('Failed to retrieve data', event.target.error);
            reject(event.target.error);
        };
    });
};

export const getAllPost = () => {
    const transaction = db.transaction([OBJECT_STORE_NAME_2], 'readonly');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_2);

    return new Promise((resolve, reject) => {
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error('Failed to retrieve data', event.target.error);
            reject(event.target.error);
        };
    });
};

export const updateBoard = (id, newData) => {
    const transaction = db.transaction([OBJECT_STORE_NAME_1], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_1);

    return new Promise((resolve, reject) => {
        const getRequest = objectStore.get(id);

        getRequest.onsuccess = (event) => {
            const existingData = event.target.result;

            if (existingData) {
                const updatedData = { ...existingData, ...newData };
                const updateRequest = objectStore.put(updatedData);

                updateRequest.onsuccess = () => {
                    resolve(updatedData);
                };

                updateRequest.onerror = (event) => {
                    console.error('Failed to update data', event.target.error);
                    reject(event.target.error);
                };
            } else {
                reject(new Error(`Data with ID ${id} does not exist`));
            }
        };

        getRequest.onerror = (event) => {
            console.error('Failed to retrieve data', event.target.error);
            reject(event.target.error);
        };
    });
};

export const updatePost = (id, newData) => {
    const transaction = db.transaction([OBJECT_STORE_NAME_2], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_2);

    return new Promise((resolve, reject) => {
        const getRequest = objectStore.get(id);

        getRequest.onsuccess = (event) => {
            const existingData = event.target.result;

            if (existingData) {
                const updatedData = { ...existingData, ...newData };
                const updateRequest = objectStore.put(updatedData);

                updateRequest.onsuccess = () => {
                    resolve(updatedData);
                };

                updateRequest.onerror = (event) => {
                    console.error('Failed to update data', event.target.error);
                    reject(event.target.error);
                };
            } else {
                reject(new Error(`Data with ID ${id} does not exist`));
            }
        };

        getRequest.onerror = (event) => {
            console.error('Failed to retrieve data', event.target.error);
            reject(event.target.error);
        };
    });
};


export const deleteBoard = (id) => {
    const transaction = db.transaction([OBJECT_STORE_NAME_1], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_1);

    return new Promise((resolve, reject) => {
        const request = objectStore.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            console.error('Failed to delete data', event.target.error);
            reject(event.target.error);
        };
    });
};

export const deletePost = (id) => {
    const transaction = db.transaction([OBJECT_STORE_NAME_2], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME_2);

    return new Promise((resolve, reject) => {
        const request = objectStore.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            console.error('Failed to delete data', event.target.error);
            reject(event.target.error);
        };
    });
};