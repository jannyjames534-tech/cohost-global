// Server-side AI guest assistant endpoint (Node.js / Express / Vercel Serverless compatible)
// Reads GEMINI_API_KEY from environment variables to protect secret keys.
// Never exposes API keys in client-side code.

const KYNTO_PROPERTIES = [
  {
    id: "dubai-marina",
    name: "Marina Pearl Tower",
    location: "Dubai Marina, Dubai, UAE",
    city: "Dubai",
    country: "UAE",
    price: "$340 /Night",
    type: "Waterfront Luxury Apartment",
    checkIn: "3:00 PM - 10:00 PM (Keyless smart keypad; personalized code sent 24h prior)",
    checkOut: "11:00 AM strict",
    wifi: "Kynto_MarinaPearl_5G (Fiber 500 Mbps; password on console welcome card)",
    parking: "Dedicated space #42B in underground basement garage P2",
    rules: "No smoking ($500 sanitation fee); Quiet hours 10 PM - 8 AM; No parties; Pets allowed with host approval; Max 4 guests",
    host: "Elena Rostova (Superhost Partner, WhatsApp +92 318 2653259)"
  },
  {
    id: "manhattan-loft",
    name: "Central Park Glass Loft",
    location: "Upper East Side, Manhattan, New York, USA",
    city: "New York",
    country: "USA",
    price: "$580 /Night",
    type: "Penthouse Loft",
    checkIn: "4:00 PM onwards (24/7 Doorman and private elevator fob)",
    checkOut: "11:00 AM",
    wifi: "CentralPark_Loft_Ultra (1 Gbps fiber; password on desk tablet)",
    parking: "Valet garage adjacent to building ($65/night)",
    rules: "Strict non-smoking ($1,000 fine); Quiet hours after 10 PM; No parties; No pets; Max 6 guests",
    host: "Marcus Vance (Senior Host, WhatsApp +92 318 2653259)"
  },
  {
    id: "paris-marais",
    name: "Le Marais Heritage Loft",
    location: "Le Marais, 4th Arrondissement, Paris, France",
    city: "Paris",
    country: "France",
    price: "$620 /Night",
    type: "Heritage Loft",
    checkIn: "3:00 PM - 8:00 PM (Courtyard digicode and lockbox)",
    checkOut: "10:30 AM",
    wifi: "Marais_Haussmann_Loft (400 Mbps fiber; password in armoire)",
    parking: "No on-site parking; Parking Indigo Pont Marie is 4 min walk",
    rules: "No high heels on parquet; No smoking; Quiet hours 10 PM - 8 AM; No pets; Max 4 guests",
    host: "Camille Laurent (Paris Host, WhatsApp +92 318 2653259)"
  },
  {
    id: "istanbul-yali",
    name: "Bebek Waterfront Yali",
    location: "Bebek, Bosphorus Strait, Istanbul, Turkey",
    city: "Istanbul",
    country: "Turkey",
    price: "$440 /Night",
    type: "Waterfront Historical Villa",
    checkIn: "3:00 PM onwards (Estate manager greeting)",
    checkOut: "12:00 PM noon",
    wifi: "Bebek_Yali_Guest (300 Mbps mesh Wi-Fi 6 across villa and pier)",
    parking: "Private gated driveway for 3 vehicles with 24/7 security",
    rules: "No outdoor amplified music after 11 PM; Smoking in outdoor terraces only; Max 8 guests",
    host: "Tariq Demir (Istanbul Luxury Partner, WhatsApp +92 318 2653259)"
  },
  {
    id: "sydney-bondi",
    name: "Bondi Cliff Organic Retreat",
    location: "Bondi Beach, Sydney, Australia",
    city: "Sydney",
    country: "Australia",
    price: "$490 /Night",
    type: "Cliffside Coastal Villa",
    checkIn: "3:00 PM - 9:00 PM (Digital keypad on sandstone portico)",
    checkOut: "10:00 AM",
    wifi: "Bondi_Cliff_Organic (250 Mbps NBN broadband)",
    parking: "Secure double lock-up garage with EV charger",
    rules: "No parties or loud music outside after 9:30 PM; No glass by pool; Non-smoking; Max 6 guests",
    host: "Liam O'Connor (Sydney Partner, WhatsApp +92 318 2653259)"
  },
  {
    id: "mykonos-aegean",
    name: "Mykonos Aegean White House",
    location: "Aleomandra, Mykonos, Greece",
    city: "Mykonos",
    country: "Greece",
    price: "$395 /Night",
    type: "Cycladic White Villa",
    checkIn: "3:00 PM - 11:00 PM (Host greeting at port/airport with transfer)",
    checkOut: "11:00 AM",
    wifi: "Starlink High-speed Satellite (150 Mbps)",
    parking: "Private enclosed parking for 2 SUVs/ATVs inside villa gates",
    rules: "Conserve island water; No loud outdoor sound after midnight; Smoking outdoors only; Max 6 guests",
    host: "Nikos Vassiliou (Greece Superhost, WhatsApp +92 318 2653259)"
  },
  {
    id: "london-knightsbridge",
    name: "Knightsbridge Mews Cottage",
    location: "Knightsbridge, London SW1X, UK",
    city: "London",
    country: "UK",
    price: "$520 /Night",
    type: "Bespoke Mews Cottage",
    checkIn: "3:00 PM - 10:00 PM (Yale smart keypad on front door)",
    checkOut: "11:00 AM",
    wifi: "Knightsbridge_Mews (500 Mbps Virgin Media fiber)",
    parking: "Single private garage bay inside mews",
    rules: "Strict non-smoking throughout; Mews quiet hours 9:30 PM - 8:00 AM; Max 5 guests",
    host: "Oliver Sterling (London Host Director, WhatsApp +92 318 2653259)"
  },
  {
    id: "bali-ubud",
    name: "Ubud Jungle Canopy Villa",
    location: "Sayan Ridge, Ubud, Bali, Indonesia",
    city: "Bali",
    country: "Indonesia",
    price: "$310 /Night",
    type: "Jungle Canopy Villa",
    checkIn: "2:00 PM - 8:00 PM (Personal villa butler welcome)",
    checkOut: "12:00 PM noon",
    wifi: "Biznet Fiber 150 Mbps",
    parking: "Covered parking pavilion for 2 cars & 4 motorbikes",
    rules: "Keep mosquito netting closed around beds at dusk; Quiet retreat after 10 PM; Max 4 guests",
    host: "Wayan Darma (Bali Partner, WhatsApp +92 318 2653259)"
  },
  {
    id: "palm-jumeirah",
    name: "Palm Atlantis Beach Mansion",
    location: "Frond G, Palm Jumeirah, Dubai, UAE",
    city: "Dubai",
    country: "UAE",
    price: "$920 /Night",
    type: "Beachfront Luxury Mansion",
    checkIn: "3:00 PM onwards (Frond G security clearance required 24h prior)",
    checkOut: "11:30 AM",
    wifi: "Palm_Atlantis_Mansion (1 Gbps fiber)",
    parking: "Private motor court for 4 vehicles + 2 garage bays",
    rules: "Frond G security strictly enforces registered guests only; No outdoor DJ after 10 PM; Max 10 guests",
    host: "Elena Rostova (Dubai Partner, WhatsApp +92 318 2653259)"
  }
];

