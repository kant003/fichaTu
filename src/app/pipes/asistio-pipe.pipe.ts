import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asistioPipe'
})
export class AsistioPipePipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): string {
    if (value === undefined) { return 'sin definir'; }
    return value === 0 ? 'Falta' : 'Asiste';

  }

}
