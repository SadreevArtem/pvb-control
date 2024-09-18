
import { Login } from "@/components/Login/Login";
import { useAuthStore } from "../../shared/stores/auth";
import { AdminPanel } from "@/components/AdminPanel/AdminPanel";



export default function Home() {
  const token = useAuthStore((state) => state.token);
  const isAuth = !!token;
  return (
    <div
      className={`items-center justify-items-center min-h-screen`}
    >
      <main className="">
      {!isAuth ? <Login /> : <AdminPanel title="Управление контентом" />}
      </main>
      <footer className="">
       
      </footer>
    </div>
  );
}
