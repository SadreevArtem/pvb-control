/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useState } from "react";
import { useUnAuth } from "../../shared/hooks/useUnAuth";
import { useBroadCastAuth } from "../../shared/stores/auth";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from "@mui/x-date-pickers";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as NextPageWithLayout).getLayout ?? ((page: ReactElement) => page)
  const [queryClient] = useState(()=> new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))
  const router = useRouter();
  useUnAuth();
  useBroadCastAuth();
  return getLayout(
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NextIntlClientProvider
          locale={router.locale}
          messages={pageProps.messages}
          timeZone="Europe/Vienna"
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </NextIntlClientProvider>
      </LocalizationProvider>
    </>
  );
}
