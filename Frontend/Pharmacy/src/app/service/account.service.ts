import { HttpClient } from "@angular/common/http";
import { Injectable, INJECTOR } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AccountService {
    constructor(
        private httpClient: HttpClient,
        private baseUrl : BaseUrlService
    ){}

    async login(account : any) : Promise<any>{
            return await lastValueFrom(this.httpClient.post(this.baseUrl.getBaseUrl() + "accounts/process_login" , account));
    }
    async register(account: any) : Promise<any>{
            return await lastValueFrom(this.httpClient.post(this.baseUrl.getBaseUrl() + "accounts/register" , account));
    }

    async verify(email: any, securityCode : any) : Promise<any>{
            return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "accounts/verify?email=" + email + "&securityCode=" + securityCode));
    }
     async reSendCode(email: any) : Promise<any>{
            return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "accounts/reSendCode?email=" + email ));
    }

}