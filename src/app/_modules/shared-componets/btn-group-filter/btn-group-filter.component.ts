import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn-group-filter',
  templateUrl: './btn-group-filter.component.html',
  styleUrls: ['./btn-group-filter.component.css']
})
export class BtnGroupFilterComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;

  @Output() filterEvt = new EventEmitter<any>();
  @Output() deleteEvt = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
