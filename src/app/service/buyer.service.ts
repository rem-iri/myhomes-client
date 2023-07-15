import { AuthStateService } from "../shared/auth-state.service";
import { User } from "../model/user";
import { HttpClient } from "@angular/common/http";
import { HttpClientService } from "../shared/http-client.service";
import { SellerUser } from "../model/seller-user";
import {Injectable} from '@angular/core';
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class BuyerService{
    private baseUrl = 'http://localhost;5556/api/buyer';

    constructor(private http: HttpClient){}

    sendInquiry(senderId: string, receiverId: string, message:string):Observable<any>{
         const body = {
      receiverId: receiverId,
      senderId:senderId,
      message: message
    };
        return this.http.post(`${this.baseUrl}/inquiry`,body,{responseType:'text'});
    }

    getAllProperties():Observable<any>{
        return this.http.get(`${this.baseUrl}/properties`);
    }

    
    




}

