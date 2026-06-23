export const logInfo = (message: string, meta?: Record<string, unknown>) => {
  console.info("[INFO]", message, meta ?? "");
};

export const logError = (error: unknown, meta?: Record<string, unknown>) => {
  console.error("[ERROR]", error, meta ?? "");
};
