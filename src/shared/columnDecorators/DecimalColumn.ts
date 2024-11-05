import { Column, ColumnOptions } from 'typeorm';

export function DecimalColumn(options?: ColumnOptions) {
  return Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
    ...options,
  });
}