export type FieldType = 'text' | 'number' | 'date' | 'boolean';

export interface Field {
  name: string;
  displayName: string;
  type: FieldType;
  toolTip: string;
  container: string;
  required: boolean;
  displayOnGrid: boolean;
}

export class FieldGenerator {
  private static fieldTypes: FieldType[] = ['text', 'number', 'date', 'boolean'];
  private static containers: string[] = ['Payoff', 'Details', 'Summary', 'Info'];

  static generateRandomFields(count: number): Field[] {
    const fields: Field[] = [];

    for (let i = 0; i < count; i++) {
      const field: Field = {
        name: `field${i + 1}`,
        displayName: `Field ${i + 1}`,
        type: this.getRandomElement(this.fieldTypes),
        toolTip: `This is the tooltip for Field ${i + 1}`,
        container: this.getRandomElement(this.containers),
        required: Math.random() > 0.5,
        displayOnGrid: Math.random() > 0.5,
      };
      fields.push(field);
    }

    return fields;
  }

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
