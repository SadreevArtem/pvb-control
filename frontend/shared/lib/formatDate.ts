import dayjs from "dayjs";
import "dayjs/locale/ru";

export const formatDate = (
  value: unknown,
  locale = "ru",
  template = "DD.MM.YYYY",
  localizedRu = false
) => {
  if (typeof value !== "string") {
    return "-";
  }

  let result = dayjs(value.replace("Z", "")).locale(locale).format(template);

  if (localizedRu) {
    result = result.replace(/ь$/, "я").replace(/т$/, "та").replace(/й$/, "я");
  }
  return result;
};
