import { Injectable } from "@angular/core";

@Injectable()
export class BaseUrlService{ 
    private baseUrl: string = "http://localhost:8080/";
    private imageUrl: string = "http://localhost:8080/assets/images/";
    private productUrl: string = "http://localhost:8080/images/product/";
    
    getBaseUrl(): string{
        return this.baseUrl;
    }

    getImageUrl(): string{
        return this.imageUrl;
    }

    getProductUrl(): string{
        return this.productUrl;
    }
    
}