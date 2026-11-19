// IndexedDB storage utility for transferring large video files between Editor and Composer

const DB_NAME = 'HivepostlyStudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'pending_posts';

export interface PendingComposerPost {
  id: string;
  mediaBlob: Blob;
  mediaType: 'video' | 'image';
  name: string;
  caption?: string;
  timestamp: number;
}

export function savePendingPost(
  blob: Blob,
  mediaType: 'video' | 'image',
  name: string,
  caption?: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const record: PendingComposerPost = {
        id: 'latest_post',
        mediaBlob: blob,
        mediaType,
        name,
        caption,
        timestamp: Date.now(),
      };

      store.put(record);

      tx.oncomplete = () => {
        db.close();
        resolve();
      };

      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    };

    request.onerror = () => reject(request.error);
  });
}

export function getPendingPost(): Promise<PendingComposerPost | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.close();
        return resolve(null);
      }

      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get('latest_post');

      getReq.onsuccess = () => {
        const result = getReq.result as PendingComposerPost | undefined;
        if (result && result.mediaBlob) {
          // Remove consumed post so it doesn't repeatedly override user actions
          store.delete('latest_post');
          db.close();
          resolve(result);
        } else {
          db.close();
          resolve(null);
        }
      };

      getReq.onerror = () => {
        db.close();
        resolve(null);
      };
    };

    request.onerror = () => resolve(null);
  });
}
