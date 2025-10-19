// Firebase configuration (replace with your actual Firebase client-side config)
const firebaseConfig = {
    apiKey: "AIzaSyA2xHwMSi8S2ZhW0bOUn7P1wTN3Opr4hr8",
    authDomain: "test-notification-94710.firebaseapp.com",
    projectId: "test-notification-94710",
    storageBucket: "test-notification-94710.firebasestorage.app",
    messagingSenderId: "1081156835593",
    appId: "1:1081156835593:web:6681d831783ce25fdedbd8",
    measurementId: "G-E6LFN9PNK1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

let currentServiceWorkerRegistration = null;

// Explicitly register the service worker
document.addEventListener('DOMContentLoaded', function() {
    if ('serviceWorker' in navigator) {
        console.log('navigator.serviceWorker is available.');
        navigator.serviceWorker.register('/firebase-messaging-sw.js?v=' + Date.now(), {scope: '/'})
            .then((registration) => {
                currentServiceWorkerRegistration = registration;
                messaging.useServiceWorker(registration);
                console.log('Service Worker registered successfully.', registration);
                // Check current notification permission status after service worker registration
                if (Notification.permission === 'default') {
                    document.getElementById('request-permission').style.display = 'block';
                    document.getElementById('get-token').style.display = 'none';
                    document.getElementById('fcm-token').innerText = '';
                } else if (Notification.permission === 'granted') {
                    document.getElementById('request-permission').style.display = 'none';
                    document.getElementById('get-token').style.display = 'block';
                } else if (Notification.permission === 'denied') {
                    document.getElementById('request-permission').style.display = 'none';
                    document.getElementById('get-token').style.display = 'none';
                    document.getElementById('fcm-token').innerText = "blocked Notification";
                }
            }).catch((err) => {
                console.error('Service Worker registration failed.', err);
            });
    } else {
        console.warn('Service workers are not supported in this browser.');
    }

    document.getElementById('request-permission').addEventListener('click', requestNotificationPermission);
    document.getElementById('get-token').addEventListener('click', getAndDisplayToken);
});

function getAndDisplayToken() {
    messaging.getToken({
        vapidKey: firebaseConfig.vapidKey,
        serviceWorkerRegistration: currentServiceWorkerRegistration
    }).then((token) => {
        console.log('FCM Token:', token);
        document.getElementById('fcm-token').innerText = token;
    }).catch((error) => {
        console.error('Error getting FCM token:', error);
        document.getElementById('fcm-token').innerText = 'Error getting token: ' + error.message;
    });
}

function requestNotificationPermission() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            document.getElementById('request-permission').style.display = 'none';
            document.getElementById('get-token').style.display = 'block';
        } else if (permission === 'denied') {
            document.getElementById('get-token').style.display = 'none';
            document.getElementById('fcm-token').innerText = "blocked Notification";
        }
    });
}

// Handle incoming messages
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico'
    };

    // Display the notification on the page
    const notificationsDiv = document.getElementById('notifications');
    const newNotification = document.createElement('div');
    newNotification.className = 'alert alert-info mt-2';
    newNotification.innerHTML = `<strong>${notificationTitle}</strong><p>${payload.notification.body}</p>`;
    notificationsDiv.prepend(newNotification);

    // Show browser notification
    new Notification(notificationTitle, notificationOptions);
});