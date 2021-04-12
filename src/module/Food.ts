class Food {
  element: HTMLElement

  constructor() {
    this.element = document.getElementById("food")!
  }


  // 定义一个获取食物X坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定义一个获取食物Y坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  change(snakeBody: HTMLCollection) {
    // 生成食物的随机位置
    // 食物的位置最小是0，最大是290px;(父级元素的宽为300)
    // 食物的坐标必须为10的倍数，因为食物本身的宽度就是10px
    let left: number = Math.round(Math.random() * 29) * 10
    let top: number = Math.round(Math.random() * 29) * 10
    // 食物不能出现在蛇的位置
    let foodInSnake: boolean = false;
    for (let i = 0; i < snakeBody.length; i++) {
      let body = <HTMLElement>snakeBody[i];
      if (left === body.offsetLeft && top === body.offsetTop) {
        foodInSnake = true
      }
    }
    if (foodInSnake) {
      this.change(snakeBody);
    } else {
      this.element.style.left = left + 'px';
      this.element.style.top = top + 'px';
    }

  }
}

export default Food;
