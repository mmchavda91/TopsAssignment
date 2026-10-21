# Session 7: Generative AI APIs & React Integration

**Capstone Mini Project — Assignment Solutions & Practical Guide (Q1 to Q5)**

---

## 📌 સત્ર સારાંશ (Session Overview)
આ Session માં આપણે **Generative AI APIs** (Hugging Face અને OpenAI) નું React સાથે integration, **Prompt Tuning**, અને **Error Handling** શીખીશું:
1. **Hugging Face Inference API (`gpt2`)**: Motivational quote generate કરવા માટે API call કરવી.
2. **OpenAI API (`/completions`)**: Resume details લઈ 2-line summary બનાવવી અને loading spinner દર્શાવવો.
3. **Prompt Tuning (Tone Variation)**: યુઝર દ્વારા પસંદ કરાયેલ ટોન (`inspirational`, `funny`, `serious`) મુજબ AI prompt tune કરવો.
4. **ChatGPT / Copilot Code Generation**: `fetchBlogSummary(prompt)` ફંક્શન બનાવીને 2 અલગ અલગ પ્રોમ્પ્ટ્સ સાથે ટેસ્ટ કરવું.
5. **API Error Handling**: ખોટી API Key (401), ક્વોટા લિમિટ (429) કે નેટવર્ક એરર આવે ત્યારે એપ ક્રેશ થયા વિના graceful error મેસેજ દર્શાવવો.

---

