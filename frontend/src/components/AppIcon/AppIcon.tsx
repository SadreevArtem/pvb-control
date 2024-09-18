import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { IconType } from "./types";
import clsx from "clsx";

const StarFilled = dynamic(
  () => import("./components/StarFilled").then((module) => module.StarFilled),
  {
    ssr: false
  }
);

const Close = dynamic(() => import("./components/Close").then((module) => module.Close), {
  ssr: false
});
const Phone = dynamic(() => import("./components/Phone").then((module) => module.Phone), {
  ssr: false
});
const ChevronRight = dynamic(
  () => import("./components/ChevronRight").then((module) => module.ChevronRight),
  {
    ssr: false
  }
);
const Search = dynamic(() => import("./components/Search").then((module) => module.Search), {
  ssr: false
});
const Favorite = dynamic(() => import("./components/Favorite").then((module) => module.Favorite), {
  ssr: false
});
const Cart = dynamic(() => import("./components/Cart").then((module) => module.Cart), {
  ssr: false
});
const PasswordHide = dynamic(
  () => import("./components/PasswordHide").then((module) => module.PasswordHide),
  {
    ssr: false
  }
);
const PasswordShow = dynamic(
  () => import("./components/PasswordShow").then((module) => module.PasswordShow),
  {
    ssr: false
  }
);
const FavoriteOutlined = dynamic(
  () => import("./components/FavoriteOutlined").then((module) => module.FavoriteOutlined),
  {
    ssr: false
  }
);
const Check = dynamic(() => import("./components/Check").then((module) => module.Check), {
  ssr: false
});

const Block = dynamic(() => import("./components/Block").then((module) => module.Block), {
  ssr: false
});

type Props = {
  type: IconType;
  className?: string;
};

const icons: Record<IconType, (className: string) => ReactNode> = {
  "star-filled": (className) => <StarFilled className={className} />,
  close: (className) => <Close className={className} />,
  phone: (className) => <Phone className={className} />,
  "chevron-right": (className) => <ChevronRight className={className} />,
  search: (className) => <Search className={className} />,
  favorite: (className) => <Favorite className={className} />,
  cart: (className) => <Cart className={className} />,
  "password-hide": (className) => <PasswordHide className={className} />,
  "password-show": (className) => <PasswordShow className={className} />,
  "favorite-outlined": (className) => <FavoriteOutlined className={className} />,
  check: (className) => <Check className={className} />,
  block: (className) => <Block className={className} />,
};

export const AppIcon: React.FC<Props> = ({ type, className = ""}) => {
  return <>{icons[type](clsx(className, "shrink-0"))}</>;
};
