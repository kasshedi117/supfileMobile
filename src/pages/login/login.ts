import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { CreatePage } from '../create/create';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

   /** baseURI
    * @name baseURI
    * @type {String}
    * @public
    * @description     Remote URI for retrieving data from and sending data to
    */

  userPassword  : string;
  userFirstName : string;

  constructor(public navCtrl: NavController ,
              ) {
  }

  buttonSignInClicked(){
        this.navCtrl.push(TabsPage);
  }

  buttonCreateAnAccountClicked(){
       this.navCtrl.push(CreatePage);
  }




}
