import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../models/group';

@Pipe({
  name: 'groupPipe'
})
export class GroupPipePipe implements PipeTransform {

  transform(group: number | undefined, ...args: unknown[]): string {
    switch (group) {
      case Group.A: return 'A';
      case Group.B: return 'B';
      default: return '-';
    }
  }

}
