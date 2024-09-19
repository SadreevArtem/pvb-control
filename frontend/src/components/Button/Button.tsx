import clsx from "clsx";

type Props = {
  title: string;
  className?: string;
  onButtonClick?: ()=> void;
};

export const Button: React.FC<Props> = ( {title, className="", onButtonClick })=> {
    return (
        <button onClick={onButtonClick} className={clsx("button", className)} >
            {title}
        </button>
    )
};

