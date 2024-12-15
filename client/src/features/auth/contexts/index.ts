import { createContext } from "react";

import useContextValue from "@/hooks/useContextValue";
import { User } from "@/types";

import { LoginData, RegistrationData } from "../api";

type TAuthContext = {
  user?: User;
  isLoggedIn: boolean;
  register: (data: RegistrationData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
  return useContextValue(AuthContext);
}

type TAuthorizedUserAuthContext = Omit<TAuthContext, "user"> & {
  user: User;
};

export function useAuthorizedUserAuth() {
  return useContextValue(AuthContext) as TAuthorizedUserAuthContext;
}
