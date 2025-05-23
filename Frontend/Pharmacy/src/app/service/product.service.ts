import { HttpClient } from "@angular/common/http";
import { Injectable, INJECTOR } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ProductService {
    constructor(
        private httpClient: HttpClient,
        private baseUrl : BaseUrlService
    ){}

    async findImageOfObjId(id : number, tableName: String) : Promise<any>{
            return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "image/findImageByObject?objectId=" + id +"&tableName=" +tableName));
    }

    async findProductByCategoryId(id : number) : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/products/by-category/" + id));
    }

    async findAll() : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/products" ));
    }
    async findById(id : number) : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/products/" + id))
    }

}