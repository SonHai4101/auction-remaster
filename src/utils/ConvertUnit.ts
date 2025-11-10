import { DURATION } from "@/constants/types";

export function toIOSTime(value: string): string {
  if (!value) return "";
  return new Date(value).toISOString();
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

export const slugify = (str: string) => {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
};

export const durationToMs = (duration: DURATION): number => {
  switch (duration) {
    case DURATION.ONEDAYS:
      return 1 * 24 * 60 * 60 * 1000;
    case DURATION.THREEDAYS:
      return 3 * 24 * 60 * 60 * 1000;
    case DURATION.SEVENDAYS:
      return 7 * 24 * 60 * 60 * 1000;
    case DURATION.TENDAYS:
      return 10 * 24 * 60 * 60 * 1000;
    case DURATION.FOURTEENDAYS:
      return 14 * 24 * 60 * 60 * 1000;
    default:
      return 1 * 24 * 60 * 60 * 1000;
  }
};
