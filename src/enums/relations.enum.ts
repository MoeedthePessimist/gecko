// relations (family) enum
export enum relationsEnum {
  AUNTY = 'Aunty',
  BROTHER = 'Brother',
  BROTHER_IN_LAW = 'Brother in-law',
  DAUGHTER = 'Daughter',
  FATHER = 'Father',
  GRAND_FATHER = 'Grand Father',
  GRAND_MOTHER = 'Grand Mother',
  GUARDIAN = 'Guardian',
  HUSBAND = 'Husband',
  MOTHER = 'Mother',
  SISTER = 'Sister',
  SISTER_IN_LAW = 'Sister in-law',
  SON = 'Son',
  UNCLE = 'Uncle',
  WIFE = 'Wife',
  OTHER = 'Other',
}

export const relationsList = Object.values(relationsEnum).sort((a, b) =>
  a.localeCompare(b),
);

export const relationsListWithCode = Object.entries(relationsEnum).map(
  ([code, name]) => ({
    code,
    name,
  }),
);
