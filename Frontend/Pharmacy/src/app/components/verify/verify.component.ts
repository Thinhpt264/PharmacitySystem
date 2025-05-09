import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
})
export class VerifyComponent implements OnInit {
  verified: boolean;
  message: any;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private accountService : AccountService
  ) { }

 ngOnInit() {
   this.verify();
  }

  verify() {
     const email = this.route.snapshot.queryParamMap.get('email');
     const securityCode = this.route.snapshot.queryParamMap.get('securityCode');

     console.log(email);
     console.log(securityCode);

     this.accountService.verify(email, securityCode).then((res) => {
       console.log(res);
       this.verified = res.verified;
     });
  }

  
  resendCode() {
    const email = this.route.snapshot.queryParamMap.get('email');
    console.log(email);
    this.accountService.reSendCode(email).then(
      res => {
        console.log(res);
        alert('Mã xác nhận đã được gửi lại!');
      }
    );
  }

}