import { HttpClient } from "@angular/common/http";
import { Injectable, INJECTOR } from "@angular/core";
import { BaseUrlService } from "./baseUrl.service";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CommentService {
    constructor(
        private httpClient: HttpClient,
        private baseUrl : BaseUrlService
    ){}

    async findCommentByProductId(productId : any) : Promise<any>{
            return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "api/v1/comments/product/" + productId));
    }
    async comment(comment: any) : Promise<any>{
            return await lastValueFrom(this.httpClient.post(this.baseUrl.getBaseUrl() + "api/v1/comments" , comment));
    }

   

}