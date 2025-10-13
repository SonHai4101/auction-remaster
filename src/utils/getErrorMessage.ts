export const getErrorMessage = (error: unknown) => {
    if (typeof error === "string") return error;
    if (error instanceof Error && error.message) return error.message;
    try {
      return JSON.stringify(error) || "An error occurred";
    } catch {
      return "An error occurred";
    }
  };