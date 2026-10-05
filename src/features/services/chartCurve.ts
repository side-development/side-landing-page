type Point = { x: number; y: number };

export function chartCurve(points: Point[], tension = 1) {
  const slopes = points.slice(1).map((point, index) => (point.y - points[index].y) / (point.x - points[index].x));
  const tangents = points.map((_, index) => {
    if (index === 0) return slopes[0] * tension;
    if (index === points.length - 1) return slopes.at(-1)! * tension;
    const before = slopes[index - 1], after = slopes[index];
    return before * after <= 0 ? 0 : 2 * before * after / (before + after) * tension;
  });
  return points.reduce((path, point, index) => {
    if (index === 0) return `M${point.x},${point.y}`;
    const previous = points[index - 1];
    const step = (point.x - previous.x) / 3;
    return `${path} C${previous.x + step},${previous.y + step * tangents[index - 1]} ${point.x - step},${point.y - step * tangents[index]} ${point.x},${point.y}`;
  }, "");
}
