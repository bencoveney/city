namespace Random {
  export function intBetween(from: number, to: number) {
    const size = to - from;
    return from + Math.floor(size * Math.random());
  }
}

export default Random;
