import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AuthForm from './components/AuthForm';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState([]);

  const fetchNotes = async (uid) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${uid}/notes`));
      setNotes(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      alert('Error fetching notes: ' + error.message);     
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotes(user.uid);
    } else {
      setNotes([]);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  }

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Signup failed: ' + error.message);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setNotes([]);
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  }

  const addNote = async () => {
    if (key && value && user) {
      try {
        await addDoc(collection(db, `users/${user.uid}/notes`), { key, value });
        setKey('');
        setValue('');
        await fetchNotes(user.uid);
      } catch (error) {
        alert('Error adding note: ' + error.message);
      }
    }
  }

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/notes`, id));
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      alert("Error deleting note: " + error.message);
    }
  }

  if (!user) {
    return (
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
      />
    )
  }

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <h3>QuickNotes</h3>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <div>
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <strong>{note.key}</strong>: {note.value}
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;