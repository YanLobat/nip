import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Output() filterContributors = new EventEmitter<number>();

  constructor(
  ) {}

  filter(event: any): void {
    this.filterContributors.emit(event.target.value);
  }

}

