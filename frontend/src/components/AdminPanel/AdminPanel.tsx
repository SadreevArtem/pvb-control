import clsx from "clsx";
import { menuAdmin } from "./static";
import { useState } from "react";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../../shared/stores/auth";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { useRouter } from "next/router";
import { Users } from "../Users/Users";

type Props = {
  title: string;
  className?: string;
};

export const AdminPanel: React.FC<Props> = ({title, className=""})=> {
    const [currentMenu, setCurrentMenu] = useState("users");
    const handleMenuClick = (menu: string) => setCurrentMenu(menu);
    const unAuth = useAuthStore((state) => state.unAuth);
    const {locale='ru'} = useRouter();
    const t = useTranslations('AdminPanel');
    const renderContent = () => {
      switch (currentMenu) {
        case "users":
          return <Users />;
        // case "programs":
        //   return <Programs />;
        // case "orders":
        //   return <Orders />;
        default:
          return null; // Возвращает null, если нет совпадений
      }
    };
    return (
      <>
        <div className="container mt-8 flex flex-col">
          <LocaleSwitcher className="ml-auto mr-6 mb-8" />
          <div className="flex justify-between items-center">
            <h1
              className={clsx(
                "text-primary font-semibold text-[24px]",
                className
              )}
            >
              {title}
            </h1>
            <Button onButtonClick={unAuth} title={t("signOut")}></Button>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="">
              <ul className="flex flex-col">
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
              {/* {currentMenu === "products" ? <Products />: <Orders />} */}
            </div>
          </div>
        </div>
      </>
    );
};