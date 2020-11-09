import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanoPipe'
})
export class BooleanoPipePipe implements PipeTransform {

  transform(value: boolean | undefined, ...args: unknown[]): string {
    if (value === undefined) { return 'sin definir'; }
    return value ? 'Si' : 'No';
  }

}
