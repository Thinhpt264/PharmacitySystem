

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class CategoryService {
    constructor(
        private httpClient: HttpClient,
        private baseUrl : BaseUrlService
    ) { }

    async findAllCategory() : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "categories/findParentCategories"));
    }

     async findCategoryByCategoryParent(id : number) : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "categories/findByIdParentCategories/" + id));
    }

     async findImageOfObjId(id : number, tableName: String) : Promise<any>{
        return await lastValueFrom(this.httpClient.get(this.baseUrl.getBaseUrl() + "image/findImageByObject?objectId=" + id +"&tableName=" +tableName));
    }
}