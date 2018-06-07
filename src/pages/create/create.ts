// imports
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})

export class CreatePage {

/* ****** attributes ******** */

   /** FormGroup
    * @name form
    * @type {FormGroup}
    * @public
    * @description     Define FormGroup property for managing form validation / data retrieval
    */
   public form                   : FormGroup;


   /** userFirstName
    * @name userFirstName
    * @type {Any}
    * @public
    * @description     Model for managing userName field
    */
   public userFirstName         : any;



   /** userLastName
    * @name userLastName
    * @type {Any}
    * @public
    * @description     Model for managing userLastName field
    */
   public userLastName : any;


   /** userPassword
    * @name userPassword
    * @type {Any}
    * @public
    * @description     Model for managing userPassword field
    */
   public userPassword: any;

   /** isEdited
    * @name isEdited
    * @type {Boolean}
    * @public
    * @description     Flag to be used for checking whether we are adding/editing an entry
    */
   public isEdited               : boolean = false;

   /** hideForm
    * @name hideForm
    * @type {Boolean}
    * @public
    * @description     Flag to hide the form upon successful completion of remote operation
    */
   public hideForm               : boolean = false;

   /** pageTitle
    * @name pageTitle
    * @type {String}
    * @public
    * @description     Property to help set the page title
    */
   public pageTitle              : string;

   /** recordId
    * @name recordID
    * @type {String}
    * @public
    * @description     Property to store the recordID for when an existing entry is being edited
    */
   public recordID               : any      = null;


   // Initialise module classes
   constructor(public navCtrl    : NavController,
              public NP         : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController
              ){
     // Create form builder validation rules
     this.form = fb.group({
        "lastName"             : ["", Validators.required],
        "firstName"            : ["", Validators.required],
        "password"             : ["", Validators.required]
     });
   }

   /** ionViewWillEnter
    * Triggered when template view is about to be entered
    * Determine whether we adding or editing a record
    * based on any supplied navigation parameters
    *
    * @public
    * @method ionViewWillEnter
    * @return {None}
    */
   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }

/* **** Entry CRUD **** */
   /** selectEntry
    * Assign the navigation retrieved data to properties
    * used as models on the page's HTML form
    *
    * @public
    * @method selectEntry
    * @param item 		{any} 			Navigation data
    * @return {None}
    */
   selectEntry(item : any) : void
   {
      this.userFirstName   = item.firstName;
      this.userLastName    = item.lastName;
      this.userPassword    = item.password;
      this.recordID        = item.id;
   }

   /** createEntry
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    * @public
    * @method createEntry
    * @param firstName      {String} 			firstName value from form field
    * @param lastName       {String} 			lastName  value from form field
    * @param password       {String} 			password  value from form field
    * @return {None}
    */
   createEntry(lastName: string, firstName: string, password: string) : void
   {

      this.sendNotification(`account : ${name} was successfully created`);
   }

   /** updateEntry
    * Update an existing record that has been edited in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method updateEntry
    * @param firstName      {String} 			firstName value from form field
    * @param lastName       {String} 			lastName  value from form field
    * @param password       {String} 			password  value from form field
    * @return {None}
    */
   updateEntry(firstName : string, lastName : string, password : string) : void
   {

         this.hideForm  =  true;
         this.sendNotification(`Congratulations the user: ${name} was successfully updated`);

   }

   /** delateEntry
    * Remove an existing record that has been selected in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    * @public
    * @method deleteEntry
    * @return {None}
    */
   deleteEntry() : void
   {
         this.hideForm     = true;
         this.sendNotification(`Congratulations the user: ${name} was successfully deleted`);
   }

   /** saveEntry
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    * @public
    * @method saveEntry
    * @return {None}
    */
   saveEntry() : void
   {
      let firstName     : string    = this.form.controls["firstName"].value,
          lastName      : string    = this.form.controls["lastName"].value,
          password      : string    = this.form.controls["password"].value


      if(this.isEdited)
      {
         this.updateEntry(firstName, lastName, password );
      }
      else
      {
         this.createEntry(firstName, lastName, password );
         this.navCtrl.push(LoginPage);
      }
   }

   /** resetFields
    * Clear values in the page's HTML form fields
    *
    * @public
    * @method resetFields
    * @return {None}
    */
   resetFields() : void
   {
      this.userFirstName   = "";
      this.userLastName    = "";
      this.userPassword    = "";
   }

   /** sendNotification
    * Manage notifying the user of the outcome of remote operations
    *
    * @public
    * @method sendNotification
    * @param message 	{String} 			Message to be displayed in the notification
    * @return {None}
    */
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

}
