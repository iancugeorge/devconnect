import Interval from './Interval';

// Clasa Variabila ce preia un id si o valoare fixa sau random dintr-un interval
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
