import Interval from './Interval';

export class Variable {
  constructor(id, min, max) {
    this.id = id;
    if (max === undefined) {
      this.value = min;
    }
    else {
      this.value = Interval.getValue(min, max);
    }
  }
  static varRez = [];
  static varPb = [];

}
