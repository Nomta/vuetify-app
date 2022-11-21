export class CountFormatter {
  constructor(entities) {
    this.entities = entities
  }

  count(num) {
    const mod100 = num % 100

    if (mod100 > 10 && mod100 < 20) {
      return `${num} ${this.entities[2]}`
    }

    const mod10 = num % 10

    if (mod10 === 1) {
      return `${num} ${this.entities[0]}`
    }

    if (mod10 > 0 && mod10 < 5) {
      return `${num} ${this.entities[1]}`
    }

    return `${num} ${this.entities[2]}`
  }
}