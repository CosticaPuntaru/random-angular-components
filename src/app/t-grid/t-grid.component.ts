import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, isObservable, BehaviorSubject, Subscription, combineLatest, } from 'rxjs';
import { map, startWith } from 'rxjs/operators'

interface Column<T> {
  property: keyof T,
  label: string,
  sortable: boolean,
}

export type Direction = 'ASC' | 'DESC';

export interface TGridSortEvent<T> {
  columnName: keyof T;
  direction: Direction;
};
export interface TGridPaginationEvent {
  currentPage: number;
  pageSize: number | null;
};

function paginate<T>(array: T[], page_number: number = 1, page_size?: number | null) {
  if (!page_size) {
    return array;
  }
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function sortTGrid<T>(data: T[], sort?: TGridSortEvent<T>): T[] {
  if (!sort) {
    return data;
  }

  return data.sort((a, b) => {
    if ((a[sort.columnName] > b[sort.columnName]) === (sort.direction === 'ASC')) {
      return 1;
    } else if ((a[sort.columnName] < b[sort.columnName]) === (sort.direction === 'ASC')) {
      return -1;
    }
    return 0
  })


}


@Component({
  selector: 't-grid',
  templateUrl: './t-grid.component.html',
  styleUrls: ['./t-grid.component.scss']
})
export class TGridComponent<T> implements OnInit {

  public visibleGrid$: Observable<T[]> = of([]);
  public dataGrid$ = new BehaviorSubject<T[]>([]);
  public dataGridSubscription?: Subscription;
  @Input()
  public set data(grid: T[] | Observable<T[]>) {
    if (this.dataGridSubscription) {
      this.dataGridSubscription.unsubscribe()
    }
    if (isObservable(grid)) {
      this.dataGridSubscription = grid.subscribe((data) => {
        this.dataGrid$.next(data)
      })
    } else if (Array.isArray(grid)) {
      this.dataGrid$.next(grid)
    } else {
      throw new Error('invalid data type provided to t-grid' + typeof grid)
    }
  };


  @Input()
  public sortable: boolean = false;

  public pageSize$ = new BehaviorSubject<null | number>(null);

  @Input()
  public set pageSize(pageSize: number | null) {
    this.pageSize$.next(pageSize)
  };

  @Output()
  public sortChange = new BehaviorSubject<TGridSortEvent<T> | undefined>(undefined);

  @Output()
  public onChange = new BehaviorSubject<TGridPaginationEvent | undefined>(undefined);


  public columnList: Column<T>[] = []

  public sortClicked(property: keyof T) {
    this.sortChange.next({
      columnName: property,
      direction: this.sortChange.value?.columnName === property && this.sortChange.value.direction === 'ASC' ? 'DESC' : 'ASC'
    })
  }

  ngOnInit(): void {
    this.visibleGrid$ = combineLatest([
      this.dataGrid$,
      this.sortChange,
      this.onChange,
      this.pageSize$
    ])
      .pipe(map(([grid, sort, pagination, pageSize]) => {
        return paginate(
          sortTGrid(
            grid,
            sort
          ),
          pagination?.currentPage,
          pageSize,
        );
      }));
  }

  public addColumn(column: Column<T>) {
    this.columnList.push(column)
  }
}
