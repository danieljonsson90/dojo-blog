import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyAAJHVTaHuViqa1RfSwFml_qdv6mEdvVvY',
  authDomain: 'vue-firebase-sites-8ff16.firebaseapp.com',
  projectId: 'vue-firebase-sites-8ff16',
  storageBucket: 'vue-firebase-sites-8ff16.firebasestorage.app',
  messagingSenderId: '43770433806',
  appId: '1:43770433806:web:240ae68c409984456a875f',
};

//init firebase
const app = initializeApp(firebaseConfig);

export default app;
