import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDVheOkbRXZU-eXaJ8OXRWfZtBelLsjFnQ",//process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "capstone-dab03.firebaseapp.com",//process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "capstone-dab03",//process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "capstone-dab03.appspot.com",//process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "292620228796",//process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: "1:292620228796:web:8c33719b97efd619c158b9",//process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-9PK1LK8PZQ"//process.env.REACT_APP_FIREBASE_MEASURMENT_ID
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Auth 인스턴스 생성
const auth = getAuth(app);

// 세션 지속성을 '세션'으로 설정
auth.setPersistence(browserSessionPersistence);

export { auth, signInWithEmailAndPassword };