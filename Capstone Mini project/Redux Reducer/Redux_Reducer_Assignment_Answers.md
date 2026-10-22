# 📘 Redux Reducer Assignment Answers (Cart, Wishlist & Redux-Thunk)

**Course:** React & Redux Capstone Mini Project  
**Topic:** Redux Store, Reducers, Actions, combineReducers, Redux-Thunk & Redux DevTools  
**Project Folder:** `Redux Reducer`  
**Live URL:** `http://localhost:3010`  
**Date:** October 2026  

---

## 📋 Table of Contents (અનુક્રમણિકા)

1. [Q1: Redux Store Setup & cartReducer (Array of Shopping Cart Items)](#q1)
2. [Q2: Redux Actions (addToCart, removeFromCart) & ProductCard Component](#q2)
3. [Q3: combineReducers (cartReducer & wishlistReducer)](#q3)
4. [Q4: Redux-Thunk Middleware & Async fetchOffers (setTimeout Mock API)](#q4)
5. [Q5: Redux DevTools Extension Setup & Tracking State Changes](#q5)
6. [🚀 Terminal Commands to Run the App (ટર્મિનલમાં કેવી રીતે રન કરવું)](#run-terminal)
7. [🛒 Browser Walkthrough & Feature Guide (બ્રાઉઝરમાં કેવી રીતે વાપરવું)](#browser-walkthrough)

---

## 🏗️ Redux Store Architecture Overview

```
+-----------------------------------------------------------------------------------------+
|                                      REDUX STORE                                        |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  |                  Middlewares: [ redux-thunk, Redux DevTools Compose ]             |  |
|  +-----------------------------------------------------------------------------------+  |
|                                            |                                            |
|                                            v                                            |
|  +-----------------------------------------------------------------------------------+  |
|  |                     combineReducers( { cart, wishlist, offers } )                 |  |
|  |                                                                                   |  |
|  |   +-----------------------+   +---------------------------+   +----------------+  |  |
|  |   |      cartReducer      |   |      wishlistReducer      |   |  offersReducer |  |  |
|  |   |-----------------------|   |---------------------------|   |----------------|  |  |
|  |   | [ { id, name, price,  |   | [ { id, name, price,      |   | { items: [],   |  |  |
|  |   |     quantity, image }]|   |     image } ]             |   |   loading: T/F |  |  |
|  |   +-----------------------+   +---------------------------+   |   error: null }|  |  |
|  |                                                               +----------------+  |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
       ^                                                                           |
       |  dispatch(action)                                                         v UI Render
+-----------------------------------------------------------------------------------------+
|                                    REACT COMPONENTS                                     |
|  [ ProductCard ]  --> Buttons: "+ Add to Cart" (addToCart) & "- Remove" (removeFromCart) |
|  [ Shopping Cart] --> Real-time count, item quantity stepper (+ / -), Total calculation |
|  [ Wishlist Tab ] --> Favorite items toggle (❤️ / 🤍)                                    |
|  [ Offers Banner] --> Thunk Async Button: "Dispatch fetchOffers()"                       |
|  [ DevTools Log ] --> Live visual stream of actions & state diffs                       |
+-----------------------------------------------------------------------------------------+
```

---

<a id="q1"></a>
## Q1 — Redux Store Setup & cartReducer (Array of Shopping Cart Items)

> **Question:**  
> *Set up a Redux store in a new React app and create a reducer called cartReducer that manages an array of items representing a shopping cart.*

### 1.1 Technical Explanation (ટેકનિકલ સમજૂતી):
Redux માં `reducer` એ એક **Pure Function** છે જે વર્તમાન સ્ટેટ (`state`) અને ક્રિયા (`action`) લે છે અને કોઈ પણ પ્રકારના સાઇડ-ઇફેક્ટ વિના નવું સ્ટેટ રીટર્ન કરે છે.

આપણા `cartReducer` નું ઇનિશિયલ સ્ટેટ એક ખાલી એરે `[]` છે.
- જ્યારે `ADD_TO_CART` એક્શન આવે: જો પ્રોડક્ટ પહેલેથી જ કાર્ટમાં હોય, તો તેની માત્રા (`quantity`) માં ૧ નો વધારો થશે (`quantity + 1`). જો નવો પ્રોડક્ટ હોય, તો તે એરેમાં `{ ...payload, quantity: 1 }` તરીકે ઉમેરાશે.
- જ્યારે `REMOVE_FROM_CART` એક્શન આવે: `filter()` મેથડ દ્વારા તે `id` વાળી પ્રોડક્ટને કાર્ટ એરેમાંથી કાઢી નાખવામાં આવે છે.
- Redux ના નિયમ મુજબ મૂળ એરેમાં ફેરફાર (mutation) કરવાને બદલે હંમેશા નવો એરે (`spread operator [...]` અથવા `map()`) રીટર્ન કરવામાં આવે છે.

### 1.2 `cartReducer.js` કોડ:

```javascript
// src/reducers/cartReducer.js

// Initial State: Empty array of cart items
const initialState = [];

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingIndex = state.findIndex(item => item.id === action.payload.id);
      
      if (existingIndex >= 0) {
        // જો પ્રોડક્ટ પહેલેથી હોય તો quantity વધારો
        return state.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // નવી પ્રોડક્ટ ઉમેરો
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case REMOVE_FROM_CART: {
      // આઈટમ કાઢી નાખો
      return state.filter(item => item.id !== action.payload.id);
    }

    case UPDATE_QUANTITY: {
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}
```

---

<a id="q2"></a>
## Q2 — Redux Actions & ProductCard Component (Two Buttons)

> **Question:**  
> *Build two Redux actions: addToCart and removeFromCart. Dispatch these actions from two buttons in a ProductCard component to add or remove a product from the cartReducer state.*

### 2.1 Action Creators (`cartActions.js`):
Action Creators એવા ફંક્શન્સ છે જે Redux એક્શન ઓબ્જેક્ટ રિટર્ન કરે છે:

```javascript
// src/actions/cartActions.js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../reducers/cartReducer';

// ૧. કાર્ટમાં આઈટમ ઉમેરવા માટેની એક્શન
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

// ૨. કાર્ટમાંથી આઈટમ કાઢવા માટેની એક્શન
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { id: productId }
});
```

### 2.2 `ProductCard.jsx` Component:
આ કોમ્પોનન્ટમાં ૨ અલગ-અલગ બટન આપવામાં આવ્યા છે:
1. **`+ Add to Cart`**: `dispatch(addToCart(product))` રન કરશે.
2. **`- Remove`**: `dispatch(removeFromCart(product.id))` રન કરશે. જો પ્રોડક્ટ કાર્ટમાં ન હોય તો બટન ડિસેબલ્ડ રહેશે, અને જો કાર્ટમાં હોય તો તે લાલ રંગમાં સક્રિય થશે અને કાર્ટમાં કેટલી આઈટમ છે તે બેજ બતાવશે.

```jsx
// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ 
  product, 
  cartItem, 
  onAddToCart, 
  onRemoveFromCart 
}) {
  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>
      <h3 className="product-title">{product.name}</h3>
      <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>

      {cartItem && (
        <span className="cart-badge">In Cart: {cartItem.quantity}</span>
      )}

      {/* ૨ બટન્સ જે Redux Actions ડિસ્પેચ કરે છે */}
      <div className="button-group">
        {/* બટન ૧: Add to Cart */}
        <button 
          className="btn-add" 
          onClick={onAddToCart}
        >
          + Add to Cart
        </button>

        {/* બટન ૨: Remove from Cart */}
        <button 
          className="btn-remove" 
          onClick={onRemoveFromCart}
          disabled={!cartItem}
        >
          - Remove
        </button>
      </div>
    </div>
  );
}
```

---

<a id="q3"></a>
## Q3 — combineReducers (cartReducer & wishlistReducer)

> **Question:**  
> *Combine two reducers, cartReducer and wishlistReducer, using combineReducers to manage separate cart and wishlist states in your Redux store.*

### 3.1 Technical Explanation (ટેકનિકલ સમજૂતી):
મોટી એપ્લિકેશન્સમાં એક જ રિડ્યુસરમાં તમામ સ્ટેટ રાખવાને બદલે ફીચર-વાઇઝ અલગ રિડ્યુસર્સ બનાવવામાં આવે છે. Redux નું `combineReducers` ફંક્શન આ તમામ નાના રિડ્યુસર્સને ભેગા કરીને એક **Root Reducer** બનાવે છે.

### 3.2 `wishlistReducer.js`:
```javascript
// src/reducers/wishlistReducer.js
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export function wishlistReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const exists = state.some(item => item.id === action.payload.id);
      if (exists) return state; // ડુપ્લિકેટ અટકાવો
      return [...state, action.payload];
    }

    case REMOVE_FROM_WISHLIST:
      return state.filter(item => item.id !== action.payload.id);

    default:
      return state;
  }
}
```

### 3.3 Combining Reducers (`rootReducer.js`):
```javascript
// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { wishlistReducer } from './wishlistReducer';
import { offersReducer } from './offersReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,          // state.cart
  wishlist: wishlistReducer,  // state.wishlist
  offers: offersReducer       // state.offers
});

// હવે Redux Global State નો શેપ આ મુજબ બનશે:
// {
//   cart: [ ...cartItems ],
//   wishlist: [ ...wishlistItems ],
//   offers: { items: [], loading: false, error: null }
// }
```

---

<a id="q4"></a>
## Q4 — Redux-Thunk Middleware & Async fetchOffers (setTimeout Mock API)

> **Question:**  
> *Add redux-thunk middleware to your Redux store setup and create an async action fetchOffers that simulates fetching discount offers from an API and updates the Redux state when complete.*  
> *Hint: Use setTimeout to mock the API call and dispatch an action when finished.*

### 4.1 Redux-Thunk શું છે?:
સામાન્ય રીતે Redux Action Creators માત્ર પ્લેન જાવાસ્ક્રિપ્ટ ઓબ્જેક્ટ્સ (`{ type: ... }`) જ રિટર્ન કરી શકે છે. પરંતુ જ્યારે API કોલિંગ, ડેટાબેઝ ક્વેરી કે ટાઈમર જેવા Asynchronous કામ કરવા હોય, ત્યારે **`redux-thunk`** મિડલવેર વાપરવામાં આવે છે.
- `redux-thunk` એક્શન ક્રિએટરને ઓબ્જેક્ટના બદલે એક **ફંક્શન** રિટર્ન કરવાની છૂટ આપે છે, જેમાં `dispatch` અને `getState` પેરામીટર તરીકે મળે છે.

### 4.2 Thunk Async Action Creator (`fetchOffers`):

```javascript
// src/actions/offersActions.js
export const FETCH_OFFERS_START = 'FETCH_OFFERS_START';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_FAILURE = 'FETCH_OFFERS_FAILURE';

export const fetchOffers = () => {
  return (dispatch) => {
    // ૧. ડેટા ફેચિંગ શરૂ થતાં લોડિંગ સ્ટેટ ઓન કરો
    dispatch({ type: FETCH_OFFERS_START });

    // ૨. API કોલ સિમ્યુલેટ કરવા setTimeout નો ઉપયોગ (Hint મુજબ)
    setTimeout(() => {
      const mockOffers = [
        {
          id: 'OFF-1',
          title: '⚡ Flash Diwali Sale: 25% OFF on Audio Gear',
          code: 'AUDIO25',
          discount: '25%',
          badge: 'Limited Time'
        },
        {
          id: 'OFF-2',
          title: '🎁 Bundle Bonus: Free Logitech Mouse Pad with MX 3S',
          code: 'LOGIBONUS',
          discount: 'Free Gift',
          badge: 'Exclusive'
        },
        {
          id: 'OFF-3',
          title: '💳 HDFC & Axis Bank Instant Cashback Rs. 3,000',
          code: 'BANKCASH',
          discount: '₹3,000 Off',
          badge: 'Instant Bank'
        }
      ];

      // ૩. API નો રિસ્પોન્સ આવી ગયા પછી સફળતાની એક્શન ડિસ્પેચ કરો
      dispatch({
        type: FETCH_OFFERS_SUCCESS,
        payload: mockOffers
      });
    }, 1200); // 1.2 સેકન્ડનો નેટવર્ક ડીલે
  };
};
```

---

<a id="q5"></a>
## Q5 — Redux DevTools Extension Setup & Tracking State Changes

> **Question:**  
> *Install and configure Redux DevTools Extension in your React project. Use it to track and screenshot the state changes as you add and remove items from the cart and wishlist.*

### 5.1 Redux Store માં DevTools Extension કન્ફિગર કરવું (`store.js`):

```javascript
// src/store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

// Window Object માંથી Redux DevTools Extension કમ્પોઝર ચેક કરો
const composeEnhancers = 
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
```

### 5.2 Chrome Redux DevTools માં સ્ટેટ ટ્રેક કરવાના સ્ટેપ્સ:
1. Chrome Web Store પરથી **Redux DevTools** એક્સટેન્શન ઇન્સ્ટોલ કરો.
2. બ્રાઉઝરમાં આપણી એપ [`http://localhost:3010`](http://localhost:3010) ઓપન કરો.
3. કીબોર્ડ પર **`F12`** દબાવી DevTools ખોલો અને **Redux** ટેબ પસંદ કરો.
4. પ્રોડક્ટ કાર્ડ પર **`+ Add to Cart`** ક્લિક કરો:
   - ડાબી બાજુ એક્શન લિસ્ટમાં **`ADD_TO_CART`** એક્શન દેખાશે.
   - જમણી બાજુ **Diff** ટેબમાં `state.cart` માં લીલા રંગમાં નવો પ્રોડક્ટ ઉમેરાયેલો દેખાશે (`+`).
5. હવે હાર્ટ (❤️) બટન દબાવી Wishlist માં આઈટમ ઉમેરો:
   - **`ADD_TO_WISHLIST`** એક્શન નોંધાશે.
6. હવે **`- Remove`** બટન દબાવો:
   - **`REMOVE_FROM_CART`** એક્શન લાલ રંગમાં ડિલીટ થયેલ આઈટમ દર્શાવશે (`-`).
7. **Screenshot:** આ સ્ટેજ પર Chrome માં DevTools નો સ્ક્રીનશોટ લઈ તમારા એસાઇનમેન્ટમાં જોડી શકો છો!
8. આ ઉપરાંત આપણી વેબ એપમાં પણ **`🔍 DevTools Inspector`** ટેબ બિલ્ટ-ઇન મૂકેલી છે જેમાં લાઈવ ટાઈમસ્ટેમ્પ અને આખું સ્ટેટ ટ્રી જોઈ શકાય છે!

---

<a id="run-terminal"></a>
## 🚀 Terminal Commands to Run the App (ટર્મિનલમાં કેવી રીતે રન કરવું)

તમારી PowerShell અથવા Command Prompt ટર્મિનલમાં નીચે મુજબના કમાન્ડ ચલાવો:

### સ્ટેપ ૧: પ્રોજેક્ટ ફોલ્ડરમાં જાઓ
```powershell
cd "c:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Redux Reducer"
```

### સ્ટેપ ૨: સર્વર ચાલુ કરો
```powershell
node server.js
```
અથવા:
```powershell
npm start
```

### સ્ટેપ ૩: કન્સોલમાં આ મેસેજ દેખાશે:
```text
=============================================================
🛒 Redux Reducer App (Cart, Wishlist & Thunk Offers) running at:
👉 http://localhost:3010
=============================================================
```

હવે તમારા ગૂગલ ક્રોમ બ્રાઉઝરમાં **[`http://localhost:3010`](http://localhost:3010)** ખોલો.

---

<a id="browser-walkthrough"></a>
## 🛒 Browser Walkthrough & Feature Guide (બ્રાઉઝરમાં કેવી રીતે વાપરવું)

જ્યારે તમે `http://localhost:3010` ઓપન કરશો:

1. **ટોપ નેવિગેશન બાર**:
   - ડાબી બાજુ `🛒 Redux Reducer Hub` બ્રાન્ડ લોગો છે.
   - વચ્ચે ૫ ટેબ્સ છે:
     - `🛍️ Products (6)`: તમામ પ્રોડક્ટ્સ
     - `❤️ Wishlist (0)`: સાચવેલી આઈટમ્સ
     - `🛒 Cart (0)`: શોપિંગ કાર્ટ
     - `🔍 DevTools Inspector`: લાઈવ એક્શન અને સ્ટેટ ટ્રેકર
     - `📖 Assignment Q1-Q5`: થીયરી જવાબો
2. **Q4: Thunk Offers API Banner**:
   - ઉપર પર્પલ રંગના બેનરમાં **`🚀 Dispatch fetchOffers()`** બટન આપેલું છે.
   - તેના પર ક્લિક કરશો એટલે 1.2 સેકન્ડનું લોડિંગ સ્પિનર ફરશે અને API માંથી ૩ ધમાકેદાર ડિસ્કાઉન્ટ કૂપન્સ આવી જશે!
3. **Q2: ProductCard Buttons**:
   - પ્રોડક્ટ કાર્ડ પર **`+ Add to Cart`** દબાવો.
   - કાર્ટ બેજમાં આઈટમ કાઉન્ટ વધશે (`In Cart: 1`) અને ટોપ નેવિગેશનમાં ગ્રીન ટોસ્ટ નોટિફિકેશન આવશે.
   - **`- Remove`** બટન લાલ રંગમાં એક્ટિવેટ થશે. તેના પર ક્લિક કરતાં આઈટમ કાર્ટમાંથી રીમુવ થશે.
4. **Q3: Wishlist Toggle**:
   - પ્રોડક્ટ કાર્ડના ટોપ-રાઇટમાં રહેલા હાર્ટ આઈકન (🤍) પર ક્લિક કરતાં તે પિંક (❤️) થશે અને `wishlistReducer` માં સ્ટોર થશે.
5. **Q1: Cart Drawer & Checkout**:
   - `🛒 Cart` ટેબ પર ક્લિક કરો.
   - તમે ઉમેરેલી તમામ આઈટમ્સ, `+` અને `-` ક્વોન્ટિટી કંટ્રોલ્સ, 18% GST કેલ્ક્યુલેશન અને કૂપન ડિસ્કાઉન્ટ સાથે ગ્રાન્ડ ટોટલ દેખાશે!
6. **Q5: Redux DevTools Live Inspector**:
   - `🔍 DevTools Inspector` ટેબ પર ક્લિક કરો.
   - ડિસ્પેચ થયેલી તમામ એક્શન્સ (`ADD_TO_CART`, `REMOVE_FROM_CART`, `FETCH_OFFERS_SUCCESS`) ટાઈમસ્ટેમ્પ સાથે અને આખું Redux State Tree JSON માં લાઈવ અપડેટ થતું જોવા મળશે.
