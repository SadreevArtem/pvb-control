export const menuAdmin: {
  id: number;
  name: string;
  value: { [key: string]: string };
}[] = [
  {
    id: 1,
    name: "users",
    value: { ru: "Пользователи", en: "Users" },
  },
  {
    id: 2,
    name: "orders",
    value: { ru: "Заказы", en: "Orders" },
  },
  {
    id: 3,
    name: "reference",
    value: { ru: "Справочники", en: "Reference books" },
  },
];