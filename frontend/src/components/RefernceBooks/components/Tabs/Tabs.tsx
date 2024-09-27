import clsx from "clsx";
import { References } from "../../types";
import { reference } from "./static";



type Props = {
    currentTab: string;
    setTab: (tab: References) => void;
}


export const Tabs: React.FC<Props> = ({ currentTab, setTab }) => {
  return (
    <>
      <div className="flex">
        <ul className="flex gap-4 flex-wrap ">
          {reference.map((item) => (
            <li
              className={clsx(
                {
                  "border-b-4 border-red":
                    currentTab === item.categoryName,
                },
                "cursor-pointer text-[18px] px-[15px] py-[10px] font-bold text-primary"
              )}
              onClick={() => setTab(item.categoryName)}
              key={item.categoryName}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};