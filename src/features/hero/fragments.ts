export type Region = { x: number; y: number; width: number; height: number };

// Unequal, nested rectangles keep the surface structural rather than a pixel-art grid.
export function partition(width: number, height: number, depth: number): Region[] {
  function divide(region: Region, level: number, seed: number): Region[] {
    if (!level) return [region];
    const ratio = 0.32 + ((seed * 7) % 31) / 100;
    const vertical = region.width / region.height > 1.1;
    const first = vertical ? { ...region, width: region.width * ratio } : { ...region, height: region.height * ratio };
    const second = vertical
      ? { ...region, x: region.x + first.width, width: region.width - first.width }
      : { ...region, y: region.y + first.height, height: region.height - first.height };
    return [...divide(first, level - 1, seed + 3), ...divide(second, level - 1, seed + 11)];
  }
  return divide({ x: 0, y: 0, width, height }, depth, 4);
}

export function surfaceFragment(region: Region, color: string) {
  const element = document.createElement("div");
  Object.assign(element.style, {
    position: "absolute", left: `${region.x}px`, top: `${region.y}px`,
    width: `${region.width + 0.5}px`, height: `${region.height + 0.5}px`, background: color,
  });
  return element;
}
