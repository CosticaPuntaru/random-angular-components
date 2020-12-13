import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { TGridComponent } from '../t-grid/t-grid.component';

@Component({
  selector: 't-column',
  template: '',
  styleUrls: ['./t-column.component.scss']
})
export class TColumnComponent<T> implements OnInit {

  @Input()
  public name: string = 'missing column label';

  @Input()
  public property?: keyof T;

  @Input()
  public sortable: boolean = false;

  constructor(private parent: TGridComponent<T>) { }

  ngOnInit(): void {
    if (!this.parent) {
      throw new Error('cannot find parent t-grid');
    }
    if (!this.property) {
      throw new Error('property must me defined');
    }
    this.parent.addColumn({
      label: this.name,
      property: this.property,
      sortable: !!this.sortable
    })
  }

}
