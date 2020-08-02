import { RegisterService } from './Service/register.service';
import { RegisterUserModel } from './../models/register.model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: RegisterUserModel = new RegisterUserModel();
  registerForm: FormGroup;
  role = new FormControl('auto');
  submitted = false;
  roleValidator = [];

  constructor(private FormBuilder: FormBuilder,private router: Router,private RegisterService: RegisterService) {
    this.user.role = 'participant';
   }

  ngOnInit(): void {
    this.registerForm = this.FormBuilder.group({
      'userName': [this.user.username, [
        Validators.required
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-zA-Z]).{8,12}$'),
      ]],
      'firstName': [this.user.firstName, [
        Validators.required,
      ]],
      'lastName': [this.user.lastName, [
        Validators.required,
      ]],
      'city': [this.user.city, [
        Validators.required
      ]],
      'street': [this.user.street, [
        Validators.required,
      ]],
      'buildingNumber': [this.user.buildingNumber, [
        Validators.required,
      ]],
      'apartmentNumber': [this.user.apartmentNumber, [
        Validators.required,
      ]],
      'phone': [this.user.phone, [
        Validators.required,
      ]],
      'role': [this.user.role, [
        Validators.required,
      ]],
      'code': [this.user.code, this.roleValidator],
    });

    this.registerForm.get('role').valueChanges
      .subscribe(value => {
        if(value) {
          this.registerForm.get('code').setValidators(this.roleValidator);
        } else {
          this.registerForm.get('code').setValidators(this.roleValidator.concat(Validators.required));
        }
      });
    }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    } else {
      this.RegisterService.register(this.registerForm.value).subscribe(data => {
        if (data === 'insertion succeed'){
         alert('Thank you for sign up, the code to invite participants is in your profile');
        }
        this.router.navigate(['/home']);
      },
      Error => {
        alert(JSON.parse(Error.error).error);
      });
    }
  }

}
