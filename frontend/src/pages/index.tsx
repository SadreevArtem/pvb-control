
import { Login } from "@/components/Login/Login";
import { useAuthStore } from "../../shared/stores/auth";
import { AdminPanel } from "@/components/AdminPanel/AdminPanel";
import { useEffect, useState } from "react";
import { GetStaticPropsContext } from "next";
import { UserPanel } from "@/components/UserPanel/UserPanel";
import { useJwtToken } from "../../shared/hooks/useJwtToken";

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}

export default function Home() {
  const token = useAuthStore((state) => state.token);
  const [isClient, setIsClient] = useState(false);
  const isAuth = /^[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+$/.test(token);

  const { sub } = useJwtToken();
  const isAdmin = Number(sub) === 1;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

 
  return (
    <div
      className={`items-center justify-items-center min-h-screen`}
    >
      <main className="">
      {!isAuth ? <Login /> : isAdmin? <AdminPanel title="PVB-CONTROL" /> : <UserPanel />}
      </main>
      <footer className="">
       
      </footer>
    </div>
  );
}
