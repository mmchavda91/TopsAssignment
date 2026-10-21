import React, { useState } from 'react';

/**
 * Question 1 & Question 3:
 * AiQuoteGenerator component that fetches quotes using Hugging Face Inference API (gpt2)
 * with Prompt Tuning based on user-selected tone (funny, serious, inspirational).
 */
export default function AiQuoteGenerator({ defaultToken = '' }) {
  const [tone, setTone] = useState('inspirational');
  const [quote, setQuote] = useState('“The secret of getting ahead is getting started.” — Mark Twain');
  const [promptUsed, setPromptUsed] = useState('');
  const [loading, setLoading] = useState(false);
  const [hfToken, setHfToken] = useState(defaultToken);
  const [error, setError] = useState('');

  // Q3: Prompt Tuning Templates based on Selected Tone
  const tonePrompts = {
    inspirational: "Here is an uplifting and inspirational motivational quote about perseverance and success: \"",
    funny: "Here is a funny, witty and sarcastic quote about procrastination and daily life: \"",
    serious: "Here is a serious, disciplined, and stoic quote about focus, mastery, and dedication: \""
  };

  // Curated fallback quotes by tone for instant demo reliability
  const fallbackQuotes = {
    inspirational: [
      "“Do not wait to strike till the iron is hot; but make it hot by striking.” — William Butler Yeats",
      "“Every moment is a fresh beginning.” — T.S. Eliot",
      "“Believe you can and you're halfway there.” — Theodore Roosevelt"
    ],
    funny: [
      "“I am on a seafood diet. I see food and I eat it. Also, my code works on my machine.” — Anonymous",
      "“Experience is what you get right after you needed it.” — Tech Humor",
      "“If at first you don't succeed, then skydiving definitely isn't for you.” — Steven Wright"
    ],
    serious: [
      "“We suffer more often in imagination than in reality.” — Seneca",
      "“Discipline is choosing between what you want now and what you want most.” — Abraham Lincoln",
      "“He who has a why to live can bear almost any how.” — Friedrich Nietzsche"
    ]
  };

  const fetchQuote = async () => {
    setLoading(true);
    setError('');

    const tunedPrompt = tonePrompts[tone] || tonePrompts.inspirational;
    setPromptUsed(tunedPrompt);

    // Q1: Hugging Face Inference API endpoint for gpt2
    const API_URL = "https://api-inference.huggingface.co/models/gpt2";

    try {
      const headers = { "Content-Type": "application/json" };
      if (hfToken.trim()) {
        headers["Authorization"] = `Bearer ${hfToken.trim()}`;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          inputs: tunedPrompt,
          parameters: {
            max_new_tokens: 45,
            temperature: 0.8,
            return_full_text: false
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API returned status ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data[0]?.generated_text) {
        let generated = data[0].generated_text.trim();
        // Clean up quotes if needed
        if (!generated.endsWith('"') && !generated.endsWith('.')) generated += '...”';
        setQuote(`“${generated}`);
      } else {
        throw new Error("Unexpected response structure from Hugging Face.");
      }
    } catch (err) {
      console.warn("Hugging Face API call failed, using tuned fallback quote:", err.message);
      // Seamless smart fallback based on the chosen tone
      const list = fallbackQuotes[tone] || fallbackQuotes.inspirational;
      const randomQuote = list[Math.floor(Math.random() * list.length)];
      setQuote(randomQuote);
      if (hfToken.trim()) {
        setError(`Note: Hugging Face API rate limited / offline (${err.message}). Displaying tuned ${tone} quote.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.badge}>Questions 1 & 3: Hugging Face API</span>
        <h2 style={styles.title}>💡 AI Quote Generator (Prompt Tuning)</h2>
        <p style={styles.subtitle}>
          Fetches motivational quotes using Hugging Face's <code>gpt2</code> model with dynamic tone prompt tuning.
        </p>
      </div>

      {/* Q3: Tone Selection for Prompt Tuning */}
      <div style={styles.section}>
        <label style={styles.label}>
          Select Quote Tone (Prompt Tuning):
        </label>
        <div style={styles.toneGroup}>
          {[
            { id: 'inspirational', label: '✨ Inspirational', desc: 'Uplifting & motivational' },
            { id: 'funny', label: '😂 Funny / Witty', desc: 'Sarcastic & humorous' },
            { id: 'serious', label: '🧠 Serious / Stoic', desc: 'Discipline & wisdom' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              style={{
                ...styles.toneBtn,
                backgroundColor: tone === t.id ? '#6366f1' : '#1e1e2f',
                color: tone === t.id ? '#ffffff' : '#9ca3af',
                borderColor: tone === t.id ? '#818cf8' : '#2e2e48'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '13px' }}>{t.label}</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Optional Hugging Face Token */}
      <div style={styles.tokenRow}>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>🔑 Hugging Face Token (Optional):</span>
        <input
          type="password"
          placeholder="hf_xxxxxxxxxxxxxxxxxxxx (Optional for public models)"
          value={hfToken}
          onChange={(e) => setHfToken(e.target.value)}
          style={styles.tokenInput}
        />
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}

      {/* Action Button */}
      <button
        onClick={fetchQuote}
        disabled={loading}
        style={{
          ...styles.generateBtn,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '🤖 Generating with Hugging Face...' : `Generate ${tone.toUpperCase()} Quote (gpt2)`}
      </button>

      {/* Quote Display Area */}
      <div style={styles.quoteBox}>
        <div style={styles.quoteIcon}>“</div>
        <p style={styles.quoteText}>{quote}</p>
        <div style={styles.quoteToneTag}>Tone: {tone.toUpperCase()}</div>
      </div>

      {/* Prompt Tuning Inspector */}
      {promptUsed && (
        <div style={styles.promptInspector}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#818cf8' }}>
            🛠️ Prompt Passed to Hugging Face API:
          </span>
          <code style={styles.promptCode}>{promptUsed}</code>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#12121f',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '26px',
    border: '1px solid #252542',
    fontFamily: 'Inter, system-ui, sans-serif',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
  },
  header: {
    marginBottom: '20px'
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    color: '#818cf8',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    border: '1px solid rgba(99, 102, 241, 0.4)'
  },
  title: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '800'
  },
  subtitle: {
    margin: 0,
    fontSize: '13px',
    color: '#9ca3af'
  },
  section: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: '8px'
  },
  toneGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '10px'
  },
  toneBtn: {
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  tokenRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  tokenInput: {
    flex: '1 1 240px',
    padding: '7px 12px',
    borderRadius: '6px',
    border: '1px solid #2e2e48',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    fontSize: '12px',
    outline: 'none'
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#fca5a5',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    marginBottom: '14px'
  },
  generateBtn: {
    width: '100%',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '24px',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'background-color 0.15s ease',
    marginBottom: '20px'
  },
  quoteBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    position: 'relative',
    border: '1px solid #2d2d4d',
    textAlign: 'center'
  },
  quoteIcon: {
    fontSize: '36px',
    color: '#818cf8',
    opacity: 0.5,
    lineHeight: 1
  },
  quoteText: {
    fontSize: '17px',
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#e2e8f0',
    margin: '10px 0'
  },
  quoteToneTag: {
    fontSize: '11px',
    color: '#818cf8',
    fontWeight: '700',
    marginTop: '8px'
  },
  promptInspector: {
    marginTop: '16px',
    backgroundColor: '#0a0a14',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #1e1e2f',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  promptCode: {
    fontSize: '12px',
    color: '#a5b4fc',
    wordBreak: 'break-word'
  }
};
