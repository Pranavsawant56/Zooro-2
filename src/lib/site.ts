export const contact = {
  company: "ZOORO Hospitality Pvt. Ltd.",
  addressLines: [
    "S.No. 52-3/1, Maruti Nagar, Lane No. 4,",
    "Wadgaonsheri, Pune 411014",
  ],
  phones: [
    { display: "+91 97633 72666", href: "tel:+919763372666" },
    { display: "+91 97639 75666", href: "tel:+919763975666" },
  ],
  email: "sagar@zoorohospitality.com",
  website: "www.zoorohospitality.com",
  websiteHref: "https://www.zoorohospitality.com",
  director: "Sagar Pattanshetty",
};

export type Client = {
  name: string;
  location: string;
  logo: string | null;
  mark?: string;
};

export const clients: Client[] = [
  {
    name: "Kirloskar Brothers Limited",
    location: "Kirloskarwadi",
    logo: "/client-logos/client-kirloskar.png",
  },
  {
    name: "Godrej & Boyce Manufacturing Co. Ltd.",
    location: "Shirwal",
    logo: "/client-logos/client-godrej.png",
  },
  {
    name: "Wipro Pari",
    location: "Shirwal",
    logo: "/client-logos/client-wipro-pari.png",
  },
  {
    name: "Baja Electronics Ltd.",
    location: "Chakan, Pune",
    logo: null,
    mark: "Baja",
  },
  {
    name: "WNS Global",
    location: "Viman Nagar, Pune",
    logo: "/client-logos/client-wns.png",
  },
  {
    name: "Vodafone Idea Ltd.",
    location: "Commerzone",
    logo: "/client-logos/client-vi.png",
  },
  {
    name: "Johnson Controls India Pvt. Ltd.",
    location: "Commerzone",
    logo: "/client-logos/client-johnson-controls.png",
  },
  {
    name: "SS&C FinTech Services India Pvt. Ltd.",
    location: "Commerzone",
    logo: "/client-logos/client-ssc.png",
  },
  {
    name: "Redbrick (Sai Radhe)",
    location: "Sangamwadi",
    logo: null,
    mark: "REDBRICK",
  },
  {
    name: "Redbrick (M Ramanujan)",
    location: "Baner",
    logo: null,
    mark: "REDBRICK",
  },
  {
    name: "Angular Minds",
    location: "Baner",
    logo: "/client-logos/client-angular-minds.png",
  },
];

export const management = [
  {
    name: "Mr. Vijay Kasurde",
    role: "Management team",
    years: "23",
    description:
      "Two decades of food-industry experience across kitchen operations, menu development and large-volume service.",
  },
  {
    name: "Mr. Sagar Pattanshetty",
    role: "Director",
    years: "10",
    description:
      "A decade in the food industry, leading client relationships, menu planning and day-to-day service standards.",
  },
];

export const factSheet = [
  {
    value: "50–1,000+",
    label: "pax per service",
    note: "Minimum service capacity",
  },
  {
    value: "5+",
    label: "service formats",
    note: "Industrial, cafeteria, events, food courts, weddings & bulk",
  },
  {
    value: "3+",
    label: "cuisine families",
    note: "Indian, Chinese, Italian and custom menus",
  },
  {
    value: "23 & 10",
    label: "years of leadership",
    note: "Combined food-industry experience",
  },
];

export const operatingPlan = [
  {
    title: "Buffet lunch menu",
    description:
      "Creative, varied Pan-Indian and Chinese selections that bring variety to industrial and corporate cafeterias while keeping the comfort of healthy, home-style cooking.",
    tint: "bg-brand-red/10 text-brand-red",
  },
  {
    title: "Event calendar",
    description:
      "Festival- and event-based food offerings planned through the year, with the cafeteria ambience and menu aligned to the occasion.",
    tint: "bg-brand-gold/15 text-brand-ink",
  },
  {
    title: "Food court",
    description:
      "Additional choices beyond the regular meal menu. Selected items are separately priced and available directly from the relevant counter.",
    tint: "bg-brand-leaf/10 text-brand-leaf",
  },
  {
    title: "All-day café menu",
    description:
      "Food and beverage options inspired by regional preferences from across India, catering to diverse tastes throughout the day.",
    tint: "bg-brand-ink/5 text-brand-ink",
  },
];

export const cuisines = [
  "Maharashtrian",
  "Coastal",
  "Contemporary Indian",
  "Pan-Asian",
  "Fusion",
  "New World",
  "Indian",
  "Chinese",
  "Italian",
  "Custom menus",
];

export const additionalServices = [
  {
    title: "Food court",
    description: "Extra choices beyond the daily menu, with selected items priced separately at the counter.",
  },
  {
    title: "Weddings & bulk catering",
    description: "Menu planning and service for weddings and bulk orders of different scales.",
  },
  {
    title: "Delivery kitchen",
    description: "Corporate meals prepared in our central kitchen and packed for delivery.",
  },
];
