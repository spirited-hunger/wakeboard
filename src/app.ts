let opened = false;

class App {
  url: HTMLInputElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixelRatio: number;
  stageWidth: number;
  stageHeight: number;
  hour: HTMLInputElement;
  minute: HTMLInputElement;
  wakeUpURL: string;
  wakeUpHours: number;
  wakeUpMinutes: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);

    this.resize();

    this.url = document.getElementById("url") as HTMLInputElement;
    this.hour = document.getElementById("hour") as HTMLInputElement;
    this.minute = document.getElementById("minute") as HTMLInputElement;

    this.wakeUpHours = 6;
    this.wakeUpMinutes = 0;

    this.url.addEventListener("change", () => {
      this.wakeUpURL = this.url.value;
    });

    this.hour.addEventListener("change", () => {
      this.wakeUpHours = Number(this.hour.value);
    });

    this.minute.addEventListener("change", () => {
      this.wakeUpMinutes = Number(this.minute.value);
    });

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
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ];

    // display the sunrise and sunset

    if (
      !opened &&
      Number(hour) === Number(this.wakeUpHours) &&
      Number(minutes) === Number(this.wakeUpMinutes) &&
      Number(seconds) === 0
    ) {
      opened = true;
      window.open(this.wakeUpURL, "_blank");
    } else if (
      // night time
      Number(seconds) !== 0
    ) {
      opened = false;
    }

    // display the current time
    this.ctx.fillStyle = "rgba(208, 204, 202, 0.1)";
    this.ctx.font = "40px sans-serif";
    this.ctx.fillText(
      `${year}/${month}/${day}`,
      this.stageWidth / 2 - 200,
      this.stageHeight / 2 - 150
    );
    this.ctx.font = "100px sans-serif";
    this.ctx.fillText(
      `${hour}:${minutes}:${seconds}`,
      this.stageWidth / 2 - 200,
      this.stageHeight / 2 - 40
    );
  }
}

window.onload = () => {
  new App();
};
