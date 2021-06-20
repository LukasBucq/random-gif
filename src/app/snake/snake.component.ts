import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

enum Direction {
  Up,
  Down,
  Left,
  Right
}

class Snake {
  posX: number;
  posY: number;
  color: string;

  constructor(posX: number, posY: number){
    this.posX = posX;
    this.posY = posY;
    this.getBasicColor();
  }

  changeColor(newColor: string){
    this.color = newColor;
  }

  generateRandomColor(){
    let r,g,b;
    r = Math.random()* (255 - 0) + 0; 
    g = Math.random()* (255 - 0) + 0;
    b = Math.random()* (255 - 0) + 0;
    this.color = `rgb(${r}, ${g}, ${b})`;
  }

  getBasicColor(){
    this.color = `rgb(${255}, ${0}, ${0})`;
  }
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})

export class SnakeComponent implements AfterViewInit {

  constructor() { }

  // Input key listener
  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    this.key = event.key;
    switch(this.key){
      case "ArrowUp":
        this.currentDirection = Direction.Up;
        break;
      case "ArrowDown":
        this.currentDirection = Direction.Down;
        break;
      case "ArrowLeft":
        this.currentDirection = Direction.Left;
        break;
      case "ArrowRight":
        this.currentDirection = Direction.Right;
        break;          
    }
  }

  // Why use this?
  // https://stackoverflow.com/questions/44426939/how-to-use-canvas-in-angular
  // https://stackoverflow.com/questions/56359504/how-should-i-use-the-new-static-option-for-viewchild-in-angular-8 
  @ViewChild('snakeCanvas', {static: false}) snakeCanvas: ElementRef;
  private context: CanvasRenderingContext2D;
  private id;
  private currentDirection: Direction = Direction.Right;
  private snake: Snake[] = [];
  private key;
  private gameInterval: number = 480;
  private randomSnakeColors : boolean = false;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.context = this.snakeCanvas.nativeElement.getContext('2d');
    this.context.font = "30px Arial";
   
    // setup snake parts
    this.resetAll();

    this.id = setInterval(() => {    
      this.updatePosition(this.snake, this.currentDirection);  
      this.draw();
      
    }, this.gameInterval); //interval timer, gameloop
  }

  //TODO
  // Interval voor draw functie voor game loop
  // https://stackoverflow.com/questions/50455347/how-to-do-a-timer-in-angular-5
  // https://stackoverflow.com/questions/37116619/angular-2-setinterval-keep-running-on-other-component 

  draw(){
    this.clearCanvas();

    this.snake.forEach(element => {
      this.context.beginPath();
      this.context.fillStyle = element.color;
      this.context.fillRect(element.posX, element.posY,50,50);
      this.context.stroke();
    })
  }

  updatePosition(mySnake: Snake[], direction: Direction){
    for(let i = mySnake.length -1; i > 0; i--){
        let tempCounter = i -1;
        mySnake[i].posX = mySnake[tempCounter].posX;
        mySnake[i].posY = mySnake[tempCounter].posY;
    }

    switch(direction){
      case Direction.Down:
        mySnake[0].posY = mySnake[0].posY + 55;
        break;
      case Direction.Left:
        mySnake[0].posX = mySnake[0].posX - 55;
        break;
      case Direction.Right:
        mySnake[0].posX = mySnake[0].posX + 55;
        break;
      case Direction.Up:
        mySnake[0].posY = mySnake[0].posY - 55;
    }
  }

  addSnakePart(){
    let lastPosX, lastPosY;
    lastPosX = this.snake[this.snake.length -1].posX;
    lastPosY = this.snake[this.snake.length -1].posY;

    this.snake.push(new Snake(lastPosX, lastPosY));
    if (this.randomSnakeColors) {
      this.snake[this.snake.length -1].generateRandomColor();
    }
    else{
      this.snake[this.snake.length -1].getBasicColor();
    }  
  }

  clearCanvas(){
    this.context.save();

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.snakeCanvas.nativeElement.width, this.snakeCanvas.nativeElement.height);

    this.context.restore();
  }

  resetAll(){
    this.snake = [];
    this.snake.push(new Snake(185, 20)); // pos:3
    this.snake.push(new Snake(130,20));  // pos:2
    this.snake.push(new Snake(75, 20));  // pos:1
    this.snake.push(new Snake(20,20));   // pos:0

    this.currentDirection = Direction.Right;
    this.snake[0].changeColor("#03fc20");
  }

  toggleSnakeColors(){
    // Change boolean value to opposite
    this.randomSnakeColors = !this.randomSnakeColors;

    if(!this.randomSnakeColors){
      for(let i = 0; i < this.snake.length; i++){
        if(i == 0){
          // Snake head is green
          this.snake[i].changeColor("#03fc20")
        }
        else{
          this.snake[i].getBasicColor();
        }    
      }
    }
    else{
      for(let i = 0; i < this.snake.length; i++){
        this.snake[i].generateRandomColor();
      }     
    }
  }
}