const SYSTEM_PROMPT = `You are Kynto AI Concierge, the official guest support and co-host assistant for Kynto Global.
Our business model: Kynto Global manages luxury Airbnb properties worldwide. We charge 40% Monthly or 30% Per Booking (Host earns 60% Monthly or 70% Per Booking). We handle 5-star cleaning, guest messaging, keyless check-ins, and dynamic pricing.

STRICT CONCIERGE GUIDELINES:
1. Source of Truth: Use only the provided Kynto property data.
2. Grounded answers: Answer guest questions about check-in/out, Wi-Fi, house rules, parking, amenities, directions, and local tips accurately.
3. Missing Information: If specific details are unknown or not in the data, state that host confirmation is needed and offer to connect via WhatsApp (+92 318 2653259).
4. NEVER invent private access codes, lockbox codes, private addresses, unlisted policies, or prices.
5. NEVER independently confirm bookings, discounts, refunds, or cancellations.
6. Urgent issues (safety, plumbing, leak, lockouts): Immediately direct the guest to the emergency host phone/WhatsApp (+92 318 2653259) or the official Airbnb resolution center.
7. Tone: Polite, warm, concise, professional.

Properties Data:
${JSON.stringify(KYNTO_PROPERTIES, null, 2)}
`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(501).json({
      error: 'AI API key not configured on server.',
      message: 'Server environment variable GEMINI_API_KEY is missing. Client will use verified local knowledge concierge.'
    });
  }

  try {
    const { messages, propertyId } = req.body || {};
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: "messages" array is required.' });
    }

    // Call Gemini REST API securely from server side
    const targetProperty = KYNTO_PROPERTIES.find(p => p.id === propertyId);
    const contextualPrompt = targetProperty 
      ? `${SYSTEM_PROMPT}\n\nCurrent Guest Context: Inquiring about ${targetProperty.name} in ${targetProperty.city}.`
      : SYSTEM_PROMPT;

    const formattedContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text || m.content || '' }]
    }));

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: contextualPrompt }] },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ error: 'Upstream AI service error', details: errText });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I could not generate a response. Please reach out to our concierge at +92 318 2653259.";

    return res.status(200).json({
      reply: replyText,
      mode: 'live-ai',
      propertyId: propertyId || 'general'
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
