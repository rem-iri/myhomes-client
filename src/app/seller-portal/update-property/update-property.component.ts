import { Component, OnInit } from '@angular/core';
import regions from "../../../assets/regions.json";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.scss']
})
export class UpdatePropertyComponent {
  constructor(
    private authStateService: AuthStateService,
    private httpClient: HttpClientService,
    private ngHttpClient: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {

  }
  submitted = false;
  regions: any = [];

  routePropertyId = this.route.snapshot.paramMap.get('id')

  user_id = new FormControl("");
  listingTitle = new FormControl("", [Validators.required]);
  propertyType = new FormControl("", [Validators.required]);
  description = new FormControl("", [Validators.required]);
  furnishing = new FormControl("", [Validators.required]);
  saleType = new FormControl("", [Validators.required]);
  bath = new FormControl(0, [Validators.required, Validators.min(0)]);
  bedroom = new FormControl(0, [Validators.required, Validators.min(0)]);
  price = new FormControl(0, [Validators.required, Validators.min(0)]);
  area = new FormControl(0, [Validators.required, Validators.min(0)]);
  houseNumber = new FormControl("", [Validators.required]);
  street = new FormControl("", [Validators.required]);
  village = new FormControl("", [Validators.required]);
  city = new FormControl("", [Validators.required]);
  province = new FormControl("", [Validators.required]);
  region = new FormControl("", [Validators.required]);
  isSold = new FormControl(false, [Validators.required]);
  images = new FormControl([]);

  propertyForm: FormGroup = this.formBuilder.group(
    {
      user_id: this.user_id,
      listingTitle: this.listingTitle,
      propertyType: this.propertyType,
      description: this.description,
      furnishing: this.furnishing,
      saleType: this.saleType,
      bath: this.bath,
      bedroom: this.bedroom,
      price: this.price,
      area: this.area,
      houseNumber: this.houseNumber,
      street: this.street,
      village: this.village,
      city: this.city,
      province: this.province,
      region: this.region,
      isSold: this.isSold,
      images: this.images,
    }
  )

  ngOnInit(): void {
    this.regions = regions;
    console.log("REGIONS", regions[0]);
    console.log("CURRENT USER", this.authStateService.getCurrentUser())
    this.user_id.setValue(this.authStateService.getCurrentUser()?.id);

    this.getCurrentProperty();

    // ===========

    // this.formData = this.formBuilder.group({
    //   files   : []
    // });
  }

  async getCurrentProperty() {

    if(this.routePropertyId == null) {
      return;
    }
    let currentProperty = await this.httpClient.getPropertyById(this.routePropertyId);

    this.user_id.setValue(currentProperty.user_id);
    this.listingTitle.setValue(currentProperty.listingTitle);
    this.propertyType.setValue(currentProperty.propertyType);
    this.description.setValue(currentProperty.description);
    this.furnishing.setValue(currentProperty.furnishing);
    this.saleType.setValue(currentProperty.saleType);
    this.bath.setValue(currentProperty.bath);
    this.bedroom.setValue(currentProperty.bedroom);
    this.price.setValue(currentProperty.price);
    this.area.setValue(currentProperty.area);
    this.houseNumber.setValue(currentProperty.houseNumber);
    this.street.setValue(currentProperty.street);
    this.village.setValue(currentProperty.village);
    this.city.setValue(currentProperty.city);
    this.province.setValue(currentProperty.province);
    this.region.setValue(currentProperty.region);
    this.isSold.setValue(currentProperty.sold);
    this.images.setValue(currentProperty.images);
  }

  getChildOnPropertyMatch(regionsArr: any, key:string , value: string | null, childToReturn: any) {
    let regionObj = regionsArr.filter((e:any) => {
      return (e as any)?.[key] == value;
    })[0];

    // console.log("getChildOnPropertyMatch VALUE", value)
    // console.log("getChildOnPropertyMatch KEY", key)
    // console.log("getChildOnPropertyMatch VALUE OF KEY", regionObj)

    
    if(regionObj?.[key] == value) {
      // console.log("getChildOnPropertyMatch MATCH", value)
      // return [];
      return regionObj[childToReturn];
    } else {
      return undefined;
    }
  }

  getProvinceByName(regionsArr: any, regionName: string | undefined | null) {
    if(regionName == null) {
      return [];
    }
    let filteredProvince = regionsArr.filter((e: any) => (e as any)?.["regionName"] == regionName)?.[0]?.provinces ?? [];
    // console.log("filteredProvince", filteredProvince);
    return filteredProvince;
  }

  openSnackBar(message: string, action: string | undefined) {
    this._snackBar.open(message, action, {duration: 6000});
  }

  updateImages(uploadedImages: any) {
    console.log("RECEIVED IMAGES", uploadedImages)
    let transformToImageModel = uploadedImages.map((e:any) => { return {imageUrl: e}})
    console.log("TRANSFORMED", transformToImageModel);
    this.images.setValue(transformToImageModel);
  }

  async onSubmit() {
    this.submitted = true;

    console.log(this.propertyForm)

    // stop here if form is invalid
    if (this.propertyForm.invalid) {
      return;
    }

    if (!this.routePropertyId) {
      return;
    }

    await this.httpClient.updateProperty(this.routePropertyId, this.propertyForm.value);

    console.log(JSON.stringify(this.propertyForm.value, null, 4));
    this.router.navigateByUrl("/seller/properties");
    this.openSnackBar("Successfully updated your property.", undefined);
  }


  regionChange() {
    this.province.setValue("");
    this.city.setValue("");
  }

  provinceChange() {
    this.city.setValue("");
  }
}