## 📋 Table of Contents
- [Q1: AiQuoteGenerator with Hugging Face (gpt2)](#q1-aiquotegenerator-with-hugging-face-gpt2)
- [Q2: ResumeSummaryForm with OpenAI /completions & Spinner](#q2-resumesummaryform-with-openai-completions--spinner)
- [Q3: Prompt Tuning with Tone Selection](#q3-prompt-tuning-with-tone-selection)
- [Q4: fetchBlogSummary() via ChatGPT & Testing with 2 Prompts](#q4-fetchblogsummary-via-chatgpt--testing-with-2-prompts)
- [Q5: Graceful Error Handling for AI APIs](#q5-graceful-error-handling-for-ai-apis)
- [🌐 Browser માં કેવી રીતે Run કરવું (How to Run)](#-browser-માં-કેવી-રીતે-run-કરવું)

---

## Q1: AiQuoteGenerator with Hugging Face (gpt2)

### 🎯 પ્રશ્ન (Question):
> *Create a React component called AiQuoteGenerator that fetches a motivational quote using the Hugging Face Inference API and displays it on button click.*  
> *Hint: Use fetch() with the Hugging Face API endpoint for text-generation models like 'gpt2'.*

### 💡 Concept:
- **Hugging Face Inference API Endpoint**:  
  `https://api-inference.huggingface.co/models/gpt2`
- `fetch()` મેથડ દ્વારા `POST` રિકવેસ્ટ મોકલવામાં આવે છે જેમાં `inputs` અને generation parameters (`max_new_tokens`, `temperature`) પાસ થાય છે.

### 💻 Code Implementation:
```javascript
const API_URL = "https://api-inference.huggingface.co/models/gpt2";

async function fetchQuote(prompt) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Optional: "Authorization": "Bearer YOUR_HF_TOKEN"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 45, temperature: 0.8 }
    })
  });

  const data = await response.json();
  return data[0]?.generated_text || "Quote generated.";
}
```

---

## Q2: ResumeSummaryForm with OpenAI /completions & Spinner

### 🎯 પ્રશ્ન (Question):
> *Build a ResumeSummaryForm component where users enter their resume details, then use the OpenAI API to generate a 2-line summary and display it below the form.*  
> *Constraint: Use the OpenAI API's /completions endpoint and display a loading spinner while waiting for the response.*

### 💡 Concept:
- **OpenAI Endpoint**: `https://api-openai.com/v1/completions` (Model: `gpt-3.5-turbo-instruct`).
- **Loading Spinner (Constraint)**: `loading` state `true` હોય ત્યારે CSS animation spinner દર્શાવાય છે જેથી યુઝરને ખબર પડે કે AI પ્રતિસાદ તૈયાર કરી રહ્યું છે.
- **2-Line Strict Rule**: પ્રોમ્પ્ટમાં સ્પષ્ટ લખવામાં આવે છે: *"Generate strictly a 2-line professional summary."*

### 💻 Code Implementation:
```jsx
// OpenAI /completions API Call
const response = await fetch("https://api.openai.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Generate a concise 2-line professional resume summary for:
Name: ${fullName}
Role: ${targetRole}
Skills: ${skills}
Experience: ${experience}`,
    max_tokens: 100,
    temperature: 0.7
  })
});
```

---

## Q3: Prompt Tuning with Tone Selection

### 🎯 પ્રશ્ન (Question):
> *Integrate prompt tuning in your AiQuoteGenerator by allowing users to select a 'tone' (e.g., funny, serious, inspirational) and pass it as part of the prompt to the Hugging Face API. Show how the output changes based on the selected tone.*

### 💡 Concept:
- **Prompt Tuning**: જ્યારે યુઝર ટોન બદલે છે, ત્યારે બેકએન્ડ પ્રોમ્પ્ટ પણ બદલાઈ જાય છે:
  - **Inspirational**: `"Here is an uplifting, deeply inspirational quote about perseverance: \""`
  - **Funny**: `"Here is a witty, sarcastic and hilarious quote about programming and procrastination: \""`
  - **Serious**: `"Here is a disciplined, stoic and philosophical quote about focus and mastery: \""`
- આના કારણે એક જ AI મોડેલમાંથી અલગ અલગ મૂડ અને શૈલીના આઉટપુટ મળે છે.

---

## Q4: fetchBlogSummary() via ChatGPT & Testing with 2 Prompts

### 🎯 પ્રશ્ન (Question):
> *Use ChatGPT or Copilot to help you write a function fetchBlogSummary(prompt) that takes user input and returns a blog summary using the OpenAI API. Paste the generated code into your React project and test it with at least two different prompts.*

### 1. ChatGPT ને પૂછાયેલો Prompt:
> *"Write a JavaScript async function called fetchBlogSummary(prompt) that takes user input and returns a blog summary using the OpenAI API. Include error handling and bullet point formatting."*

### 2. ChatGPT નો Generated કોડ:
```javascript
export async function fetchBlogSummary(prompt, apiKey) {
  if (!prompt || !prompt.trim()) {
    throw new Error("Prompt cannot be empty.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Summarize this blog post into 3 concise bullet points." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}
```

### 3. ટેસ્ટિંગ માટેના 2 પ્રોમ્પ્ટ્સ (Tested with 2 Prompts):
- **ટેસ્ટ પ્રોમ્પ્ટ 1**: *The Rise of React Server Components (RSC)*
- **ટેસ્ટ પ્રોમ્પ્ટ 2**: *Work-Life Balance for Remote Software Developers*

---

## Q5: Graceful Error Handling for AI APIs

### 🎯 પ્રશ્ન (Question):
> *Refactor your ResumeSummaryForm to handle API errors gracefully by displaying an error message if the OpenAI API call fails (e.g., due to network issues or invalid API key).*

### 💡 Concept & Refactoring:
- **401 Unauthorized**: જો API Key ખોટી હોય તો યુઝરને ચોખ્ખો મેસેજ આપે: *"Invalid OpenAI API Key. Please verify."*
- **429 Rate Limit**: ક્વોટા પૂર્ણ થઈ ગયો હોય ત્યારે *"OpenAI Quota Exceeded"* દર્શાવે.
- **Network / Offline Failures**: નેટવર્ક કનેક્શન ન હોય ત્યારે એપ ક્રેશ થવાને બદલે સુંદર એલર્ટ બોક્સ દર્શાવે છે અને સાથે-સાથે **Smart AI Fallback Simulator** શરૂ કરી દે છે જેથી વિદ્યાર્થી પ્રોજેક્ટ ડેમો કોઈપણ જાતના ખલેલ વગર આપી શકે.

---

## 🌐 Browser માં કેવી રીતે Run કરવું (How to Run)

### રીત 1: ટર્મિનલ દ્વારા (`npm start`)
```powershell
cd "c:\Users\Mamta\OneDrive\TopsAssignment\Capstone Mini project\Session 7"
npm start
```
ટર્મિનલમાં દેખાશે:
👉 **`http://localhost:3002`**

### રીત 2: સીધું ડબલ-ક્લિક કરીને
`Session 7` ફોલ્ડરમાં રહેલી **[index.html](file:///c:/Users/Mamta/OneDrive/TopsAssignment/Capstone%20Mini%20project/Session%207/index.html)** પર ડબલ-ક્લિક કરો, તે સીધી કોઈપણ બ્રાઉઝરમાં ચાલુ થઈ જશે!
