import { rolesEnum } from "@/enums/roles.enum";
import { User } from "./user.type";

export type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  role: rolesEnum | string;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  setRole: (role: rolesEnum) => void;
};
