export enum industriesEnum {
  AGRICULTURE = "Agriculture",
  AUTOMOTIVE = "Automotive",
  AVIATION = "Aviation",
  BANKING = "Banking",
  BIOTECHNOLOGY = "Biotechnology",
  CONSTRUCTION = "Construction",
  CONSULTING = "Consulting",
  CONSUMER_GOODS = "Consumer Goods",
  EDUCATION = "Education",
  ENERGY = "Energy",
  ENTERTAINMENT = "Entertainment",
  ENVIRONMENTAL_SERVICES = "Environmental Services",
  FINANCIAL_SERVICES = "Financial Services",
  FOOD_AND_BEVERAGE = "Food & Beverage",
  GOVERNMENT = "Government",
  HEALTHCARE = "Healthcare",
  HOSPITALITY = "Hospitality",
  INFORMATION_TECHNOLOGY = "Information Technology",
  INSURANCE = "Insurance",
  LEGAL = "Legal",
  LOGISTICS = "Logistics",
  MANUFACTURING = "Manufacturing",
  MARKETING = "Marketing",
  MEDIA = "Media",
  MINING = "Mining",
  NON_PROFIT = "Non-Profit",
  OIL_AND_GAS = "Oil & Gas",
  PHARMACEUTICAL = "Pharmaceutical",
  REAL_ESTATE = "Real Estate",
  RETAIL = "Retail",
  SHIPPING = "Shipping",
  SPORTS = "Sports",
  TELECOMMUNICATIONS = "Telecommunications",
  TEXTILES = "Textiles",
  TOURISM = "Tourism",
  TRANSPORTATION = "Transportation",
  UTILITIES = "Utilities",
  WHOLESALE = "Wholesale",
  OTHER = "Other",
}

export const industriesList = Object.values(industriesEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const industriesListWithCode = Object.entries(industriesEnum).map(
  ([_, name]) => ({
    code: name,
    name,
  })
);
