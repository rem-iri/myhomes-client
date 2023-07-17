import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/shared/http-client.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';


interface Inquiry {
  buyer_id: string,
  message: string,
  phoneNumber: string,
  email: string,
  date: string,
  firstName?: string,
  lastName?: string,
}

@Component({
  selector: 'app-view-inquiries',
  templateUrl: './view-inquiries.component.html',
  styleUrls: ['./view-inquiries.component.scss']
})
export class ViewInquiriesComponent implements OnInit{
  routePropertyId = this.route.snapshot.paramMap.get('id');

  buyer: Inquiry;
  property: {
    id: string,
    listingTitle: string,
    propertyType: string,
    saleType: string,
    city: string,
    dateCreated: string,
    inquiries: Inquiry[],
    user_id: string
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientService,
    public dialog: MatDialog,
    ) {

  }

  openDialog(inquiry: Inquiry): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      data: inquiry
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit(): void {
    if(this.routePropertyId) {
      this.getPropertyData(this.routePropertyId);
    }
  }

  async getPropertyData(propertyId: string) {
    this.property = await this.httpClient.getPropertyById(propertyId);
    console.log(this.property);

    let transformedInquiries = await Promise.all(this.property?.inquiries?.map( async (e) => {
      let buyerFetchedData = await this.getBuyerData(e?.buyer_id);
      return {
        ...e,
        firstName: buyerFetchedData?.firstName,
        lastName: buyerFetchedData?.lastName
       }
    }))

    transformedInquiries.sort(function(x, y){
        return (parseInt(y?.date) ?? 0) - (parseInt(x?.date) ?? 0);
    })
    

    this.property = {...this.property, inquiries: transformedInquiries};
    console.log(this.property);
  }

  async getBuyerData(userId: string) {
    return await this.httpClient.getUserById(userId);

  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'modal-info.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DatePipe]
})
export class DialogElementsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("modalData", data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}