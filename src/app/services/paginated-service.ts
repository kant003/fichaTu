import { BehaviorSubject } from 'rxjs';

export enum Operation { simple, prevPage, nextPage }

export interface PaginateData {
  operation: Operation;
  data?: string;
}

export class Paginated<T> {
  paginateFilter$: BehaviorSubject<PaginateData>;
  pageSize$: BehaviorSubject<number>;

  constructor(defaultPageSize: number) {
    this.paginateFilter$ = new BehaviorSubject(
      { operation: Operation.simple } as PaginateData
    );
    this.pageSize$ = new BehaviorSubject(defaultPageSize);

  }

  nextPage(ultimo: string): void {
    let reff: PaginateData;

    if (ultimo) {
      const startAt = ultimo;
      reff = { operation: Operation.nextPage, data: startAt };
    } else {
      reff = { operation: Operation.simple };
    }
    this.paginateFilter$.next(reff);

  }

  prevPage(primero: string): void {
    let reff: PaginateData;

    if (primero) {
      const startAt = primero;
      reff = { operation: Operation.prevPage, data: startAt };
    } else {
      reff = { operation: Operation.simple };

    }

    this.paginateFilter$.next(reff);
  }

  initPage(): void {
    const reff: PaginateData = { operation: Operation.simple };
    this.paginateFilter$.next(reff);
  }
}
