import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { getDatabase, ref, set, push, remove } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.setPersistence(browserSessionPersistence);// 세션 지속성을 '세션'으로 설정

const database = getDatabase();// 데이터베이스 인스턴스 생성

const addItemToFirebase = async (item) => {
  const rulesRef = ref(database, 'rule');
  const newRuleRef = push(rulesRef);
  const ruleId = newRuleRef.key;
  
  const newItem = {
    ...item,
    id: ruleId, // 새로운 룰의 ID 자동 할당
  };
  
  await set(newRuleRef, newItem);
};

const updateItemInFirebase = async (itemId, item) => {
  const ruleRef = ref(database, `rule/${itemId}`);
  await set(ruleRef, item);
};

const deleteItemFromFirebase = async (ruleId) => {
  try {
    const ruleRef = ref(database, `rule/${ruleId}`);
    await remove(ruleRef);
  } catch (error) {
    console.error('Error deleting data from Firebase:', error);
  }
};
 
export { auth, signInWithEmailAndPassword, addItemToFirebase, updateItemInFirebase, deleteItemFromFirebase };