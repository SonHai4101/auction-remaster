export function toIOSTime (value: string): string {
    if (!value) return "";
    return new Date(value).toISOString();
}

export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US").format(value);
}

export const slugify = (str: string) => {
    return str.toLowerCase().trim().replace(/\s+/g, "-")
}