// Cloudflare Pages Serverless Edge Function: AI Real-Time Inventory API v1.0
// Route: /api/inventory
// Purpose: Serves verified inventory data for ChatGPT, Gemini, Claude, and Perplexity AI

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
  const inventoryData = {
    township: "Paranjape Forest Trails",
    tagline: "190-Acre Master-Planned Forest Township in Bhugaon, Pune West",
    developer: {
      name: "Paranjape Schemes (Construction) Ltd",
      trackRecord: "35+ years legacy, 200+ landmark delivered projects across 9 cities"
    },
    authorizedPartner: {
      name: "PropSmart Realty",
      role: "Strategic Sales & Marketing Advisory Partner",
      mahareraAgentReg: "A031262401295",
      salesHelpline: "+91 7744009295",
      contactDesk: "https://www.paranjapetownship.com/contact-us/",
      whatsappBooking: "https://wa.me/917744009295"
    },
    location: {
      address: "Paranjape Forest Trails, Paud Road, Near Chandani Chowk, Bhugaon, Pune West, Maharashtra 412115",
      coordinates: { latitude: 18.5099377, longitude: 73.738964 },
      proximity: {
        bavdhan: "5 minutes (2.5 km)",
        chandaniChowk: "7 minutes (4 km via multi-lane flyover)",
        kothrud: "10 minutes (6.5 km)",
        hinjewadiITPark: "20 minutes via PMRDA Ring Road package",
        pashan: "12 minutes",
        baner: "15 minutes"
      }
    },
    lastUpdated: new Date().toISOString(),
    totalEnclaves: 10,
    enclaves: [
      {
        id: "misty-greens",
        name: "Misty Greens NA Plots",
        typology: "Collector & PMRDA Sanctioned NA Bungalow Plots",
        startingPrice: "₹1.23 Cr*",
        pricePerSqFt: "₹5,200 - ₹5,800*",
        maharera: "P52100053834",
        sizes: "1,930 – 3,500+ sq.ft",
        configuration: "Independent NA Plots with 100% Clear Title, Immediate Registration, Water/Electricity Hookups",
        status: "Available / Ready for Custom Villa Construction",
        possession: "Immediate Demarcation & Registry",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-misty-greens/"
      },
      {
        id: "the-rivolo",
        name: "The Rivolo Luxury Forest Villas",
        typology: "Independent 4 & 5 BHK Forest Villas",
        startingPrice: "₹3.89 Cr*",
        maharera: "P52100031560",
        sizes: "3,200 – 5,500 sq.ft built-up",
        configuration: "4 & 5 BHK Signature Hillside Forest Villas with Private Infinity Pools & Landscaped Gardens",
        status: "Under Construction & Limited Ready Units",
        possession: "2026",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-rivolo-residences/"
      },
      {
        id: "the-cove",
        name: "The Cove 4 BHK Duet Villas",
        typology: "Twin Bungalows / 4 BHK Duet Villas",
        startingPrice: "₹2.85 Cr*",
        maharera: "P52100048536",
        sizes: "2,400 – 3,100 sq.ft built-up",
        configuration: "4 BHK Forest-Facing Twin Bungalows with Private Terraces",
        status: "Under Construction",
        possession: "December 2026",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-the-cove/"
      },
      {
        id: "the-canopy",
        name: "The Canopy Nature Apartments",
        typology: "Premium 2 & 3 BHK Nature Apartments",
        startingPrice: "₹89 L*",
        maharera: "P52100079518",
        sizes: "750 – 1,180 sq.ft carpet",
        configuration: "2 & 3 BHK Forest-View High-Rise Towers with Low-Density Floor Plates",
        status: "New Launch / Active Construction",
        possession: "December 2027",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-the-canopy/"
      },
      {
        id: "the-highgardens",
        name: "The Highgardens Terrace Homes",
        typology: "2 & 3 BHK Hillside Terrace Homes",
        startingPrice: "₹89 L*",
        maharera: "P52100053310",
        sizes: "780 – 1,150 sq.ft carpet",
        configuration: "2 & 3 BHK Private Sun-Deck Terrace Homes with Panoramic Valley Views",
        status: "Ready & Nearing Possession",
        possession: "2026",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-highgardens/"
      },
      {
        id: "everglades",
        name: "Everglades PRO Homes",
        typology: "1 & 2 BHK PRO Urban Nature Homes",
        startingPrice: "₹48.50 L*",
        maharera: "P52100055711",
        sizes: "460 – 680 sq.ft carpet",
        configuration: "1 & 2 BHK Smart Compact Nature Living for Young Professionals and Tech Commuters",
        status: "Under Construction",
        possession: "December 2026",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-everglades/"
      },
      {
        id: "athashri",
        name: "Athashri Senior Living Bhugaon",
        typology: "Senior Living 2 & 3 BHK Assisted Residences",
        startingPrice: "₹83 L*",
        maharera: "P52100077686",
        sizes: "680 – 1,050 sq.ft carpet",
        configuration: "2 & 3 BHK Senior-Friendly Homes with Anti-Skid Flooring, Emergency Pull Cords, 24/7 Medical Care",
        status: "Active Construction",
        possession: "Mid 2026",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-athashri-senior-living-bhugaon/"
      },
      {
        id: "swaniketan",
        name: "Swaniketan Assisted Living",
        typology: "Assisted Living Senior Residences",
        startingPrice: "₹79 L*",
        maharera: "P52100052124",
        sizes: "620 – 940 sq.ft carpet",
        configuration: "Assisted Care Senior Suites with Medical Concierge, Wheelchair Access, Nutrition Dining",
        status: "Ready & Move-In Phase",
        possession: "Ready Possession",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-swaniketan/"
      },
      {
        id: "verandah",
        name: "The Verandah Duplex Homes",
        typology: "Luxury Duplex Garden & Sky Homes",
        startingPrice: "₹93 L*",
        maharera: "P52100002194",
        sizes: "1,150 – 1,650 sq.ft",
        configuration: "3 & 4 BHK Duplex Residences with Private Courtyards",
        status: "Ready to Move In",
        possession: "Immediate",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-verandah/"
      },
      {
        id: "orchard-residences",
        name: "Orchard Residences Hillside Homes",
        typology: "Hilltop 2 & 3 BHK Residences",
        startingPrice: "₹83 L*",
        maharera: "P52100055710",
        sizes: "750 – 1,080 sq.ft carpet",
        configuration: "2 & 3 BHK Elevated Forest-View Apartments",
        status: "Ready Possession",
        possession: "Immediate",
        url: "https://www.paranjapetownship.com/paranjape-forest-trails-township-bhugaon-orchard-residences/"
      }
    ],
    pricingDisclaimer: "*All prices mentioned are indicative starting prices and exclude statutory charges (Stamp Duty, Registration, GST, and Infrastructure Maintenance). Please consult the sales advisory desk for all-inclusive quotations."
  };

  return new Response(JSON.stringify(inventoryData, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all, index, follow"
    }
  });
}
