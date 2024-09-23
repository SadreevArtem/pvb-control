import { create } from "zustand";
import Cookies from "js-cookie";
import { useEffect } from "react";

const authChannel = new BroadcastChannel("auth");

export type AuthState = {
  token: string;
  auth: (_token: string) => void;
  unAuth: () => void;
  broadcastAuth: (_token: string) => void;
  broadcastUnAuth: () => void;
};

export const tokenStorageKey = "__token";

export const useAuthStore = create<AuthState>(
    (set): AuthState => ({
        token: Cookies.get(tokenStorageKey) ?? "",
        auth: (token: string) => {
          Cookies.set(tokenStorageKey, token);
          set(() => ({ token }));
          authChannel.postMessage("login");
        },
        broadcastAuth: (token: string) => {
          Cookies.set(tokenStorageKey, token);
          set(() => ({ token }));
        },
        unAuth: () => {
          Cookies.remove(tokenStorageKey);
          authChannel.postMessage("logout");
          set(() => ({ token: "" }));
        },
        broadcastUnAuth: () => {
          Cookies.remove(tokenStorageKey);
          set(() => ({ token: "" }));
        }
      })
);

authChannel.onmessage = (event) => {
    const message = event?.data;
    if (event.source === window.self) {
      return;
    }
  
    if (message === "logout") {
      useAuthStore.getState().broadcastUnAuth();
    } else if (message === "login") {
      useAuthStore.getState().broadcastAuth(Cookies.get(tokenStorageKey) ?? "");
    }
  };

  export const useBroadCastAuth = () => {
    let prevToken: string;
    useEffect(() => {
      const authChannel = new BroadcastChannel("auth");
      useAuthStore.subscribe((state) => {
        const token = state.token;
  
        if (prevToken === token) {
          return;
        }
  
        if (token) {
          authChannel.postMessage("login");
        } else {
          authChannel.postMessage("logout");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        prevToken = token;
      });
  
      const handleMessage = (event: MessageEvent) => {
        const message = event?.data;
        if (event.source === window.self) {
          return;
        }
  
        if (message === "logout") {
          useAuthStore.getState().broadcastUnAuth();
        } else if (message === "login") {
          useAuthStore.getState().broadcastAuth(Cookies.get(tokenStorageKey) ?? "");
        }
      };
  
      authChannel.addEventListener("message", handleMessage);
  
      return () => {
        authChannel.removeEventListener("message", handleMessage);
      };
    }, []);
  };