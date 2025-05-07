export type User = {
  name: string;
  email: string;
  password?: string; // not selected by default
  isEmailVerified: boolean;
  identityNumber: string;
  identityType: string; // identitiesEnum
  dateOfBirth: Date | null;
  addressType: string; // addressTypesEnum
  country: string; // countriesEnum
  address: string;
  postalCode: string;
  city: string;
  state: string;
  gender: string; // gendersEnum
  race: string; // raceEnum
  mobileNumber: string;
  roles: string[]; // rolesEnum[]
  avatar: string;
  nationality: string; // nationalitiesEnum
  maritalStatus: string; // maritalStatusesEnum
  cpfNumber?: string;
  taxNumber?: string;

  // Relations
  bank?: string;
  job?: string;
  workTable?: string;
  leaveTable?: string;
  employment?: string;
  qualifications?: string[];
  contacts?: string[];
  documents?: string[];
  payslips?: string[];
  commissions?: string[];
  claims?: string[];
  overtimes?: string[];
  todos?: string[];
  leaves?: string[];
  company?: string;
};
