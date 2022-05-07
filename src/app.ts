const WAKE_UP_TIME = "06:00";
const WAKE_UP_HOURS = WAKE_UP_TIME.split(":")[0];
const WAKE_UP_MINUTES = WAKE_UP_TIME.split(":")[1];

const NIGHT_TIME = "18:00";
const NIGHT_HOURS = NIGHT_TIME.split(":")[0];
const NIGHT_MINUTES = NIGHT_TIME.split(":")[1];

let opened = false;

class App {
  url: HTMLInputElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixelRatio: number;
  stageWidth: number;
  stageHeight: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);

    this.resize();

    this.url = document.getElementById("url") as HTMLInputElement;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // get the current time
    const date = new Date();
    const [month, day, year, hour, minutes, seconds] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    // display the sunrise and sunset
    if (
      // night time
      hour.toString() >= NIGHT_HOURS &&
      minutes.toString() >= NIGHT_MINUTES
    ) {
      opened = false;
    }

    if (!opened && hour.toString() === WAKE_UP_HOURS && minutes.toString() === WAKE_UP_MINUTES) {
      opened = true;
      window.open(this.url.value, "_blank");
    };

    // display the current time
    this.ctx.fillStyle = "#D0CCCA";
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText(
      `${year}/${month}/${day}`,
      this.stageWidth / 2 - 100,
      this.stageHeight / 2 - 30
    );
    this.ctx.font = "50px sans-serif";
    this.ctx.fillText(
      `${hour}:${minutes}:${seconds}`,
      this.stageWidth / 2 - 100,
      this.stageHeight / 2 + 30
    );
  }
}

window.onload = () => {
  new App();
};
