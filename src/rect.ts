import Dimensions from "./dimensions";
import Vector2 from "./vector2";

interface Rect extends Dimensions, Vector2 {}

namespace Rect {
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

  export function isOnBoundary(rect: Rect, x: number, y: number): boolean {
    return (
      x === rect.x || x === rightX(rect) || y === rect.y || y === topY(rect)
    );
  }
}

export default Rect;
