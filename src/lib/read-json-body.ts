type JsonBodyResult = { ok: true; body: unknown } | { ok: false; status: 400 | 408 | 413 };

// Bound bytes while reading, including chunked bodies without Content-Length.
export async function readJsonBody(request: Request, maxBytes: number, timeoutMs = 5000): Promise<JsonBodyResult> {
  if (!request.body || request.body.locked) return { ok: false, status: 400 };
  const reader = request.body.getReader();
  const deadline = AbortSignal.timeout(timeoutMs);
  // Do not await cancellation: an underlying source may never finish cancelling.
  const cancel = () => { void reader.cancel().catch(() => {}); };
  deadline.addEventListener("abort", cancel, { once: true });
  try {
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let bytes = 0, raw = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (deadline.aborted) return { ok: false, status: 408 };
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        cancel();
        return { ok: false, status: 413 };
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    return { ok: true, body: JSON.parse(raw) };
  } catch {
    cancel();
    return { ok: false, status: deadline.aborted ? 408 : 400 };
  } finally {
    deadline.removeEventListener("abort", cancel);
    reader.releaseLock();
  }
}
