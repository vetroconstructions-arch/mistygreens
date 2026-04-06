const CLUSTER_FAQS = {
    "plots": [
        {
            "q": "What is the starting price for NA Bungalow Plots in Paranjape Forest Trails Bhugaon?",
            "a": "NA Bungalow plots in Paranjape Forest Trails start from ₹1.23 Cr*. Pricing varies based on plot size and orientation. Contact us for the April 2026 live price list."
        },
        {
            "q": "Is Misty Greens a RERA registered project?",
            "a": "Yes, Misty Greens [P52100030283] is a fully RERA-compliant gated community within the 190-acre Forest Trails township."
        },
        {
            "q": "Can I build a custom villa on these plots?",
            "a": "Absolutely. These are NA (Non-Agricultural) plots with full bungalow sanctions, allowing you to design your bespoke retreat according to township norms."
        }
    ],
    "villas": [
        {
            "q": "Are there ready-to-move villas available in Paranjape Forest Trails?",
            "a": "We offer a mix of ready-to-move luxury forest villas and under-construction premium bungalows. Contact our advisor for the latest inventory status."
        },
        {
            "q": "What are the world-class amenities at Forest Trails Villas?",
            "a": "Residents enjoy exclusive access to 'The Cliff Club', an Equestrian Academy, over 30,000 oxygen trees, and premium wellness facilities within 190 acres."
        }
    ],
    "apartments": [
        {
            "q": "What configurations are available in The Canopy at Forest Trails?",
            "a": "The Canopy offers premium 2 & 3 BHK residences designed for low-density living with massive decks and valley-facing views."
        },
        {
            "q": "How close is the nearest school to Forest Trails apartments?",
            "a": "The Sri Sri Ravishankar Vidya Mandir (SSRVM) is located within the 190-acre Forest Trails township, just 2-5 minutes from all apartment clusters."
        }
    ],
    "connectivity": [
        {
            "q": "How far is Paranjape Forest Trails from Chandani Chowk and Kothrud?",
            "a": "Paranjape Forest Trails is 8 minutes from Chandani Chowk and 12-15 minutes from the heart of Kothrud, Pune West."
        },
        {
            "q": "Is there public transport connectivity to Bhugaon?",
            "a": "Bhugaon is well-connected via the Paud Road corridor, with the upcoming PMRDA Ring Road further enhancing connectivity to Hinjewadi and Baner."
        }
    ]
};

function getFaqSchema(clusterType) {
    const faqs = CLUSTER_FAQS[clusterType] || CLUSTER_FAQS["connectivity"];
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };
}

module.exports = { getFaqSchema };
