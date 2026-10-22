# 📘 Redux Core Concepts Assignment Answers (Spotify Playlist App)

**Course:** React & Redux Capstone Mini Project  
**Topic:** Redux Actions, Reducer Functions, Store Initialization, React-Redux Integration & Immutability  
**Project Folder:** `Redux core concepts`  
**Live URL:** `http://localhost:3012`  
**Date:** October 2026  

---

## 📋 Table of Contents (અનુક્રમણિકા)

1. [Q1: Redux Action Creator — addSong](#q1)
2. [Q2: Reducer Function — playlistReducer & Sample Testing](#q2)
3. [Q3: createStore Setup & Dispatching 'Kesariya' and 'Shape of You'](#q3)
4. [Q4: React-Redux Integration — Provider & useSelector](#q4)
5. [Q5: Refactoring for removeSong (filter method) & Remove Button](#q5)
6. [🚀 Terminal Commands to Run the App (ટર્મિનલમાં કેવી રીતે રન કરવું)](#run-terminal)
7. [🎧 Spotify Player UI & Feature Walkthrough (બ્રાઉઝરમાં કેવી રીતે વાપરવું)](#browser-walkthrough)

---

## 🏗️ Redux Architecture Flowchart (Spotify Playlist)

```
+-----------------------------------------------------------------------------------------+
|                                    USER INTERACTION                                     |
|  [ Input Box / Quick Suggestions ] ---> Clicks "+ Add to Playlist" or "🗑️ Remove"      |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                                     ACTION CREATOR                                      |
|  • addSong("Kesariya")    --> { type: "ADD_SONG", payload: "Kesariya" }                 |
|  • removeSong("Kesariya") --> { type: "REMOVE_SONG", payload: "Kesariya" }              |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v store.dispatch(action)
+-----------------------------------------------------------------------------------------+
|                                      REDUX STORE                                        |
|  Initializes: createStore(playlistReducer)                                             |
|  Dispatches: 'Kesariya' & 'Shape of You'                                               |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v passes (currentState, action)
+-----------------------------------------------------------------------------------------+
|                                    playlistReducer                                      |
|  switch (action.type) {                                                                 |
|    case ADD_SONG:    return [...state, action.payload];                                 |
|    case REMOVE_SONG: return state.filter(song => song !== action.payload);              |
|  }                                                                                      |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v notifies subscribers
+-----------------------------------------------------------------------------------------+
|                                    REACT COMPONENT                                      |
|  <Provider store={store}>                                                               |
|    const playlist = useSelector(state => state);                                        |
|    // Renders updated playlist table automatically!                                     |
|  </Provider>                                                                            |
+-----------------------------------------------------------------------------------------+
```

---

<a id="q1"></a>
## Q1 — Redux Action Creator: `addSong`

> **Question:**  
> *Create a Redux action called addSong that takes a song name as payload and returns an action object. Use this action to represent adding a new song to a playlist, similar to how Spotify lets you add tracks.*

### 1.1 Technical Explanation (ટેકનિકલ સમજૂતી):
Redux માં **Action** એ સાદો JavaScript ઓબ્જેક્ટ છે જેમાં ઓછામાં ઓછું એક `type` પ્રોપર્ટી હોવી જરૂરી છે જે દર્શાવે છે કે કઈ ક્રિયા થવાની છે. **Payload** એ ડેટા છે જે એક્શન સાથે મોકલવામાં આવે છે.
- `addSong` એ એક Action Creator ફંક્શન છે જે ગીતનું નામ (`songName`) સ્વીકારે છે અને `{ type: 'ADD_SONG', payload: songName }` ઓબ્જેક્ટ રિટર્ન કરે છે, જે સ્પોટિફાઈમાં "Add to playlist" ફીચર જેવું કામ કરે છે.

### 1.2 `actions.js` કોડ:

```javascript
// src/actions.js

// ૧. Action Type Constant
export const ADD_SONG = 'ADD_SONG';

// ૨. addSong Action Creator
export const addSong = (songName) => {
  return {
    type: ADD_SONG,
    payload: songName
  };
};

// ઉદાહરણ વપરાશ:
console.log(addSong('Kesariya'));
// Returns: { type: 'ADD_SONG', payload: 'Kesariya' }
```

---

<a id="q2"></a>
## Q2 — Reducer Function: `playlistReducer` & Sample Testing

> **Question:**  
> *Write a reducer function named playlistReducer that takes the current playlist array and an action, and returns a new playlist with the added song when it receives the addSong action. Test your reducer with a sample action object.*

### 2.1 Technical Explanation (ટેકનિકલ સમજૂતી):
Redux માં **Reducer** એક Pure Function હોવું જોઈએ. તે ક્યારેય મૂળ એરેમાં ફેરફાર (`push` કે `splice`) કરતું નથી, પરંતુ JavaScript ના Spread Operator (`[...]`) નો ઉપયોગ કરીને નવો એરે રિટર્ન કરે છે જેથી React રી-રેન્ડરિંગ યોગ્ય રીતે થાય.

### 2.2 `playlistReducer.js` કોડ:

```javascript
// src/playlistReducer.js
import { ADD_SONG } from './actions';

const initialPlaylist = [];

export function playlistReducer(state = initialPlaylist, action) {
  switch (action.type) {
    case ADD_SONG:
      // નવો એરે રિટર્ન કરો જેમાં પાછલું સ્ટેટ અને નવું ગીત ઉમેરાયેલું હોય (Immutability)
      return [...state, action.payload];

    default:
      return state;
  }
}
```

### 2.3 સેમ્પલ એક્શન ટેસ્ટિંગ (Testing with a Sample Action Object):

```javascript
// ટેસ્ટિંગ સ્ક્રિપ્ટ:
const currentPlaylist = ['Tum Hi Ho'];
const sampleAction = addSong('Apna Bana Le');

const updatedPlaylist = playlistReducer(currentPlaylist, sampleAction);

console.log('--- Sample Reducer Test Output ---');
console.log('Previous State:', currentPlaylist);
console.log('Action Dispatched:', sampleAction);
console.log('Updated State:', updatedPlaylist);

// Expected Console Output:
// Previous State: ['Tum Hi Ho']
// Action Dispatched: { type: 'ADD_SONG', payload: 'Apna Bana Le' }
// Updated State: ['Tum Hi Ho', 'Apna Bana Le']
```

---

<a id="q3"></a>
## Q3 — Redux Store Setup & Dispatching 'Kesariya' and 'Shape of You'

> **Question:**  
> *Set up a Redux store using createStore from redux, and initialize it with your playlistReducer. Dispatch two addSong actions to add 'Kesariya' and 'Shape of You' to the playlist, then log the updated state.*

### 3.1 Technical Explanation (ટેકનિકલ સમજૂતી):
Redux લાઈબ્રેરીનું `createStore` ફંક્શન સમગ્ર એપ્લિકેશનનું સેન્ટ્રલ સ્ટેટ મેનેજ કરતો સ્ટોર બનાવે છે.
- `store.dispatch(action)` દ્વારા આપણે એક્શનને સ્ટોરમાં મોકલીએ છીએ.
- `store.getState()` દ્વારા આપણે વર્તમાન સ્ટેટ જોઈ શકીએ છીએ.

### 3.2 `store.js` કોડ & એક્ઝિક્યુશન:

```javascript
// src/store.js
import { createStore } from 'redux';
import { playlistReducer } from './playlistReducer';
import { addSong } from './actions';

// ૧. Store બનાવવો
const store = createStore(playlistReducer);

// ૨. 'Kesariya' અને 'Shape of You' ઉમેરવા બે addSong actions ડિસ્પેચ કરવી
store.dispatch(addSong('Kesariya'));
store.dispatch(addSong('Shape of You'));

// ૩. અપડેટ થયેલું સ્ટેટ કન્સોલમાં લોગ કરવું
console.log('Updated Redux Playlist State:', store.getState());
```

### 3.3 કન્સોલ આઉટપુટ (Console Output):
```javascript
Updated Redux Playlist State: [
  "Kesariya",
  "Shape of You"
]
```

---

<a id="q4"></a>
## Q4 — React-Redux Integration: `Provider` & `useSelector`

> **Question:**  
> *Integrate your Redux store with a simple React component using react-redux's Provider and useSelector. Display the list of songs in the playlist on the page, updating automatically when new songs are added.*

### 4.1 Technical Explanation (ટેકનિકલ સમજૂતી):
- **`Provider`**: React ના કોમ્પોનન્ટ ટ્રીની આસપાસ રેપ થાય છે અને તમામ ચાઈલ્ડ કોમ્પોનન્ટ્સને Redux Store નો એક્સેસ આપે છે.
- **`useSelector`**: Redux સ્ટોરના સ્ટેટમાંથી ડેટા મેળવવા માટે વપરાતો કસ્ટમ React Hook છે. જ્યારે પણ સ્ટેટ બદલાય છે, ત્યારે `useSelector` આ કોમ્પોનન્ટને આપમેળે રી-રેન્ડર કરે છે!

### 4.2 React Component કોડ (`PlaylistApp.jsx`):

```jsx
// src/PlaylistApp.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSong } from './actions';

export default function PlaylistApp() {
  // ૧. useSelector દ્વારા Redux સ્ટેટમાંથી playlist મેળવવી
  const playlist = useSelector((state) => state);
  const dispatch = useDispatch();
  const [songName, setSongName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (songName.trim()) {
      dispatch(addSong(songName.trim()));
      setSongName('');
    }
  };

  return (
    <div className="spotify-playlist-container">
      <h2>🎵 Spotify My Playlist ({playlist.length} songs)</h2>

      {/* ગીત ઉમેરવાનું ફોર્મ */}
      <form onSubmit={handleAdd}>
        <input 
          type="text" 
          value={songName} 
          onChange={(e) => setSongName(e.target.value)} 
          placeholder="Enter song name..." 
        />
        <button type="submit">+ Add Song</button>
      </form>

      {/* ૨. પેજ પર ગીતોનું લિસ્ટ ડિસ્પ્લે કરવું */}
      <ul className="song-list">
        {playlist.map((song, index) => (
          <li key={index}>
            <span>{index + 1}. {song}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 4.3 `index.js` માં `Provider` સાથે રેપ કરવું:

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import PlaylistApp from './PlaylistApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PlaylistApp />
  </Provider>
);
```

---

<a id="q5"></a>
## Q5 — Refactoring for `removeSong` (`filter` method) & 'Remove' Button

> **Question:**  
> *Refactor your playlistReducer to support a removeSong action that deletes a song by its name. Update your React component to dispatch removeSong when a user clicks a 'Remove' button next to a song.*  
> *Hint: Use the filter method in your reducer to remove the song from the playlist array.*

### 5.1 `removeSong` Action Creator:

```javascript
// src/actions.js
export const REMOVE_SONG = 'REMOVE_SONG';

export const removeSong = (songName) => ({
  type: REMOVE_SONG,
  payload: songName
});
```

### 5.2 Refactored `playlistReducer.js` (using `filter` method):

```javascript
// src/playlistReducer.js
import { ADD_SONG, REMOVE_SONG } from './actions';

export function playlistReducer(state = [], action) {
  switch (action.type) {
    case ADD_SONG:
      if (state.includes(action.payload)) return state; // ડુપ્લિકેટ અટકાવો
      return [...state, action.payload];

    case REMOVE_SONG:
      // Hint મુજબ filter method નો ઉપયોગ કરીને તે ગીત સિવાયના તમામ ગીતોનો નવો એરે રીટર્ન કરવો
      return state.filter(song => song !== action.payload);

    default:
      return state;
  }
}
```

### 5.3 React Component માં 'Remove' બટન ઉમેરવું:

```jsx
// લિસ્ટમાં દરેક ગીતની બાજુમાં 'Remove' બટન
<ul className="song-list">
  {playlist.map((song, index) => (
    <li key={song} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{index + 1}. {song}</span>

      {/* Remove Button જે removeSong એક્શન ડિસ્પેચ કરે છે */}
      <button 
        onClick={() => dispatch(removeSong(song))}
        className="btn-remove"
      >
        🗑️ Remove
      </button>
    </li>
  ))}
</ul>
```

---

<a id="run-terminal"></a>
## 🚀 Terminal Commands to Run the App (ટર્મિનલમાં કેવી રીતે રન કરવું)

તમારી PowerShell અથવા Command Prompt ટર્મિનલમાં નીચે મુજબના કમાન્ડ ચલાવો:

### સ્ટેપ ૧: `Redux core concepts` ફોલ્ડરમાં જાઓ
```powershell
cd "c:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Redux core concepts"
```

### સ્ટેપ ૨: સર્વર ચાલુ કરો
```powershell
node server.js
```
અથવા:
```powershell
npm start
```

### સ્ટેપ ૩: કન્સોલમાં સફળતાનો મેસેજ દેખાશે:
```text
=============================================================
🎵 Redux Core Concepts (Spotify Playlist App) running at:
👉 http://localhost:3012
=============================================================
```

હવે તમારા બ્રાઉઝરમાં **[`http://localhost:3012`](http://localhost:3012)** ખોલો.

---

<a id="browser-walkthrough"></a>
## 🎧 Spotify Player UI & Feature Walkthrough (બ્રાઉઝરમાં કેવી રીતે વાપરવું)

જ્યારે તમે `http://localhost:3012` ઓપન કરશો:

1. **Q3 Initial Tracks (Kesariya & Shape of You):**
   - પેજ ખુલતાં જ Redux Store માં 'Kesariya' અને 'Shape of You' પહેલેથી જ લોડ થયેલા દેખાશે.
2. **Q1 & Q4 Add Song Features:**
   - ઉપરના સર્ચ/ઇનપુટ બોક્સમાં ગીતનું નામ લખીને **`+ Add to Playlist`** બટન દબાવો.
   - નીચે 'Quick Add Suggestions' માંથી "Blinding Lights", "Starboy", "Chaleya" કે "Levitating" પર ક્લિક કરીને ૧-ક્લિકમાં ગીત ઉમેરી શકાય છે.
3. **Q5 Remove Song Button:**
   - દરેક ગીતની જમણી બાજુ લાલ રંગનું **`🗑️ Remove`** બટન આપેલું છે. ક્લિક કરતાં જ તે ગીત `filter()` મેથડ દ્વારા Redux સ્ટેટમાંથી રીમુવ થઈ જશે!
4. **Spotify Bottom Music Player Bar:**
   - નીચે સ્પોટિફાઈ-સ્ટાઈલ પ્લેયર બાર છે જેમાં વર્તમાન ગીત, આલ્બમ આર્ટ, એનિમેટેડ ઓડિયો વેવ બાર્સ (Equalizer), Play/Pause બટન અને Redux State ટ્રેકર દેખાશે.
5. **Redux State Logs Tab:**
   - ટોપ હેડરમાં **`⚡ Redux State Logs`** ટેબ દબાવવાથી તમામ ડિસ્પેચ થયેલી એક્શન્સ અને `store.getState()` નું લાઈવ JSON ટ્રી જોઈ શકાય છે!
