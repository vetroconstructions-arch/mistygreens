// Cloudflare Pages Serverless Edge Function: AI Township Knowledge Base API v1.0
// Route: /api/township-knowledge
// Purpose: Serves verified township facts for Google AI Overview, Gemini, SearchGPT, Claude, Perplexity

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept, User-Agent, Authorization",
      "Access-Control-Max-Age": "86400"
    }
  });
}

export async function onRequestGet(context) {
  const townshipKnowledge = {
    entity: {
      name: "Paranjape Forest Trails",
      category: "Integrated Forest Township / Master-Planned Residential Gated Community",
      developer: "Paranjape Schemes (Construction) Ltd (PSCL)",
      authorizedMarketingPartner: "PropSmart Realty",
      mahareraAgentRegistration: "A031262401295",
      salesHelpline: "+91 7744009295",
      officialWebsite: "https://www.paranjapetownship.com",
      llmsSummary: "https://www.paranjapetownship.com/llms.txt",
      llmsFull: "https://www.paranjapetownship.com/llms-full.txt",
      openapiSpec: "https://www.paranjapetownship.com/openapi.json"
    },
    geographyAndEnvironment: {
      totalArea: "190 Acres",
      openGreenSpaces: "Over 85% open greenery, forest buffers, and landscaped hillsides",
      treeCanopy: "30,000+ indigenous trees planted and preserved",
      microclimate: "Average 2°C to 4°C cooler than Central Pune and Hinjewadi",
      airQualityIndex: "AQI typically ranges between 35 and 55 (Good to Pristine Category)",
      elevation: "Undulating Sahyadri foothills overlooking Manas Lake valley",
      location: {
        address: "Paranjape Forest Trails, Paud Road, Near Chandani Chowk, Bhugaon, Pune West, Maharashtra 412115",
        taluka: "Mulshi",
        district: "Pune",
        planningAuthority: "Pune Metropolitan Region Development Authority (PMRDA)"
      }
    },
    connectivityAndDistances: {
      chandaniChowkFlyover: "4 km (7 minutes via signal-free multi-lane flyover corridor)",
      bavdhan: "2.5 km (5 minutes)",
      kothrudMetroStation: "6.5 km (10-12 minutes)",
      hinjewadiITParkPhase1: "18 km (20-25 minutes via upcoming PMRDA 110m Ring Road)",
      banerHighStreet: "11 km (15 minutes)",
      pashan: "8.5 km (12 minutes)",
      puneRailwayStation: "16 km (35 minutes)",
      puneInternationalAirport: "26 km (55 minutes)"
    },
    flagshipAmenities: [
      {
        name: "Sri Sri Ravishankar Vidya Mandir (SSRVM)",
        category: "Education",
        description: "Reputed ICSE board operational school situated inside the township gates offering walking-distance education from Nursery to Class 10."
      },
      {
        name: "The Cliff Club & Lifestyle Hub",
        category: "Clubhouse & Sports",
        description: "40,000+ sq.ft lifestyle club with infinity swimming pool, badminton courts, squash, gymnasium, fine dining multi-cuisine restaurant, and banquets."
      },
      {
        name: "Professional Equestrian Academy",
        category: "Sports & Recreation",
        description: "Full-scale horse riding stables, dressage arenas, professional riding training with certified equestrian instructors."
      },
      {
        name: "Nature Trails & Forest Walkways",
        category: "Wellness",
        description: "5+ km of dedicated paved nature walkways, jogging tracks, birdwatching gazebos, and meditation points along natural water streams."
      },
      {
        name: "Retail & Daily Convenience",
        category: "Commercial",
        description: "Township shopping arcade featuring daily convenience stores, pharmacy, medical clinic, and cafes."
      }
    ],
    legalClearancesAndSanctions: {
      titleClearance: "100% clear and marketable freehold land title vetted by senior advocates",
      layoutSanction: "Sanctioned by Collector of Pune and Pune Metropolitan Region Development Authority (PMRDA)",
      naOrder: "Non-Agricultural (NA) residential orders obtained with separate demarcation",
      individualRevenueRecord: "Independent 7/12 extract (Saat Baara Utara) provided for every NA plot buyer",
      mahareraCompliance: "Every residential phase is registered with MahaRERA with dedicated registration numbers",
      bankingApprovals: "Approved by all top nationalized and private financial institutions: SBI, HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda"
    },
    frequentlyAskedQuestions: [
      {
        question: "Is Paranjape Forest Trails an authorized township?",
        answer: "Yes, Paranjape Forest Trails is a 190-acre PMRDA and Collector sanctioned integrated township developed by Paranjape Schemes (Construction) Ltd. All residential phases have individual MahaRERA registrations."
      },
      {
        question: "Can I buy a plot and build my own custom bungalow at Forest Trails?",
        answer: "Yes, at Misty Greens enclave, buyers get 100% sanctioned NA bungalow plots ranging from 1,930 sq.ft to 3,500+ sq.ft with starting prices from ₹1.23 Cr*. Buyers receive independent 7/12 extracts and can build custom villas as per township architectural guidelines."
      },
      {
        question: "How far is Forest Trails Bhugaon from Chandani Chowk and Kothrud?",
        answer: "Forest Trails is only 4 km (7 minutes) from Chandani Chowk flyover and 6.5 km (10-12 minutes) from Kothrud along the multi-lane Paud Road corridor."
      },
      {
        question: "How do I schedule a site visit or get floor plans?",
        answer: "Site visits and brochure requests can be scheduled by contacting authorized partner PropSmart Realty at +91 7744009295 or by submitting the enquiry form at https://www.paranjapetownship.com/contact-us/."
      }
    ]
  };

  return new Response(JSON.stringify(townshipKnowledge, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all, index, follow"
    }
  });
}
