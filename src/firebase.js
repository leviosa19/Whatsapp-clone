import firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyBqui0zA66pbrdoZ-q7Zzbuu7CximAkRsI",
	authDomain: "whatsapp2-mern.firebaseapp.com",
	databaseURL: "https://whatsapp2-mern.firebaseio.com",
	projectId: "whatsapp2-mern",
	storageBucket: "whatsapp2-mern.appspot.com",
	messagingSenderId: "556455557245",
	appId: "1:556455557245:web:21b1d8ceb90507d5ba1914",
	measurementId: "G-NSS57VPZV0"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export {auth, provider}
export default db
