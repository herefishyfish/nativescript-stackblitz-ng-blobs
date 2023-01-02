import { Component, OnInit } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Canvas, CanvasRenderingContext2D } from "@nativescript/canvas";
import { canvasPath } from "blobs/v2/animate";
registerElement("Canvas", () => Canvas);

@Component({
  selector: "ns-blob",
  template: `
    <ActionBar title="My Profile" class="bg-fleece text-zinc-800" flat="true">
      <ActionItem ios.systemIcon="20" ios.position="right"
              android.systemIcon="ic_menu" android.position="actionBar"></ActionItem>
    </ActionBar>

    <GridLayout class="container bg-fleece">
      <Canvas (ready)="onCanvasReady($event)" rowSpan="3"></Canvas>

      <Label text="LABEL" class="text-8xl text-center font-thin text-zinc-800" row="1" verticalAlignment="center" textWrap="true"></Label>

      <Image row="2" width="100" horizontalAlignment="left" class="ml-16" src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/thin-long-arrow-right-icon.png"></Image>
      <Label text="7  -  8" class="text-2xl rotate-90 font-light ml-20 text-zinc-800" row="2"></Label>

      <StackLayout orientation="horizontal" class="ml-14">
        <StackLayout class="w-6 bg-zinc-800" height="2" verticalAlignment="center"></StackLayout>
        <Label text="Illustration" class="text-base text-center font-light ml-1 text-zinc-800" verticalAlignment="center" row="1"></Label>
      </StackLayout>

    </GridLayout>
  `,
  styles: [
    `
      .container {
        rows: 20*, 50*, 30*;
      }
    `,
  ],
})
export class BlobComponent implements OnInit {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;
  animation;
  size;
  x: number;
  y: number;

  ngOnInit(): void {
  }

  getDefaultOptions() {
    return {
      blobOptions: {
        seed: Math.random(),
        extraPoints: 6,
        randomness: 50,
        size: this.size,
      },
      canvasOptions: {
        offsetX: this.x - this.size / 2,
        offsetY: this.y - this.size / 2,
      }
    };
  }

  loopAnimation = () => {
    this.animation.transition({
        duration: 8000,
        timingFunction: "linear",
        callback: this.loopAnimation,
        ...this.getDefaultOptions(),
    });
  };

  onCanvasReady(args) {
    this.canvas = args?.object as Canvas;
    this.ctx = this.canvas?.getContext("2d") as CanvasRenderingContext2D;

    this.x = Number(this.canvas.width) / 2;
    this.y = Number(this.canvas.height) / 2;
    this.size = Number(this.canvas.width) * .7;

    this.animation = canvasPath();

    this.animation.transition({
      duration: 0,
      timingFunction: "linear",
      callback: this.loopAnimation,
      ...this.getDefaultOptions(),
    });

    requestAnimationFrame(this.renderAnimation)
    setInterval(() => {
      this.renderAnimation();
    }, 1000/60);
  }

  rotation = 0;

  renderAnimation = () => {
    this.ctx.clearRect(0, 0, Number(this.canvas.width), Number(this.canvas.height));

    const gradient = this.ctx.createRadialGradient(this.x, this.y, 600, Number(this.canvas.width), Number(this.canvas.height), 600);

    gradient.addColorStop(0, "#ec576b");
    gradient.addColorStop(0.3, "#ec576b");
    gradient.addColorStop(1, "cyan");

    this.ctx.fillStyle = gradient;
    this.ctx.fill(this.animation.renderFrame());
  };
}
