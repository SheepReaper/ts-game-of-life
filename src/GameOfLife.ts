import p5 from 'p5';

export class GameOfLife {
  private static neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    // [0, 0] // Current Cell
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  public readonly options: Readonly<GameOfLife.Options>;

  private grid: boolean[][];

  constructor(
    private p: p5,
    options: Partial<GameOfLife.Options> = GameOfLife.Options.Default,
  ) {
    this.options = GameOfLife.Options.Merge(options);

    console.log({resolvedOptions: this.options})

    p.createCanvas(
      this.options.numCellsX * this.options.cellSize,
      this.options.numCellsY * this.options.cellSize,
    );

    this.grid = this.initializeGrid();
  }

  public setup() {
    this.p.background(200);
  }
  public draw() {
    this.p.background(200);
    this.drawGrid();
    this.grid = this.updateGrid();
  }

  private initializeGrid(): boolean[][] {
    this.p.randomSeed(this.options.seed);

    return Array.from({ length: this.options.numCellsY }, () =>
      Array.from(
        { length: this.options.numCellsX },
        () => this.p.random() > 0.5,
      ),
    );
  }

  private drawGrid() {
    this.p.stroke(0);
    this.grid.forEach((row, ri) =>
      row.forEach((alive, ci) => {
        this.p.fill(alive ? 0 : 255);
        this.p.rect(
          ci * this.options.cellSize,
          ri * this.options.cellSize,
          this.options.cellSize,
          this.options.cellSize,
        );
      }),
    );
  }

  private updateGrid(): boolean[][] {
    return this.grid.map((row, i) =>
      row.map((cell, j) => {
        const aliveNeighbors = this.countAliveNeighbors(
          i,
          j,
          this.options.wrapAround,
        );
        return (
          // Live cell needs 2 or 3 live neighbors to stay alive
          (cell && aliveNeighbors === 2) ||
          // Dead cell needs exactly 3 live neighbors to become alive
          aliveNeighbors === 3
        );
      }),
    );
  }

  private countAliveNeighbors(
    row: number,
    col: number,
    wrapAround = false,
  ): number {
    return GameOfLife.neighborOffsets.reduce((acc, [dx, dy]) => {
      let x = row + dx;
      let y = col + dy;

      // Wrap around logic
      if (wrapAround) {
        x = (x + this.options.numCellsY) % this.options.numCellsY;
        y = (y + this.options.numCellsX) % this.options.numCellsX;
      }

      if (
        !wrapAround &&
        (x < 0 ||
          x >= this.options.numCellsY ||
          y < 0 ||
          y >= this.options.numCellsX)
      ) {
        return acc; // Skip checking if the neighbor is off-grid and wrapAround is false
      }

      if (this.grid[x][y]) {
        acc++;
      }

      return acc;
    }, 0);
  }
}

export namespace GameOfLife {
  export interface Options {
    numCellsX: number;
    numCellsY: number;
    cellSize: number;
    wrapAround: boolean;
    seed: number;
  }

  export class Options implements Options {
    numCellsX = 80;
    numCellsY = 80;
    cellSize = 10;
    wrapAround = false;
    seed = Math.random();

    static Merge(options: Partial<Options>) {
      return Object.assign(new Options(), options);
    }

    static Default = new Options();

    static fromJson(data: string): Options {
      return JSON.parse(data) as Options;
    }

    static fromEncoded(data: string): Options {
      return Options.fromJson(atob(data));
    }

    toJson(): string {
      return JSON.stringify(this);
    }

    toEncoded(): string {
      return btoa(this.toJson());
    }
  }
}
