import dayjs, { ConfigType } from "dayjs";

export const isValidToken = (token: string) => {
    return /^[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+?\.[a-zA-Z0-9-_]+$/.test(token);
  };

  export const baseDateValidation = {
    validate: {
      isValidDate: (value: ConfigType) => {
        return !value || dayjs(value).isValid() || "Invalid date";
      },
      isValidMinDate: (value: ConfigType) =>
        !value || dayjs(value).isAfter(dayjs("1900-01-01T00:00:00.000")) || "Invalid min date",
      isValidMaxDate: (value: ConfigType) =>
        !value || dayjs(value).isBefore(dayjs("2100-01-01T00:00:00.000")) || "Invalid max date"
    }
  };