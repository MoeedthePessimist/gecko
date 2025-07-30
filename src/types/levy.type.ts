export type Levy = {
  sector: string;
  skillLevel: string;
  quotaTier?: string;
  levyAmount: number;
  effectiveDate: Date;
  expiryDate: Date;
};
