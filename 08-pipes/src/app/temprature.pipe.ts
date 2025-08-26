import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'temp',
  standalone: true
})

export class TempraturePipe implements PipeTransform {
  transform(value: number | string, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah'): any {
    let val: number = typeof value === 'string' ? parseFloat(value) : value;
    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val;
    }


    let symbol: '°F' | '°C';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
