import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 't-progress',
  templateUrl: './t-progress.component.html',
  styleUrls: ['./t-progress.component.scss']
})
export class TProgressComponent implements OnInit {


  public stroke = 5;

  public PI = Math.PI;
  private _radius: number = 50;
  @Input()
  public set radius(radius: number) {
    console.log('radius', radius , typeof radius)
    if (radius < 50) {
      this._radius = 50;
    } else {
      this._radius = radius
    }
  }

  public get radius(): number {
    return this._radius
  }

  public get circumference(): number {
    return 2 * Math.PI * this.radius
  }
  private _progress: number = 0;
  @Input()
  public set progress(progress: number) {
    if (progress < 0) {
      this._progress = 0;
    } else if (progress >= 100) {
      this._progress = 100;
      this.complete.next()
    } else {
      this._progress = progress
    }
  }

  public get progress(): number {
    return this._progress
  }

  @Output()
  public complete = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}
