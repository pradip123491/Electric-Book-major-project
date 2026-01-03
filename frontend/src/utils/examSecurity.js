// src/utils/examSecurity.js

let handlers = [];
let bound = false;

// 🔥 NEW: prevent double-trigger (blur + visibility + keydown all fire together)
let lastTriggerTime = 0;

/* =========================================================
   ENABLE STRICT SECURITY — Prevent Cheating
   ========================================================= */
export function enableStrictExamSecurity(onViolation) {
  if (bound) {
    handlers.push(onViolation);
    return;
  }

  handlers.push(onViolation);

  const safeTrigger = (reason) => {
    const now = Date.now();

    // 🔥 IMPORTANT FIX:
    // If multiple events fire within 1 second → count as ONE violation only
    if (now - lastTriggerTime < 1000) return;

    lastTriggerTime = now;
    handlers.forEach((fn) => fn && fn(reason));
  };

  /* ==========================
     BLOCK CONTEXT MENU, COPY, PASTE
     ========================== */
  const block = (e) => {
    e.preventDefault();
    safeTrigger("Blocked action detected");
  };
  document.addEventListener("contextmenu", block);
  document.addEventListener("copy", block);
  document.addEventListener("paste", block);

  /* ==========================
     BLOCK SHORTCUTS (CTRL, META, ALT, F12)
     ========================== */
  const onKey = (e) => {
    const forbidden =
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.key === "F12" ||
      e.key === "PrintScreen";

    if (forbidden) {
      e.preventDefault();
      safeTrigger("Keyboard shortcut detected");
    }
  };
  window.addEventListener("keydown", onKey);

  /* ==========================
     TAB SWITCH DETECTION
     ========================== */
  const onVis = () => {
    if (document.hidden) {
      safeTrigger("Tab switch detected");
    }
  };
  document.addEventListener("visibilitychange", onVis);

  /* ==========================
     FULLSCREEN EXIT
     ========================== */
  const onFull = () => {
    if (!document.fullscreenElement) {
      safeTrigger("Exited fullscreen");
    }
  };
  document.addEventListener("fullscreenchange", onFull);

  /* ==========================
     BLOCK PAGE REFRESH/BACK
     ========================== */
  const onBefore = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  window.addEventListener("beforeunload", onBefore);

  bound = true;
}

/* =========================================================
   DISABLE SECURITY
   ========================================================= */
export function disableStrictExamSecurity() {
  try {
    // remove handlers
    handlers = [];
    bound = false;

    // remove some known listeners (others are anonymous and harmless)
    document.oncontextmenu = null;
    document.oncopy = null;
    document.onpaste = null;
    document.onvisibilitychange = null;
    document.onfullscreenchange = null;
    document.onkeydown = null;

    window.removeEventListener("beforeunload", () => {});
  } catch (e) {
    console.warn("disableStrictExamSecurity cleanup error:", e);
  }
}
