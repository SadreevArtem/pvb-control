import clsx from "clsx";

type Props = {
  title: string;
  className?: string;
  onButtonClick?: ()=> void;
};

export const Button: React.FC<Props> = ( {title, className="", onButtonClick })=> {
    return (
        <button onClick={onButtonClick} className={clsx("bg-[#d1baba] h-[35px] rounded-2 w-[100px] text-white", className)} >
            {title}
        </button>
    )
};

