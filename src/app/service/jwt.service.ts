import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  isExpired(accessToken: string) {
    if(accessToken == null) {
      return true;
    }
    let payload: any = jwt_decode(accessToken);
    console.log("PAYLOAD: " + JSON.stringify(payload));

    let expiryTimestamp = payload?.exp;
    let dateTodayTimestamp = Math.floor(new Date().getTime() / 1000);

    console.log(`Payload Expiry ${expiryTimestamp}`);
    console.log(`Today ${dateTodayTimestamp}`);

    console.log(expiryTimestamp < dateTodayTimestamp)
    
    return expiryTimestamp < dateTodayTimestamp;
  }
}
