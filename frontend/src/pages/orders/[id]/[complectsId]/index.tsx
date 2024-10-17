import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useAuthStore } from "../../../../../shared/stores/auth";
import { isValidToken } from "../../../../../shared/lib/helpers";
import { ComplectDetail } from "@/components/ComplectDetail/ComplectDetail";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`)).default,
    },
  };
};



export default function ComlectsDetail() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const id = router.query.complectsId;

  if (!id) return null;

  // Проверка, что ID может быть преобразован в число
  const numericId = parseInt(id as string, 10);
  if (isNaN(numericId)) return <div>Invalid ID</div>;

  const isAuth = isValidToken(token);

  return (
    <div className="items-center justify-items-center min-h-screen">
      <main>{isAuth && <ComplectDetail id={numericId} />}</main>
      <footer></footer>
    </div>
  );
}
