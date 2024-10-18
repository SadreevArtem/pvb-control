import { GetServerSideProps } from "next";
import { useAuthStore } from "../../../../shared/stores/auth";
import { useRouter } from "next/router";
import { isValidToken } from "../../../../shared/lib/helpers";
import { EquipmentTypeDetail } from "@/components/EquipmentTypeDetail/EquipmentTypeDetail";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
};

export default function EquipmentTypes() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const id = router.query.id;

  if (!id) return null;

  // Проверка, что ID может быть преобразован в число
  const numericId = parseInt(id as string, 10);
  if (isNaN(numericId)) return <div>Invalid ID</div>;

  const isAuth = isValidToken(token);

  return (
    <div className="items-center justify-items-center min-h-screen">
      <main>{isAuth && <EquipmentTypeDetail id={numericId} />}</main>
      <footer></footer>
    </div>
  );
}
