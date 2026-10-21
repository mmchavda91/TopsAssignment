# Session 5: Firebase Firestore & React

**Capstone Mini Project — Assignment Solutions & Complete Practical Guide (Q1 to Q5)**

---

## 📌 સત્ર સારાંશ (Session Overview)
આ Session માં આપણે **Firebase Cloud Firestore** અને **React** નું integration શીખીશું:
1. **Firestore Database Setup**: Firebase Web SDK v9/v10 Modular API નો ઉપયોગ કરીને database સાથે connect કરવું.
2. **Create Data (`addDoc`)**: Spotify Playlists અને Restaurant Review Documents create કરવા.
3. **Read Data (`getDocs`)**: BookMyShow style watchlist items Firestore માંથી fetch કરવા અને display કરવા.
4. **Update Data (`updateDoc`)**: Review ની rating અને comment edit કરીને UI તરત જ refresh કરવું.
5. **API Refactoring with AI (async/await & Error Handling)**: Promise chain વાળા code ને modern async/await અને robust try/catch માં ChatGPT દ્વારા refactor કરી live test કરવું.

---

## 📋 Table of Contents
- [Q1: Spotify Playlists Collection in Firestore](#q1-spotify-playlists-collection-in-firestore)
- [Q2: Restaurant Review Form using `addDoc()`](#q2-restaurant-review-form-using-adddoc)
- [Q3: BookMyShow Movie Watchlist using `getDocs()`](#q3-bookmyshow-movie-watchlist-using-getdocs)
- [Q4: Edit Restaurant Review Feature using `updateDoc()`](#q4-edit-restaurant-review-feature-using-updatedoc)
- [Q5: ChatGPT API Refactoring (async/await & Error Handling)](#q5-chatgpt-api-refactoring-asyncawait--error-handling)
- [🌐 Browser માં કેવી રીતે Run કરવું (How to Run in Browser)](#-browser-માં-કેવી-રીતે-run-કરવું)

---

## Q1: Spotify Playlists Collection in Firestore

### 🎯 પ્રશ્ન (Question):
> *Set up Firebase Firestore in your React app and create a new collection called 'playlists' for a Spotify-style music app. Add at least one sample playlist document with a name and an array of song titles.*

### 💡 Concept:
- **Firebase Initialization**: `initializeApp(firebaseConfig)` વડે Firebase app setup થાય છે અને `getFirestore(app)` વડે Firestore instance મળે છે.
- **Data Structure**: `playlists` કલેક્શન માં દરેક document માં playlist નું નામ (`name`) અને ગીતોની list (`songs: ["Song 1", "Song 2", ...]`) array તરીકે store થાય છે.

### 💻 Code Implementation:

#### 1. Firebase Config (`firebase.js`):
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

#### 2. Adding Sample Playlist Document:
```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function addSamplePlaylist() {
  const docRef = await addDoc(collection(db, 'playlists'), {
    name: 'Bollywood Top Hits 2024',
    songs: [
      'Kesariya (Brahmastra)',
      'Apna Bana Le (Bhediya)',
      'Chaleya (Jawan)',
      'Heeriye (Jasleen Royal, Arijit Singh)',
      'Tere Vaaste (Zara Hatke Zara Bachke)'
    ],
    genre: 'Bollywood Melodies',
    createdAt: serverTimestamp()
  });
  console.log('Sample Playlist Document created with ID:', docRef.id);
}
```

---

## Q2: Restaurant Review Form using `addDoc()`

### 🎯 પ્રશ્ન (Question):
> *Build a form in React to add a new restaurant review (restaurant name, rating, and comment) and save the data to Firestore when submitted.*  
> *Hint: Use Firestore's addDoc() method inside your form's onSubmit handler.*

### 💡 Concept:
- React માં Form ના inputs (`restaurantName`, `rating`, `comment`) ને `useState` વડે control કરવામાં આવે છે.
- Form submit થાય ત્યારે `e.preventDefault()` કરી Firestore ની `reviews` collection માં `addDoc()` દ્વારા data save થાય છે.

### 💻 Code Implementation (`Q2_RestaurantReviewForm.jsx`):
```jsx
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function RestaurantReviewForm({ onReviewAdded }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!restaurantName.trim() || !comment.trim()) {
      alert('Please fill out all fields!');
      return;
    }

    setLoading(true);
    try {
      // 🚀 Firestore's addDoc() inside onSubmit handler
      const docRef = await addDoc(collection(db, 'reviews'), {
        restaurantName: restaurantName.trim(),
        rating: Number(rating),
        comment: comment.trim(),
        createdAt: serverTimestamp()
      });

      alert(`Review saved successfully! Doc ID: ${docRef.id}`);
      setRestaurantName('');
      setRating('5');
      setComment('');
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to save review: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <input
        type="text"
        placeholder="Restaurant Name"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        required
      />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
        <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
        <option value="3">⭐⭐⭐ (3 Stars)</option>
        <option value="2">⭐⭐ (2 Stars)</option>
        <option value="1">⭐ (1 Star)</option>
      </select>
      <textarea
        placeholder="Write your review comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Submit Review (addDoc)'}
      </button>
    </form>
  );
}
```

---

## Q3: BookMyShow Movie Watchlist using `getDocs()`

### 🎯 પ્રશ્ન (Question):
> *Fetch all movie watchlist items from your Firestore 'watchlists' collection and display them in a list, showing movie name and status (watched/not watched) like BookMyShow.*

### 💡 Concept:
- `getDocs(collection(db, 'watchlists'))` નો ઉપયોગ કરીને Firestore માં રહેલા બધા watchlist documents મેળવી array માં store કરવામાં આવે છે.
- દરેક item માં `movieName` અને `status` (`'watched'` અથવા `'not watched'`) visual badges સાથે display થાય છે.

### 💻 Code Implementation (`Q3_MovieWatchlist.jsx`):
```jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function MovieWatchlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all movie watchlist items
  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'watchlists'));
      const list = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setMovies(list);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Toggle status
  const toggleStatus = async (movie) => {
    const nextStatus = movie.status === 'watched' ? 'not watched' : 'watched';
    await updateDoc(doc(db, 'watchlists', movie.id), { status: nextStatus });
    setMovies(prev => prev.map(m => m.id === movie.id ? { ...m, status: nextStatus } : m));
  };

  return (
    <div className="watchlist-container">
      <h3>🎟️ BookMyShow Watchlist ({movies.length})</h3>
      {loading ? <p>Loading...</p> : (
        <ul>
          {movies.map((m) => (
            <li key={m.id}>
              <span>{m.movieName}</span>
              <span className={`badge ${m.status === 'watched' ? 'watched' : 'unwatched'}`}>
                {m.status === 'watched' ? '✅ Watched' : '⏳ Not Watched'}
              </span>
              <button onClick={() => toggleStatus(m)}>Toggle Status</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Q4: Edit Restaurant Review Feature using `updateDoc()`

### 🎯 પ્રશ્ન (Question):
> *Implement an 'Edit Review' feature for your restaurant review app: when a user clicks an edit button, let them update their comment and rating, then save changes to Firestore.*  
> *Constraint: Use Firestore's updateDoc() method and ensure the UI updates after saving.*

### 💡 Concept:
- **`updateDoc(docRef, updateData)`**: Document ને પૂરેપૂરો overwrite કર્યા વિના ફક્ત ચોક્કસ fields (`comment`, `rating`) update કરે છે.
- **Immediate UI Update**: Save સફળ થયા પછી local state update કરવામાં આવે છે જેથી page reload કર્યા વગર UI update દેખાય.

### 💻 Code Implementation (`Q4_EditRestaurantReview.jsx`):
```jsx
import React, { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function EditReviewItem({ review, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Reference the specific document
      const reviewRef = doc(db, 'reviews', review.id);

      // 2. Call updateDoc() constraint
      await updateDoc(reviewRef, {
        rating: Number(rating),
        comment: comment.trim(),
        updatedAt: serverTimestamp()
      });

      setIsEditing(false);
      // 3. Update UI immediately
      if (onUpdated) onUpdated(review.id, { rating: Number(rating), comment: comment.trim() });
    } catch (err) {
      console.error('Error updating review:', err);
    } finally {
      setSaving(false);
    }
  };

  return isEditing ? (
    <div className="edit-box">
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : '💾 Save Changes'}</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  ) : (
    <div className="review-display">
      <h4>{review.restaurantName} — {review.rating} ⭐</h4>
      <p>"{review.comment}"</p>
      <button onClick={() => setIsEditing(true)}>✏️ Edit Review</button>
    </div>
  );
}
```

---

## Q5: ChatGPT API Refactoring (async/await & Error Handling)

### 🎯 પ્રશ્ન (Question):
> *Take an existing Firestore API call from your code (for example, the function that fetches playlists or reviews), and ask ChatGPT: “Refactor this API call with async/await and better error handling.” Paste ChatGPT’s improved version into your code and test that it works as expected.*

### 1. મૂળ કોડ (Original Code - Before):
```javascript
// જૂનો Promise-based કોડ (Basic .then() / .catch())
function fetchPlaylists(db) {
  return getDocs(collection(db, 'playlists'))
    .then((snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      return list;
    })
    .catch((error) => {
      console.log('Error:', error);
      return []; // Silent failure! Error type ખબર પડતી નથી
    });
}
```

### 2. ChatGPT ને પૂછાયેલો Prompt:
> **“Refactor this API call with async/await and better error handling.”**

### 3. ChatGPT નો સુધારેલો કોડ (Refactored Version - After):
```javascript
/**
 * Refactored Firestore API Call with async/await & Granular Error Handling
 * Generated via ChatGPT Prompt
 */
export async function fetchPlaylistsRefactored(db) {
  try {
    if (!db) {
      throw new Error("Firestore instance (db) is not initialized.");
    }

    const playlistsCol = collection(db, 'playlists');
    const querySnapshot = await getDocs(playlistsCol);

    // 1. Check for empty collections
    if (querySnapshot.empty) {
      return {
        success: true,
        data: [],
        message: "No playlists found in Firestore collection."
      };
    }

    // 2. Map data cleanly with document IDs
    const playlists = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));

    return {
      success: true,
      data: playlists,
      count: playlists.length
    };
  } catch (error) {
    // 3. User-friendly and specific error handling
    let friendlyMessage = "Failed to load playlists.";

    switch (error.code) {
      case 'permission-denied':
        friendlyMessage = "Access denied! Check your Firestore Security Rules.";
        break;
      case 'unavailable':
        friendlyMessage = "Network error: Firebase servers are currently unreachable.";
        break;
      case 'not-found':
        friendlyMessage = "Collection or document not found.";
        break;
      default:
        friendlyMessage = error.message || friendlyMessage;
    }

    return {
      success: false,
      data: [],
      error: friendlyMessage,
      errorCode: error.code || 'UNKNOWN'
    };
  }
}
```

### 4. Improvements Explained:
| Feature | Before (Original) | After (ChatGPT Improved) |
|---|---|---|
| **Syntax** | Raw `.then().catch()` chain | Clean, modern `async/await` |
| **Error Diagnosis** | Silent fallback to `[]` | Specific handling for `permission-denied`, `unavailable` |
| **Empty State** | Iterates over empty snapshot | Explicit `querySnapshot.empty` detection |
| **Return Format** | Inconsistent raw array | Structured `{ success, data, error }` contract |

---

## 🌐 Browser માં કેવી રીતે Run કરવું (How to Run in Browser)

આ assignment ને browser માં run કરવા માટે 2 ખૂબ જ સરળ રસ્તા ઉપલબ્ધ છે:

### રીત 1: સીધું ફાઇલ ડબલ-ક્લિક કરીને ખોલો (Direct File Open)
1. તમારા ફાઇલ એક્સપ્લોરર માં આ ફોલ્ડર પર જાઓ:
   `c:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Session 5`
2. **`index.html`** અથવા **`preview.html`** પર રાઇટ ક્લિક કરીને Google Chrome અથવા Microsoft Edge માં Open કરો.

### રીત 2: Local HTTP Server દ્વારા (Localhost)
Terminal / PowerShell માં run કરો:
```powershell
cd "c:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Session 5"
python -m http.server 8085
```
અને તમારા બ્રાઉઝર માં ખોલો:
👉 **`http://localhost:8085`**

---
*Created for Capstone Mini Project Assignment — Session 5 (Firebase Firestore & React)*
