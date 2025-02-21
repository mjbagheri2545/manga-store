import { createContext } from "react";

import { useContextValue } from "@/hooks";
import { LoginData, RegistrationData } from "@/schemas/auth.schema";
import { User } from "@/types";

type UserState =
  | {
      user: User;
      isLoggedIn: true;
    }
  | { isLoggedIn: false };

export type TAuthContext = {
  register: (data: RegistrationData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
} & UserState;

export const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
  return useContextValue(AuthContext);
}
