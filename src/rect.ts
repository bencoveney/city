import { Dimensions } from "./dimensions";
import { Vector2 } from "./vector2";

export type Rect = Dimensions & Vector2;

function rightX(rect: Rect) {
  return rect.x + rect.width - 1;
}

function topY(rect: Rect) {
  return rect.y + rect.height - 1;
}

export function isWithinBounds(outer: Rect, inner: Rect): boolean {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    rightX(inner) <= rightX(outer) &&
    topY(inner) <= topY(outer)
  );
}

export function isOverlap(a: Rect, b: Rect): boolean {
  return (
    a.x <= rightX(b) && a.y <= topY(b) && rightX(a) >= b.x && topY(a) >= b.y
  );
}

/*
0123456789
  |--| 2,4    a
   |---| 3,5  b
*/
