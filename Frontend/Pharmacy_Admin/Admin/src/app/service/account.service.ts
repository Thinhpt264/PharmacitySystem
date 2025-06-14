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
            return await lastValueFrom(this.httpClient.post(this.baseUrl.getBaseUrl() + "api/v1/accounts/process_login" , account));
    }
    async findById(accountId : any) : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/v1/accounts/findById/" + accountId));
}

}