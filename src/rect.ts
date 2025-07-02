import Dimensions from "./dimensions";
import Vector2 from "./vector2";

interface Rect extends Dimensions, Vector2 {}

namespace Rect {
  function leftX(rect: Rect) {
    return rect.x;
  }

  function rightX(rect: Rect) {
    return rect.x + rect.width - 1;
  }

  function topY(rect: Rect) {
    return rect.y + rect.height - 1;
  }

  function bottomY(rect: Rect) {
    return rect.y;
  }

  export function spanning(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): Rect {
    const minX = Math.min(fromX, toX);
    const minY = Math.min(fromY, toY);
    const maxX = Math.min(fromX, toX);
    const maxY = Math.min(fromY, toY);
    return {
      x: minX,
      y: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    };
  }

  export function isWithinBounds(outer: Rect, inner: Rect): boolean {
    return (
      leftX(inner) >= leftX(outer) &&
      bottomY(inner) >= bottomY(outer) &&
      rightX(inner) <= rightX(outer) &&
      topY(inner) <= topY(outer)
    );
  }

  export function isOverlap(a: Rect, b: Rect): boolean {
    return (
      leftX(a) <= rightX(b) &&
      bottomY(a) <= topY(b) &&
      rightX(a) >= leftX(b) &&
      topY(a) >= bottomY(b)
    );
  }

  export function isOnBoundary(rect: Rect, x: number, y: number): boolean {
    return (
      x === leftX(rect) ||
      x === rightX(rect) ||
      y === bottomY(rect) ||
      y === topY(rect)
    );
  }
}

export default Rect;
