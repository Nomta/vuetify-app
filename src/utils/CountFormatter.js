import { inRange } from 'lodash';

export class CountFormatter {
  constructor(entities) {
    this.entities = entities
  }

  count(num) {
    const mod100 = num % 100

    if (inRange(mod100, 10, 20)) {
      return `${num} ${this.entities[2]}`
    }

    const mod10 = num % 10

    if (mod10 === 1) {
      return `${num} ${this.entities[0]}`
    }

    if (inRange(mod10, 2, 5)) {
      return `${num} ${this.entities[1]}`
    }

    return `${num} ${this.entities[2]}`
  }
}