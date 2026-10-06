export const serviceRevealDuration = 1.8;

export function serviceEntrance(node: HTMLElement) {
  const stage = node.closest("[data-service-chapter]")?.querySelector<HTMLElement>("[data-service-title-stage]");
  const title = stage?.querySelector<HTMLElement>("[data-service-title]");
  if (!stage || !title) return { trigger: node, start: "top 80%" };

  return {
    trigger: stage,
    start: () => `top ${window.innerHeight / 2 - title.offsetTop - title.offsetHeight / 2}px`,
  };
}
