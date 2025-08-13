/// <reference path="math.ts" /> 
// Triple backslash: Import for namespaces

namespace GameEngine.Physics {
  export function applyGravity(sprite: GameEngine.Sprite) {
    sprite.y += 9.8 // Simplified gravity
  }

  export function checkCollision(a: GameEngine.Sprite, b: GameEngine.Sprite) {
    return GameEngine.Math.distance(a, b) < 10 // Simplified collision check
  }
}
