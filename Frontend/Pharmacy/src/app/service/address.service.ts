import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ward {
  code: number;
  name: string;
  codename: string;
  division_type: string;
}

export interface District {
  code: number;
  name: string;
  codename: string;
  division_type: string;
  wards: Ward[];
}

export interface Province {
  code: number;
  name: string;
  codename: string;
  division_type: string;
  districts?: District[];
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseApiUrl = 'https://provinces.open-api.vn/api';

  constructor(private http: HttpClient) {}

  // Lấy danh sách tỉnh thành
  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.baseApiUrl}/p/`);
  }

  // Lấy thông tin chi tiết tỉnh thành với quận huyện và phường xã
  getProvinceWithDistricts(provinceCode: number): Observable<Province> {
    return this.http.get<Province>(
      `${this.baseApiUrl}/p/${provinceCode}?depth=2`
    );
  }

  // Lấy thông tin quận huyện với phường xã
  getDistrictWithWards(districtCode: number): Observable<District> {
    return this.http.get<District>(
      `${this.baseApiUrl}/d/${districtCode}?depth=2`
    );
  }
}
