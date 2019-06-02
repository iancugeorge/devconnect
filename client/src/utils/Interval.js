// Clasa Interval (calculaza valoarea random intre un min si un max)
class Interval {
  static getValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default Interval;