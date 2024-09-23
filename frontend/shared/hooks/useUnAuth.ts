
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useAuthStore } from "../stores/auth";
import { TJwtPayload } from "../types";

export const useUnAuth = () => {
  const { token, unAuth } = useAuthStore((state) => state);

  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode<TJwtPayload>(token);
      const isExpired = dayjs.unix(exp).isBefore(dayjs());

      if (isExpired) {
        unAuth();
      }
    }
  }, [token, unAuth]);
};
