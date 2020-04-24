import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn-detail',
  templateUrl: './btn-detail.component.html',
  styleUrls: ['./btn-detail.component.css']
})
export class BtnDetailComponent implements OnInit {
  faSearch = faSearch;

  constructor() {
  }

  ngOnInit(): void {
  }

}
