import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type Props = {
    title: string;
    className?: string;
    onButtonClick?: (event: React.MouseEvent)=> void;
  } & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ( {title, className="", onButtonClick })=> {
    return (
        <button onClick={onButtonClick} className={clsx("button", className)} >
            {title}
        </button>
    )
};

