importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyA2xHwMSi8S2ZhW0bOUn7P1wTN3Opr4hr8",
    authDomain: "test-notification-94710.firebaseapp.com",
    projectId: "test-notification-94710",
    storageBucket: "test-notification-94710.firebasestorage.app",
    messagingSenderId: "1081156835593",
    appId: "1:1081156835593:web:6681d831783ce25fdedbd8",
    measurementId: "G-E6LFN9PNK1",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();