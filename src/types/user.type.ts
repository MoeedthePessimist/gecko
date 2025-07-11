import { addressTypesEnum } from "@/enums/address-types.enum";
import { countriesEnum } from "@/enums/countries.enum";
import { gendersEnum } from "@/enums/genders.enum";
import { identitiesEnum } from "@/enums/identities.enum";
import { maritalStatusesEnum } from "@/enums/marital-statuses.enum";
import { nationalitiesEnum } from "@/enums/nationalities.enum";
import { raceEnum } from "@/enums/race.enum";
import { rolesEnum } from "@/enums/roles.enum";
import { BaseType } from "./base.type";
import { Company } from "./company.type";

export type User = BaseType & {
  name: string;
  email: string;
  password?: string;
  isEmailVerified: boolean;
  identityNumber: string;
  identityType: identitiesEnum | string;
  dateOfBirth: Date | null;
  addressType: addressTypesEnum | string;
  country: countriesEnum | string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  gender: gendersEnum | string;
  race: raceEnum | string;
  mobileNumber: string;
  roles: rolesEnum[] | string[];
  avatar: string;
  nationality: nationalitiesEnum | string;
  maritalStatus: maritalStatusesEnum | string;
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
  company?: string | Company;
};
