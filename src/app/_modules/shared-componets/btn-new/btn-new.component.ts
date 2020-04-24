import {Component, OnInit} from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn-new',
  templateUrl: './btn-new.component.html',
  styleUrls: ['./btn-new.component.css']
})
export class BtnNewComponent implements OnInit {
  faPlus = faPlusCircle;

  constructor() {
  }

  ngOnInit(): void {
  }

}
