# 🎨 Redux Core Concepts — Session 2 Assignment
**Course:** React & Redux Capstone Mini Project  
**Folder:** `Redux core concepts/Session 2`  
**Topic:** UI/UX Wireframing, Figma High-Fidelity Design & Layout Hierarchy  
**Date:** October 2026  

---

## 📋 Table of Contents
1. [Question 1: Low-Fidelity Wireframe for Flipkart-Style Homepage](#question-1--low-fidelity-wireframe-for-flipkart-style-homepage)
2. [Question 2: Figma High-Fidelity Wireframe for Zomato-Style Dashboard](#question-2--figma-high-fidelity-wireframe-for-zomato-style-dashboard)
3. [Question 3: Figma AI Job Profile Dashboard with Custom Achievements & Activity](#question-3--figma-ai-job-profile-dashboard-with-custom-achievements--activity)
4. [Question 4: User Journey Mapping for Spotify Playlist Dashboard](#question-4--user-journey-mapping-for-spotify-playlist-dashboard)
5. [Question 5: Layout Hierarchy & Visual Weight Analysis (5–7 Sentences)](#question-5--layout-hierarchy--visual-weight-analysis-57-sentences)

---

## Question 1 — Low-Fidelity Wireframe for Flipkart-Style Homepage

> **Task:** Create a low-fidelity wireframe for a Flipkart-style homepage using pen and paper or any digital whiteboard tool. Include at least a top navigation bar, product grid, and a sidebar filter section.  
> *(Hint: Focus on layout and placement, not colors or detailed images.)*

### 📐 Wireframe Architecture & Layout Blueprint
* **Design Philosophy:** Low-fidelity (Lo-Fi) focuses strictly on **spatial hierarchy, element placement, and user navigation flow**, abstracting away colors, branding, and photography with neutral grayscale wireframe boxes and labeled placeholders.
* **Vector Wireframe File:** [`Q1_flipkart_lofi_wireframe.svg`](./Q1_flipkart_lofi_wireframe.svg)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO: Flipkart]  [ 🔍 Search for products, brands and more...       ] [👤 Login] [🛒] │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Grocery  |  Mobiles  |  Fashion ▾  |  Electronics ▾  |  Home ▾  |  Appliances  |  More  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                         [ CAROUSEL PROMO BANNER / HERO DEALS ]                         │
├───────────────────────┬────────────────────────────────────────────────────────────────┤
│ 📑 FILTERS            │ Showing 1–12 of 3,420 results           Sort By: [Relevance ▾] │
│                       ├──────────────────────┬───────────────────┬─────────────────────┤
│ • Categories          │ [PRODUCT IMAGE]      │ [PRODUCT IMAGE]   │ [PRODUCT IMAGE]     │
│   ▾ Electronics       │ Wireless Headphones  │ Mech Keyboard RGB │ Smart Fitness Watch │
│     - Audio           │ 4.4 ★ (12,450)       │ 4.6 ★ (3,820)     │ 4.2 ★ (8,190)       │
│     - Laptops         │ ₹2,499  50% off      │ ₹3,899  29% off   │ ₹1,799  55% off     │
│ • Price Range (Slider)│ [ ADD TO CART ]      │ [ ADD TO CART ]   │ [ ADD TO CART ]     │
│ • Brand Checkboxes    ├──────────────────────┴───────────────────┴─────────────────────┤
│ • Customer Ratings    │                                                                │
└───────────────────────┴────────────────────────────────────────────────────────────────┘
```

### 🔍 Key Wireframe Sections Explained:

| Section | Layout Placement | Core Function & UX Purpose |
|:---|:---|:---|
| **Top Navigation Bar** | Fixed at top (`100% width`, `60px height`) | Houses company logo, prominent high-contrast search input with magnifying icon, seller portal link, and cart badge counter. |
| **Category Ribbon** | Immediately below nav bar | Horizontal quick-access categories (Grocery, Mobiles, Fashion, Electronics) with dropdown carets (`▾`) for submenus. |
| **Hero Promo Banner** | Full-width above main layout (`960x70px`) | Wireframe placeholder for rotating festival discounts and flash sales carousels. |
| **Left Sidebar Filter** | Left panel (`240px fixed width`, 25% screen ratio) | Multi-criteria faceted filters including category trees, interactive dual-handle price range slider, brand checkboxes, and minimum star-rating filters. |
| **Main Product Grid** | Right main area (`700px fluid width`, 3-column grid) | Responsive cards showing product image placeholder (`X` lines), title, rating badge, price with strike-through MRP, discount percentage, and clear **ADD TO CART** primary button. |

---

## Question 2 — Figma High-Fidelity Wireframe for Zomato-Style Dashboard

> **Task:** Open Figma and design a high-fidelity wireframe for a Zomato-style dashboard where users can see their recent orders, saved restaurants, and offers. Use Figma's built-in components for buttons, cards, and navigation.

### 🎨 High-Fidelity Design System & Component Library
* **Design File:** [`Q2_zomato_hifi_dashboard.svg`](./Q2_zomato_hifi_dashboard.svg)
* **Design Tokens:**
  * **Primary Brand Red:** `#E23744` (Zomato Crave Red)
  * **Success Emerald:** `#059669` (Ratings & Delivered Status)
  * **Background Neutral:** `#F4F5F7` (Soft Light Canvas)
  * **Surface Cards:** `#FFFFFF` with `0 4px 12px rgba(0,0,0,0.06)` drop shadows
  * **Typography:** Circular Std / Inter (Bold weights for restaurant titles, medium for tags)

### 🧩 Figma Component Architecture Applied:

#### 1. Navigation Bar Component (`NavBar`)
* **Location Pin Selector:** Auto-detects current delivery neighborhood (*"Ahmedabad, Gujarat ▾"*).
* **Global Search Box:** Search for dishes, dining spots, or cuisines with search icon and placeholder.
* **Gold Membership Badge & User Profile Dropdown:** Distinct badge showing active subscription tier.

#### 2. Active Promotional Banner Component (`OfferBannerCard`)
* Eye-catching warm orange-pink gradient (`#FF7E5F` to `#FEB47B`) displaying *"FLAT 50% OFF ON YOUR NEXT 3 ORDERS"*.
* Code tag pill `ZOMATOPRO50` + primary white pill CTA button: **"Claim Offer ➔"**.

#### 3. Recent Orders Carousel Component (`RecentOrderCard`)
* Displays past completed orders with food thumbnails (e.g. *La Pino'z Pizza*, *Gwalia Sweets*).
* Shows items ordered, delivery timestamp (*"Delivered Yesterday at 8:42 PM"*), total order amount, and a red **"🔁 Reorder"** action button that adds all past items into the cart in 1 click.

#### 4. Saved Restaurants Grid Component (`SavedRestaurantCard`)
* 3-column grid showing favorited dining spots.
* Each card includes food hero banner, floating rating badge (e.g., `4.8 ★`), active heart bookmark icon (`❤️`), delivery duration estimation (`25-35 mins`), average price for one, and active dining discount tags (*"Flat ₹100 OFF with Pro"*).

---

## Question 3 — Figma AI Job Profile Dashboard with Custom Achievements & Activity

> **Task:** Use Figma AI to generate a layout for a job profile dashboard by typing: *"Generate layout for job profile dashboard"* in the Figma AI prompt. Edit the generated wireframe to add a section for user achievements and recent activity.  
> *(Hint: Try different prompts if the first result isn’t close to what you want.)*

### 🤖 Figma AI Prompt Engineering & Workflow
1. **Initial Figma AI Prompt:**  
   `"Generate a clean, modern layout for a job profile dashboard with user avatar, contact info, tech skills, and portfolio projects."`
2. **AI-Generated Baseline Layout:**  
   Figma AI produced a basic resume view: Header banner with user name/title, a standard skills list, and past project cards.
3. **Manual Custom Additions (Enhancement):**  
   To transform the layout into a competitive candidate dashboard, **two custom high-value sections were added**:
   * **Section A:** User Achievements & Verified Badges (Certificates, Hackathons, Commit Streaks).
   * **Section B:** Real-Time Application Activity Timeline (Interview invitations, machine coding test submissions).
4. **Vector Wireframe File:** [`Q3_job_profile_dashboard.svg`](./Q3_job_profile_dashboard.svg)

### 📋 Detailed Architecture of the Customized Sections:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [MC Avatar]  Mamta Chavda  [● Open to Work]                      [✏️ Edit] [📄 Resume] │
│ Frontend React Developer • Ahmedabad, India • 2+ Years Exp • Profile: 95% Complete    │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│ 🛠️ CORE SKILLS & TECH STACK               │ 📊 JOB SEARCH KPI METRICS                  │
│ [React.js] [Redux Toolkit] [JavaScript]   │ [ 24 Applied ] [ 6 Interviews ] [ 142 Views│
│ [REST APIs] [Git/GitHub] [Responsive UI]  ├────────────────────────────────────────────┤
├───────────────────────────────────────────┤ ⚡ RECENT ACTIVITY TIMELINE (CUSTOM ADDED)  │
│ 🏆 USER ACHIEVEMENTS (CUSTOM ADDED)       │                                            │
│ 🥇 Top Performer — React Capstone (Rank 1)│ 🟢 Interview Round 2: Tech Mahindra        │
│ 📜 Certified Frontend Specialist (TOPS)   │    Tomorrow at 11:30 AM via Google Meet    │
│ ⭐ 100-Day Continuous GitHub Streak       │ 🔵 Submitted Machine Coding Test (Infosys) │
│                                           │ 🟣 Profile Viewed by Hiring Manager (TCS)  │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

---

## Question 4 — User Journey Mapping for Spotify Playlist Dashboard

> **Task:** Map out the user journey for a new user signing up and exploring a music playlist dashboard (like Spotify) on paper or Figma. Identify at least 4 key steps/screens the user will interact with and briefly describe the purpose of each.  
> *(Constraint: Focus on the flow and screen transitions, not detailed UI elements.)*

### 🗺️ End-to-End User Journey Diagram
* **Vector Journey Map File:** [`Q4_spotify_user_journey.svg`](./Q4_spotify_user_journey.svg)

```
┌──────────────────┐      Next      ┌──────────────────┐      Load      ┌──────────────────┐      Play      ┌──────────────────┐
│     SCREEN 1     │ ─────────────▶ │     SCREEN 2     │ ─────────────▶ │     SCREEN 3     │ ─────────────▶ │     SCREEN 4     │
│ Welcome & Sign-Up│                │ Taste Onboarding │                │ Personalized Home│                │ Playlist & Player│
└──────────────────┘                └──────────────────┘                └──────────────────┘                └──────────────────┘
```

### 📱 4 Key Steps & Screen Transitions:

| Step / Screen | Screen Name | Screen Transition & Trigger | UX Purpose & User Action |
|:---:|:---|:---|:---|
| **Step 1** | **Welcome & Sign-Up Screen** | User opens app / clicks *"Get Started"* ➔ Submits email/password or Google OAuth. | **Frictionless Entry:** Overcomes signup resistance with 1-tap social login, zero upfront payment prompts, and clear value proposition (*"Millions of songs. Free."*). |
| **Step 2** | **Taste Onboarding Screen** | Triggered immediately upon successful account creation ➔ Displays interactive genre/artist pills. | **Cold-Start Elimination:** User taps 3 or more genres (e.g. *Rock, Lo-Fi, Pop*). The algorithm stores these preference vectors in the user state to seed personalized recommendations instantly. |
| **Step 3** | **Personalized Home Dashboard** | Transition triggered automatically once preferences are confirmed ➔ Re-routes to Home feed. | **Discovery & Engagement:** Greets user (*"Good Afternoon, Mamta"*), displays generated *Daily Mixes*, algorithmically curated *Made For You* playlists, and trending categories with 1-click play buttons. |
| **Step 4** | **Playlist Detail & Persistent Player Screen** | Triggered when user selects any playlist card (e.g., *"Focus Deep Work"*) and clicks Play. | **Core Value Consumption:** Shows full tracklist with durations, launches sticky audio playback controls (Seek-bar, Play/Pause, Skip), and allows saving songs to personal library (`💚 Favorite`). |

---

## Question 5 — Layout Hierarchy & Visual Weight Analysis (5–7 Sentences)

> **Task:** Analyze your dashboard wireframe from task 2 or 3 and list the layout hierarchy: which sections are most prominent, which are secondary, and how visual weight guides the user’s attention. Write your answer in 5-7 sentences.

### 📝 Analysis of Zomato High-Fidelity Dashboard Wireframe (Task 2):

1. In the Zomato dashboard wireframe, the primary visual focal point is the **top promotional banner ("FLAT 50% OFF")**, which commands immediate attention through its high-contrast gradient background and bold typography.
2. Directly beneath the banner, the **"Recent Orders & Quick Re-order" carousel** carries the second highest visual weight because it uses vibrant food thumbnail photography and high-contrast red "Reorder" action buttons to drive repeat purchases with minimum cognitive effort.
3. The **"Saved Restaurants" bookmark grid** represents the third level in the hierarchy, utilizing structured multi-column white cards, star-rating pills, and green delivery badges that guide the eye when browsing favorite dining options.
4. Supporting functional elements like the **top navigation bar, neighborhood location selector, and search input** maintain a clean, neutral background so they remain accessible without distracting from core food content.
5. Visual weight is systematically distributed using the **F-shaped scanning pattern**, placing restaurant titles and pricing on the left and primary CTA buttons on the bottom-right of each component.
6. Subtle drop shadows (`0 4px 12px rgba(0,0,0,0.06)`) and ample whitespace (20px gutters) separate different modules, preventing visual clutter while ensuring intuitive navigation.
7. Consequently, the user's eye journey flows smoothly from awareness (discount banner) to instant action (re-order card) and finally to exploratory browsing (saved restaurants).

---
*Assignment completed for TOPS Technology — React & Redux Capstone Course, Session 2.*
