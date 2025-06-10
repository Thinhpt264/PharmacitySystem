import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
  ngOnInit(): void {}

  gotoHome() {
    window.location.href = 'home';
  }
}