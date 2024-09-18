import clsx from "clsx";
import { menuAdmin } from "./static";
import { useState } from "react";
import { Button } from "../Button/Button";
import { useAuthStore } from "../../../shared/stores/auth";

type Props = {
  title: string;
  className?: string;
};

export const AdminPanel: React.FC<Props> = ({title, className=""})=> {
    const [currentMenu, setCurrentMenu] = useState("products");
    const handleMenuClick = (menu: string) => setCurrentMenu(menu);
    const unAuth = useAuthStore((state) => state.unAuth);
    return (
      <>
      <div className="container mt-8">
        <div className="flex justify-between">
          <h1 className={clsx("text-primary font-semibold text-xl", className)}>
            {title}
          </h1>
          <Button onButtonClick={unAuth} title="Выйти"></Button>
        </div>
        <div className="flex mt-6 gap-4">
          <div className="w-[25%] h-[60vh] bg-orange-200 p-4 rounded-lg">
            <ul className="flex flex-col gap-4">
              {menuAdmin.map((item) => (
                <li className="" key={item.id}>
                  <button onClick={() => handleMenuClick(item.name)}>
                    {item.value}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            меню{currentMenu}
            {/* {currentMenu === "products" ? <Products />: <Orders />} */}
          </div>
        </div>
      </div>
      </>
    );
};