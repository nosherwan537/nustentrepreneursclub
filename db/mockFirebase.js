// Mock user data
const mockUsers = new Map();
const mockEvents = new Map();
let currentUser = null;

// Mock Firebase Auth
export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(currentUser);
    return () => {}; // Cleanup function
  },
  signOut: async () => {
    currentUser = null;
    return Promise.resolve();
  }
};

// Mock Firestore
export const mockFirestore = {
  collection: (name) => ({
    add: (data) => {
      const id = Math.random().toString(36).substr(2, 9);
      if (name === 'events') {
        mockEvents.set(id, { id, ...data });
      }
      return Promise.resolve({ id });
    }
  }),
  doc: (_, id) => ({
    set: (data) => {
      mockUsers.set(id, data);
      return Promise.resolve();
    },
    get: () => Promise.resolve({
      exists: () => mockUsers.has(id) || mockEvents.has(id),
      data: () => mockUsers.get(id) || mockEvents.get(id)
    }),
    update: (data) => {
      const existing = mockEvents.get(id) || {};
      mockEvents.set(id, { ...existing, ...data });
      return Promise.resolve();
    }
  })
};

// Mock Firebase App
export const mockApp = {
  name: '[DEFAULT]'
};

// Mock Firebase functions
export const mockFirebase = {
  getApps: () => [],
  getApp: () => mockApp,
  initializeApp: () => mockApp,
  getAuth: () => mockAuth,
  getFirestore: () => mockFirestore,
  createUserWithEmailAndPassword: async (auth, email, password) => {
    const uid = Math.random().toString(36).substr(2, 9);
    currentUser = { uid, email };
    return Promise.resolve({ user: currentUser });
  },
  signInWithEmailAndPassword: async (auth, email, password) => {
    // For testing, allow any email/password
    const uid = Math.random().toString(36).substr(2, 9);
    currentUser = { uid, email };
    return Promise.resolve({ user: currentUser });
  },
  collection: () => mockFirestore.collection,
  doc: () => mockFirestore.doc,
  getDoc: () => mockFirestore.doc().get(),
  setDoc: () => mockFirestore.doc().set(),
  updateDoc: () => mockFirestore.doc().update(),
  arrayUnion: (item) => item // Simplified array union operation
}; 