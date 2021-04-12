import Food from './Food';
import Snake from './Snake';
import ScorePanel from './ScorePanel';

class GameControl {
  snake: Snake;
  Food: Food;
  ScorePanel: ScorePanel;
  // 初始化方向
  direction: string = 'Right';
  // 设置蛇是否存活
  isLive: boolean = true;
  private XDirectionEvents: string[] = ['ArrowUp', 'Up', 'ArrowDown', "Down"];
  private YDirectionEvents: string[] = ['ArrowLeft', 'Left', 'ArrowRight', "Right"];

  constructor(canThroughWall: boolean = false) {
    this.snake = new Snake(canThroughWall);
    this.Food = new Food();
    this.ScorePanel = new ScorePanel();
    // 创建完实例，游戏立刻开始
    this.init();
  }

  init() {
    // 绑定键盘事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }

  /**
   * ArrowUp
   * ArrowLeft
   * ArrowRight
   * ArrowDown
   */
  keydownHandler(event: KeyboardEvent) {
    if (this.direction === event.key) return;
    switch (event.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
        if (this.XDirectionEvents.includes(this.direction)) return;
        this.direction = event.key
        break;
      case 'Left':
      case 'ArrowLeft':
      case 'Right':
      case 'ArrowRight':
        if (this.YDirectionEvents.includes(this.direction)) return;
        this.direction = event.key
        break;
    }
  }

  // 让蛇跑起来
  run() {
    /**
     * 向左 left减少
     * 向右 left增加
     * 向上 top减少
     * 向下 top增加
     */
    let x = this.snake.X;
    let y = this.snake.Y;

    switch (this.direction) {
      case 'Up':
      case 'ArrowUp':
        y -= 10;
        break;
      case 'Down':
      case 'ArrowDown':
        y += 10;
        break;
      case 'Left':
      case 'ArrowLeft':
        x -= 10;
        break;
      case 'Right':
      case 'ArrowRight':
        x += 10;
        break;
    }

    this.checkEat(x, y);

    // TODO 尝试Object.defineProperty或者Proxy劫持属性来做这个事情
    // 通过异常捕获来判断是否撞墙
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (error) {
      alert(error.message)
      this.isLive = false;
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.ScorePanel.level - 1) * 30)
  }

  checkEat(X: number, Y: number) {
    if (this.Food.X === X && this.Food.Y === Y) {
      this.Food.change(this.snake.bodies);
      this.ScorePanel.addScore();
      this.snake.addBody();
    }
  }


}

export default GameControl;
