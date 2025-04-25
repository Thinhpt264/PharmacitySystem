import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  account: any = {
    email: '',
    username: '',
    password: '',
    password_cf: '',
    gender: '-1', // Khởi tạo gender mặc định
  };

  genders: any = [
    { name: 'Giới tính', value: '-1' },
    { name: 'Nam', value: '1' },
    { name: 'Nữ', value: '0' },
  ];

  ngOnInit(): void {}

  checkRegister(evt: any) {
    evt.preventDefault();
    console.log('Account:', this.account);
    console.log('Gender:', this.account.gender);
  }
}
