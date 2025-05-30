import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AddressService,
  Province,
  District,
  Ward,
} from '../../service/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  isLoading = false;
  showSuccessMessage = false;

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: [''],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadProvinces();
    this.setupFormListeners();
  }

  loadProvinces(): void {
    this.addressService.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data;
        console.log('Provinces loaded successfully');
      },
      error: (error) => {
        console.error('Error loading provinces:', error);
        // Fallback data
        this.provinces = [
          {
            code: '1',
            name: 'Hà Nội',
            districts: [
              {
                code: '1',
                name: 'Ba Đình',
                wards: [{ code: '1', name: 'Phường Phúc Xá' }],
              },
            ],
          },
          {
            code: '79',
            name: 'TP. Hồ Chí Minh',
            districts: [
              {
                code: '760',
                name: 'Quận 1',
                wards: [{ code: '760101', name: 'Phường Bến Nghé' }],
              },
            ],
          },
        ];
      },
    });
  }

  setupFormListeners(): void {
    // Listen to province changes
    this.checkoutForm
      .get('province')
      ?.valueChanges.subscribe((provinceCode) => {
        if (provinceCode) {
          this.onProvinceChange(provinceCode);
        } else {
          this.districts = [];
          this.wards = [];
        }
      });

    // Listen to district changes
    this.checkoutForm
      .get('district')
      ?.valueChanges.subscribe((districtCode) => {
        const provinceCode = this.checkoutForm.get('province')?.value;
        if (provinceCode && districtCode) {
          this.onDistrictChange(provinceCode, districtCode);
        } else {
          this.wards = [];
        }
      });
  }

  onProvinceChange(provinceCode: string): void {
    const selectedProvince = this.provinces.find(
      (p) => p.code === provinceCode
    );
    if (selectedProvince) {
      this.districts = selectedProvince.districts;
      this.wards = [];
      // Reset district and ward values
      this.checkoutForm.patchValue({
        district: '',
        ward: '',
      });
    }
  }

  onDistrictChange(provinceCode: string, districtCode: string): void {
    const selectedProvince = this.provinces.find(
      (p) => p.code === provinceCode
    );
    if (selectedProvince) {
      const selectedDistrict = selectedProvince.districts.find(
        (d) => d.code === districtCode
      );
      if (selectedDistrict) {
        this.wards = selectedDistrict.wards;
        // Reset ward value
        this.checkoutForm.patchValue({
          ward: '',
        });
      }
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage = true;

        console.log('Order data:', this.checkoutForm.value);

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.checkoutForm.controls).forEach((key) => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
