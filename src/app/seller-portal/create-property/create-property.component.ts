import { Component, OnInit } from '@angular/core';
import regions from "../../../assets/regions.json";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit{
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

    // ===========

    // this.formData = this.formBuilder.group({
    //   files   : []
    // });
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

    await this.httpClient.createProperty(this.propertyForm.value);

    console.log(JSON.stringify(this.propertyForm.value, null, 4));
    this.router.navigateByUrl("/seller/properties");
    this.openSnackBar("Successfully added your property.", undefined);
  }



  


  // ===========================================================

 
 
  // formData: FormGroup;

  // filesToUpload: File[] = [];
  // fileToUpload1: File;
  // fileToUpload2: File;
 
  // handleFileInput(event: any) {
  //   this.fileToUpload1 = <File>event.target.files[0];
  // }
 
  // handleFileInput1(event: any) {
  //   this.fileToUpload1 = <File>event.target.files[0];
  // }
 
  // handleFileInput2(event: any) {
  //   this.fileToUpload2 = <File>event.target.files[0];
  // }
 
  // onImageSubmit():void {
 
  //   const multipartFormData: FormData = new FormData();

  //   this.filesToUpload.forEach(e => {
  //     multipartFormData.append('document', e, e.name);
  //   })

    
  //   multipartFormData.append('document', this.fileToUpload1, this.fileToUpload1.name);
  //   multipartFormData.append('document', this.fileToUpload2, this.fileToUpload2.name);
 
  //   let url = 'http://localhost:5556/api/upload/documents';
 
  //   this.ngHttpClient
  //     .post(url, multipartFormData, {observe: 'response'}).subscribe(
  //     resp => {
  //       console.log(resp.body);
  //     },
  //     err => {
  //       console.log(err);
 
  //     });
  // }

}
