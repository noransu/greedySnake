// 积分盘
class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置最高等级
  maxLevel: number;
  // 设置变量表示多少分数升级
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + '';
    if (this.score % this.upScore === 0) {
      this.LevelUp();
    }
  }

  LevelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + '';
    }

  }
}

export default ScorePanel;
