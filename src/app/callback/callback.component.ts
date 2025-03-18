import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  fragmentParams:any = {};
  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const params = new URLSearchParams(fragment);
        params.forEach((value, key) => {
          this.fragmentParams[key] = value;
        });
        console.log('Fragment Parameters:', this.fragmentParams);
        this.getInformation()
      }
    });
  }

  getInformation(){
    this.http.get('https://www.googleapis.com/oauth2/v3/userinfo',{headers: {Authorization: `Bearer ${this.fragmentParams['access_token']}`}})
    .subscribe({
      next: (res:any)=>{
        console.log(res)
      },error: (error)=>{
        console.log(error)
      }
    })
  }

}
