import { HttpClient } from "@angular/common/http";
import { Injectable, INJECTOR } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class DeliveryInforService {
    constructor(
        private httpClient: HttpClient,
        private baseUrl : BaseUrlService
    ){}

    async create(address : any) : Promise<any>{
            return await lastValueFrom(this.httpClient.post(this.baseUrl.getBaseUrl() + "api/v1/deliveryInfo/create" , address));
    }
async findDeliveryInfoByAccountId(userId: any): Promise<any> {
                return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/v1/deliveryInfo/findByAccoutId?accountId=" + userId));
        }
        async findById(id: any): Promise<any> {
                return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/v1/deliveryInfo/" + id));
        }

}