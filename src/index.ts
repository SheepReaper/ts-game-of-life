import p5 from 'p5';

import { GameOfLife } from './GameOfLife';

const elementMap = {
  cellSize: document.getElementById("cellSize") as HTMLInputElement,
  numCols: document.getElementById("numCols") as HTMLInputElement,
  numRows: document.getElementById("numRows") as HTMLInputElement,
  seed: document.getElementById("seed") as HTMLInputElement,
  shareString: document.getElementById("shareString") as HTMLTextAreaElement,
  wrap: document.getElementById("wrap") as HTMLInputElement,
};

const readOptions = (elems: typeof elementMap) =>
  GameOfLife.Options.Merge({
    cellSize: elems.cellSize.valueAsNumber,
    numCellsX: elems.numCols.valueAsNumber,
    numCellsY: elems.numRows.valueAsNumber,
    seed: elems.seed.valueAsNumber,
    wrapAround: elems.wrap.checked,
  });

const writeOptions = (
  options: GameOfLife.Options,
  elems: typeof elementMap,
) => {
  elems.cellSize.value = options.cellSize.toString();
  elems.numCols.value = options.numCellsX.toString();
  elems.numRows.value = options.numCellsY.toString();
  elems.seed.value = options.seed.toString();
  elems.shareString.value = options.toEncoded();
  elems.wrap.checked = options.wrapAround;
};

const sketchWithOptions =
  (options = GameOfLife.Options.Default) =>
  (p: p5) => {
    let gameOfLife: GameOfLife;

    p.setup = () => {
      gameOfLife = new GameOfLife(p, options);
      writeOptions(gameOfLife.options, elementMap);
      gameOfLife.setup();
      console.log({
        gameOptions: gameOfLife.options,
        json: gameOfLife.options.toJson(),
        encoded: gameOfLife.options.toEncoded(),
      });
    };

    p.draw = () => {
      gameOfLife.draw();
    };
  };

const main = () => {
  let pElement: p5;
  const element = document.getElementById("canvas-frame");
  const btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
  const btnLoad = document.getElementById("btnLoad") as HTMLButtonElement;

  if (element) {
    pElement = new p5(sketchWithOptions(), element);

    if (btnUpdate) {
      btnUpdate.addEventListener("click", () => {
        pElement.remove();
        pElement = new p5(sketchWithOptions(readOptions(elementMap)), element);
      });
    }

    if (btnLoad) {
      btnLoad.addEventListener("click", () => {
        pElement.remove();
        pElement = new p5(
          sketchWithOptions(
            GameOfLife.Options.fromEncoded(elementMap.shareString.value),
          ),
          element,
        );
      });
    }
  }
};

main();
