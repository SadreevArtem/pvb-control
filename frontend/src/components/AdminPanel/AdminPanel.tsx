import clsx from "clsx";
import { menuAdmin } from "./static";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../../shared/stores/auth";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { useRouter } from "next/router";
import { Users } from "../Users/Users";
import Image from "next/image";
import { ReferenceBooks } from "../RefernceBooks/ReferenceBooks";
import { useMenuStore } from "../../../shared/stores/menu";

type Props = {
  title: string;
  className?: string;
};

export const AdminPanel: React.FC<Props> = ({title, className=""})=> {
  const { currentMenu, setCurrentMenu } = useMenuStore();
  
    const unAuth = useAuthStore((state) => state.unAuth);
    const {locale='ru'} = useRouter();
    const t = useTranslations('AdminPanel');
    const renderContent = () => {
      switch (currentMenu) {
        case "users":
          return <Users />;
        case "reference":
          return <ReferenceBooks />;
        // case "orders":
        //   return <Orders />;
        default:
          return null; // Возвращает null, если нет совпадений
      }
    };
    const handleMenuClick = (menu: string) => {
      setCurrentMenu(menu); // сохраняем текущее меню в Zustand и localStorage
    };
    return (
      <>
        <div className="container mt-8 flex flex-col">
          <LocaleSwitcher className="ml-auto mr-6 mb-8" />
          <div className="flex justify-between items-center">
            <div className="flex items-end">
              <Image
                src="/logo-max.png"
                alt="logo"
                width={100}
                height={100}
                className="self-center"
              />
              <h1
                className={clsx(
                  "text-primary font-semibold text-[24px]",
                  className
                )}
              >
                {title}
              </h1>
            </div>
            <Button onButtonClick={unAuth} title={t("signOut")}></Button>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="">
              <ul className="flex flex-col mt-12">
                {menuAdmin.map((item) => (
                  <li
                    onClick={() => handleMenuClick(item.name)}
                    className={clsx(
                      {
                        "!bg-primary text-white": currentMenu === item.name,
                      },
                      "cursor-pointer text-[18px] px-[15px] py-[10px] font-bold bg-tab md:min-w-[260px] md:min-h-[47px] mb-[2px] rounded-[0.25rem] w-full"
                    )}
                    key={item.id}
                  >
                    <button>{item.value[locale]}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </>
    );
};