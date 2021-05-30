import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements AfterViewInit {

  constructor() { }

  // Why use this?
  // https://stackoverflow.com/questions/44426939/how-to-use-canvas-in-angular
  // https://stackoverflow.com/questions/56359504/how-should-i-use-the-new-static-option-for-viewchild-in-angular-8 
  @ViewChild('snakeCanvas', {static: false}) snakeCanvas: ElementRef;
  private context: CanvasRenderingContext2D;
  private posX: number = 50;
  private id;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.context = this.snakeCanvas.nativeElement.getContext('2d');
    this.context.font = "30px Arial";

    this.id = setInterval(() => {      
      this.draw();
    }, 20); //interval timer
  }

  //TODO
  // Interval voor draw functie voor game loop
  // https://stackoverflow.com/questions/50455347/how-to-do-a-timer-in-angular-5
  // https://stackoverflow.com/questions/37116619/angular-2-setinterval-keep-running-on-other-component 

  draw(){
    this.clearCanvas();
    //this.context.fillStyle = 'green';
    //this.context.fillRect(this.posX, 10, 200, 100);

    
    this.context.strokeText("Hello World", this.posX + 35, 50);

    // Set line width
    //this.context.lineWidth = 10;

    // Wall
    this.context.strokeRect(this.posX + 35, 140, 150, 110);

    // Door
    this.context.fillStyle = 'black';
    this.context.fillRect(this.posX + 55, 190, 40, 60);

    // Roof
    this.context.beginPath();
    this.context.moveTo(this.posX + 10, 140);
    this.context.lineTo(this.posX + 110, 60);
    this.context.lineTo(this.posX + 210, 140);
    this.context.closePath();
    this.context.stroke();

    this.posX = this.posX + 10;
  }

  clearCanvas(){
    this.context.save();

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.snakeCanvas.nativeElement.width, this.snakeCanvas.nativeElement.height);

    this.context.restore();
  }

  resetAll(){
    //this.clearCanvas();
    this.posX = 10;
  }
}
