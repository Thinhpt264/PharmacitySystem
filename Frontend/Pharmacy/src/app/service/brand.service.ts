import { HttpClient } from "@angular/common/http";
import { Injectable, INJECTOR } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class BrandService {
    constructor(
        private httpClient: HttpClient,
        private baseUrl : BaseUrlService
    ){}

    async findAll() : Promise<any>{
            return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "brands/findAll"));
    }
   

}