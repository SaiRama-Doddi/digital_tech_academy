import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (err: unknown) => {
    if (
      err &&
      typeof err === "object" &&
      (("code" in err && err.code === "ERR_INVALID_STATE") ||
        ("message" in err &&
          typeof err.message === "string" &&
          err.message.includes("Controller is already closed")))
    ) {
      // Ignored: Known Node 20.16 webstream adapter abort race condition
      return;
    }
    console.error("Uncaught exception in server handler:", err);
  });
}

export default createStartHandler({
  handler: defaultStreamHandler,
});
