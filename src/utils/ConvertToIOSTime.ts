export function toIOSTime (value: string): string {
    if (!value) return "";
    return new Date(value).toISOString();
}