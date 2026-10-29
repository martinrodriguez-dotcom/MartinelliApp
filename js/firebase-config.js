// ==========================================
// js/firebase-config.js
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  "apiKey": "AIzaSyAuMKpWs0xkSq2NMwOez0SadOr3Lqcxd5I",
  "authDomain": "martinelliapp-40269.firebaseapp.com",
  "projectId": "martinelliapp-40269",
  "storageBucket": "martinelliapp-40269.firebasestorage.app",
  "messagingSenderId": "725299228269",
  "appId": "1:725299228269:web:0ee2307c32d208fad29964"
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 
window.db = db;

window.fbAdd = async (collName, data) => { 
  try { 
    return await addDoc(collection(db, collName), data); 
  } catch (e) { 
    console.error("Error agregando documento: ", e); 
  } 
};

window.fbUpdate = async (collName, idStr, data) => { 
  try { 
    await updateDoc(doc(db, collName, idStr), data); 
  } catch (e) { 
    console.error("Error actualizando documento: ", e); 
  } 
};

window.fbDelete = async (collName, idStr) => { 
  try { 
    await deleteDoc(doc(db, collName, idStr)); 
  } catch (e) { 
    console.error("Error eliminando documento: ", e); 
  } 
};

// Exportamos lo necesario para que app.js pueda inicializar la sincronización
export { db, collection, addDoc, onSnapshot, getDocs };
