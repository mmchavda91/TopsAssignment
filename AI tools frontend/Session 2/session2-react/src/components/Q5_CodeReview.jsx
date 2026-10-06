/**
 * Q5. Code Review — Improvements & Corrections
 * ──────────────────────────────────────────────────────────────
 * After using ChatGPT/Copilot to generate the React components,
 * here are 2 improvements for EACH component before production use.
 * 
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT 1: PlaylistCard (Q1)
 * ═══════════════════════════════════════════════════════════════
 * 
 *  Improvement 1: Replace defaultProps with default parameters
 *  ─────────────────────────────────────────────────────────────
 *  React.defaultProps is deprecated in React 18.3+.
 *  Instead, use JavaScript default parameters in the function signature:
 * 
 *  BEFORE (generated code):
 *    PlaylistCard.defaultProps = { coverImage: "" };
 * 
 *  AFTER (corrected):
 *    const PlaylistCard = ({ name, creator, songCount, coverImage = "" }) => { ... }
 * 
 * 
 *  Improvement 2: Add error boundary for broken images
 *  ─────────────────────────────────────────────────────────────
 *  If the coverImage URL fails to load, the card looks broken.
 *  Add an onError handler to fallback to a default image:
 * 
 *    <img
 *      src={coverImage}
 *      onError={(e) => { e.target.src = "/fallback-playlist.png"; }}
 *      alt={`${name} playlist cover`}
 *    />
 * 
 * 
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT 2: ProductCard - Flipkart (Q2)
 * ═══════════════════════════════════════════════════════════════
 * 
 *  Improvement 1: Add PropTypes validation
 *  ─────────────────────────────────────────────────────────────
 *  The AI-generated code destructures `product` but doesn't
 *  validate its shape. This causes silent failures.
 * 
 *  FIX: Add PropTypes.shape validation for the product object
 *  to catch missing or wrong-typed props early during development.
 * 
 * 
 *  Improvement 2: Guard against undefined values in pricing
 *  ─────────────────────────────────────────────────────────────
 *  price.toLocaleString() will crash if price is undefined/null.
 * 
 *  BEFORE:
 *    ₹{price.toLocaleString()}
 * 
 *  AFTER:
 *    ₹{(price ?? 0).toLocaleString()}
 * 
 * 
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT 3: ZomatoRestaurantListing (Q3)
 * ═══════════════════════════════════════════════════════════════
 * 
 *  Improvement 1: Add cleanup/abort controller in useRestaurants
 *  ─────────────────────────────────────────────────────────────
 *  The custom hook doesn't cancel in-flight requests on unmount.
 *  This can lead to memory leaks and "setState on unmounted 
 *  component" warnings.
 * 
 *  FIX: Use AbortController in the useEffect:
 * 
 *    useEffect(() => {
 *      const controller = new AbortController();
 *      fetch(apiUrl, { signal: controller.signal })...
 *      return () => controller.abort();
 *    }, [apiUrl]);
 * 
 * 
 *  Improvement 2: Hardcoded discount text should be dynamic
 *  ─────────────────────────────────────────────────────────────
 *  The "60% OFF up to ₹120" discount tag is hardcoded in every card.
 *  This should come from the restaurant data object instead.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════
 *  COMPONENT 4: YouTubeVideoList (Q4)
 * ═══════════════════════════════════════════════════════════════
 * 
 *  Improvement 1: Add debouncing to search input
 *  ─────────────────────────────────────────────────────────────
 *  The search triggers a re-fetch on EVERY keystroke, which is
 *  inefficient and causes unnecessary API calls.
 * 
 *  FIX: Debounce the search query with a 300ms delay:
 * 
 *    const [debouncedQuery, setDebouncedQuery] = useState("");
 *    useEffect(() => {
 *      const timer = setTimeout(() => setDebouncedQuery(query), 300);
 *      return () => clearTimeout(timer);
 *    }, [query]);
 * 
 * 
 *  Improvement 2: Improve accessibility — missing ARIA labels
 *  ─────────────────────────────────────────────────────────────
 *  The video cards lack aria-label and role attributes. Screen
 *  readers won't be able to properly navigate the video list.
 * 
 *  FIX: Add role="article" and aria-label to each video card:
 *    <div className="yt-video-card" role="article" aria-label={title}>
 * 
 * ═══════════════════════════════════════════════════════════════
 */

// This file serves as the Q5 documentation.
// No executable code needed — the review is in the comments above.
export default {};
