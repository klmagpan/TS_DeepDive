

/// <reference path="physics.ts" />
namespace GameEngine {
  export interface Sprite {
    x: number
    y: number
    update(): void
    render(): void
  }

  export class Player implements Sprite {
    constructor(public x: number, public y: number) {}

    update() {
      // Update player position
    }

    render() {
      // Render player sprite
    }
  }

  export function createPlayer(x: number, y: number): Player { // Makes available outside of namespace
    return new Player(x, y)
  }
  export class Game {
    private players: Player[] = []

    addPlayer(x: number, y: number) {
      this.players.push(createPlayer(x, y))
    }

    update() {
      for (const player of this.players) {
        Physics.applyGravity(player)
        player.update()
      }
    }
  }
}
