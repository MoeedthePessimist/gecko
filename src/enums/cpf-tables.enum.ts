export enum cpfTablesEnum {
  NON_CPF = 'Non CPF',
  TABLE_A1_ANNEX_A = 'Table A1 Annex A',
  TABLE_A2_ANNEX_C = 'Table A2 Annex C',
  TABLE_B_ANNEX_d = 'Table B Annex D',
  TABLE_B_ANNEX_F = 'Table B Annex F',
}

export const cpfTablesList = Object.values(cpfTablesEnum).sort((a, b) =>
  a.localeCompare(b),
);

export const cpfTablesListWithCode = Object.entries(cpfTablesEnum).map(
  ([code, name]) => ({
    code,
    name,
  }),
);
