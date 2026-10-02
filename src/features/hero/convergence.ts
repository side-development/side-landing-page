export function purpleSurface(width: number, height: number, dotX: number, dotY: number, radius: number) {
  const margin = Math.max(width, height) * 0.16;
  const corners = [[-margin, -margin], [width + margin, -margin], [width + margin, height + margin], [-margin, height + margin]];
  const perimeter = corners.flatMap(([x, y], side) => {
    const next = corners[(side + 1) % corners.length];
    return Array.from({ length: 5 }, (_, index) => {
      const px = x + (next[0] - x) * index / 5 - dotX;
      const py = y + (next[1] - y) * index / 5 - dotY;
      return { angle: Math.atan2(py, px), distance: Math.hypot(px, py) };
    });
  });

  return (progress: number) => {
    const curl = Math.sin(Math.PI * progress) * 0.9;
    const points = perimeter.map(({ angle, distance }) => {
      const pull = Math.pow(1 - progress, 1.65 + 0.55 * Math.sin(angle + 0.8));
      const reach = radius + (distance - radius) * pull;
      const twist = angle + curl * (0.75 + 0.25 * Math.cos(angle));
      return [dotX + Math.cos(twist) * reach, dotY + Math.sin(twist) * reach];
    });
    const point = (index: number) => points[(index + points.length) % points.length];
    let path = `M${points[0].join(",")}`;
    points.forEach((current, index) => {
      const previous = point(index - 1);
      const next = point(index + 1);
      const after = point(index + 2);
      const first = current.map((value, axis) => value + (next[axis] - previous[axis]) / 6);
      const second = next.map((value, axis) => value - (after[axis] - current[axis]) / 6);
      path += `C${first.join(",")} ${second.join(",")} ${next.join(",")}`;
    });
    return `${path}Z`;
  };
}
