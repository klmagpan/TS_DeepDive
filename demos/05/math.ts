namespace GameEngine.Math {
  export function Vector2(x: number, y: number) {
    return { x, y }
  }

  export function distance(
    a: ReturnType<typeof Vector2>,
    b: ReturnType<typeof Vector2>
  ) {
    return globalThis.Math.sqrt(
      globalThis.Math.pow(b.x - a.x, 2) + globalThis.Math.pow(b.y - a.y, 2)
    )
  }
}
