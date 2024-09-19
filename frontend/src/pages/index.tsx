
import { Login } from "@/components/Login/Login";
import { useAuthStore } from "../../shared/stores/auth";
import { AdminPanel } from "@/components/AdminPanel/AdminPanel";
import { useEffect, useState } from "react";



export default function Home() {
  const token = useAuthStore((state) => state.token);
  const [isClient, setIsClient] = useState(false);
  const isAuth = /^[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+$/.test(token);

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
      {!isAuth ? <Login /> : <AdminPanel title="PVB-CONTROL" />}
      </main>
      <footer className="">
       
      </footer>
    </div>
  );
}
