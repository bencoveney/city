import Dimensions from "./dimensions";

interface Array2d<T> extends Dimensions {
  data: T[];
}

/*
  [
    [x0, x1, x2], // y0
    [x0, x1, x2], // y1
    [x0, x1, x2], // y2
  ]
*/

namespace Array2d {
  export function init<T extends unknown>(
    width: number,
    height: number,
    fill: T = undefined
  ): Array2d<T> {
    return {
      width,
      height,
      data: new Array(width * height).fill(fill),
    };
  }

  export function atIndex<T>(arr: Array2d<T>, index: number): T {
    return arr.data[index];
  }

  export function atXY<T>(arr: Array2d<T>, x: number, y: number): T {
    return atIndex(arr, getIndex(arr, x, y));
  }

  export function getIndex<T>(arr: Array2d<T>, x: number, y: number): number {
    return y * arr.width + x;
  }

  export function getX<T>(arr: Array2d<T>, index: number): number {
    return index * arr.width;
  }

  export function getY<T>(arr: Array2d<T>, index: number): number {
    return (index - getX(arr, index)) % arr.width;
  }
}

export default Array2d;
