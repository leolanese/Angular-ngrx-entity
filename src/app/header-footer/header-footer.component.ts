import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.css']
})
export class HeaderFooterComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  value: any;

  constructor() {}

  ngOnInit() {
  }

}