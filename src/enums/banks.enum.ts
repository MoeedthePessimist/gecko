export enum banskEnum {
  BANK_OF_AMERICA = "Bank of America",
  JPMORGAN_CHASE = "JPMorgan Chase",
  WELLS_FARGO = "Wells Fargo",
  CITIBANK = "Citibank",
  HSBC = "HSBC",
  BARCLAYS = "Barclays",
  DEUTSCHE_BANK = "Deutsche Bank",
  BNP_PARIBAS = "BNP Paribas",
  GOLDMAN_SACHS = "Goldman Sachs",
  MORGAN_STANLEY = "Morgan Stanley",
  UBS = "UBS",
  CREDIT_SUISSE = "Credit Suisse",
  ROYAL_BANK_OF_CANADA = "Royal Bank of Canada",
  TORONTO_DOMINION_BANK = "Toronto-Dominion Bank",
  STANDARD_CHARTERED = "Standard Chartered",
  SANTANDER = "Santander",
  SOCIETE_GENERALE = "Société Générale",
  MIZUHO = "Mizuho Bank",
  SUMITOMO_MITSUI = "Sumitomo Mitsui Banking Corporation",
  BANK_OF_CHINA = "Bank of China",
  INDUSTRIAL_AND_COMMERCIAL_BANK_OF_CHINA = "Industrial and Commercial Bank of China",
  AGRICULTURAL_BANK_OF_CHINA = "Agricultural Bank of China",
  STATE_BANK_OF_INDIA = "State Bank of India",
  COMMONWEALTH_BANK = "Commonwealth Bank",
  WESTPAC = "Westpac",
  NATIONAL_AUSTRALIA_BANK = "National Australia Bank",
  ANZ = "Australia and New Zealand Banking Group",
}

export const banksList = Object.values(banskEnum).sort((a, b) =>
  a.localeCompare(b)
);

export const banksListWithCode = Object.entries(banskEnum).map(
  ([code, name]) => ({
    code: name,
    name,
  })
);
