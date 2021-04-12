class Snake {
  head: HTMLElement;
  // 蛇的身体，html元素的集合
  bodies: HTMLCollection;
  // 蛇的整体
  element: HTMLElement;
  canThroughWall: boolean;

  constructor(canThroughWall: boolean = false) {
    this.element = document.getElementById("snake")!
    this.head = document.querySelector("#snake > div") as HTMLElement;
    // bodies如果采用querySelectorAll去获取的话是node节点组合（无法新增），collection可以新增，所以采用下面的方式
    this.bodies = this.element.getElementsByTagName("div");
    this.canThroughWall = canThroughWall;

  }
  // 获取蛇头的位置
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value) {
    if (this.X === value) return;
    if (value < 0 || value > 290) {
      if (this.canThroughWall) {
        value < 0 && (value = 290);
        value > 290 && (value = 0);
      } else {
        throw new Error("蛇撞墙了，gg");
      }
    }
    // // 使蛇与按键反方向继续移动
    // if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetLeft === value) {
    //   if (value > this.X) {
    //     // 在蛇往左走的时候按了右键
    //     value = this.X - 10;
    //   } else {
    //     // 在蛇往右走的时候按了左键
    //     value = this.X + 10;
    //   }
    // };
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody()
  }

  set Y(value) {
    if (this.Y === value) return;
    if (value < 0 || value > 290) {
      if (this.canThroughWall) {
        value < 0 && (value = 290);
        value > 290 && (value = 0);
      } else {
        throw new Error("蛇撞墙了，gg");
      }
    }
    if (this.bodies[1] && (<HTMLElement>this.bodies[1]).offsetTop === value) {
      if (value > this.Y) {
        // 在蛇往左走的时候按了右键
        value = this.Y - 10;
      } else {
        // 在蛇往右走的时候按了左键
        value = this.Y + 10;
      }
    };
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody()
  }

  addBody() {
    // 往element中动态添加HTML，beforeEnd在结束标签之前的位置（最后加入）
    this.element.insertAdjacentElement('beforeend', document.createElement('div'))
  }

  // 给蛇添加一个从后往前移动的方法
  moveBody() {
    // 后面一节等于前面一节的位置，所以应该从后往往前面去遍历
    // 0是蛇头的位置，这里不需要改动
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (<HTMLElement>this.bodies[i - 1]).offsetLeft;
      let Y = (<HTMLElement>this.bodies[i - 1]).offsetTop;
      (<HTMLElement>this.bodies[i]).style.left = X + 'px';
      (<HTMLElement>this.bodies[i]).style.top = Y + 'px';
    }
  }

  // 检查蛇是否撞上了自己的身体
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let body = <HTMLElement>this.bodies[i];
      if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
        throw new Error("蛇撞自己了，gg")
      }
    }
  }
}

export default Snake;
