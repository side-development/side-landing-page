/** Rounded silhouettes follow the iPhone chat references supplied by the user. */
export function WhatsAppIcon({ name }: { name: "phone" | "video" | "camera" | "mic" | "team" | "crm" | "spark" | "back" | "plus" | "sticker" | "read" }) {
  const paths = {
    phone: "M7.2 3.5c-.4-.8-1.1-1-1.8-.6L3.7 4C2.4 4.8 2.9 8 4.8 11.3c2.1 3.6 4.9 6.4 8.4 8.2 3 1.6 5.7 2 6.5.8l1.1-1.8c.4-.7.1-1.4-.6-1.8l-3.6-1.8c-.7-.4-1.3-.2-1.7.4l-1 1.3c-2.6-1.2-5.3-3.9-6.6-6.5l1.4-1c.6-.4.8-1 .4-1.7L7.2 3.5Z",
    video: "M5 5.5h9a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 16V8A2.5 2.5 0 0 1 5 5.5ZM16.5 9l4-2.5a.8.8 0 0 1 1.2.7v9.6a.8.8 0 0 1-1.2.7l-4-2.5",
    camera: "M8 5.5l1-2h6l1 2h3a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 19V8A2.5 2.5 0 0 1 5 5.5H8ZM16 12.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM18.5 8h.01",
    mic: "M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5ZM5.5 10.5V12a6.5 6.5 0 0 0 13 0v-1.5M12 18.5V22M9 22h6",
    team: "M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 20v-2a8 8 0 0 1 16 0v2M18 3a3 3 0 0 1 0 6M21 13v6",
    crm: "M4 3h16v18H4ZM8 8h8M8 12h8M8 16h5",
    spark: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z",
    back: "M15 4l-8 8 8 8",
    plus: "M12 4v16M4 12h16",
    sticker: "M20.5 14V8A4.5 4.5 0 0 0 16 3.5H8A4.5 4.5 0 0 0 3.5 8v8A4.5 4.5 0 0 0 8 20.5h6c4 0 6.5-2.5 6.5-6.5ZM14 20.5V18a4 4 0 0 1 4-4h2.5",
    read: "M2 12l4 4L16 6M10 15l1 1L21 6",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={name === "back" ? 2.8 : 1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
