import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Apollo, gql } from 'apollo-angular'

@Component({
  selector: 'vsf-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/[a-zA-Z\s]+/)]],
      companyName: [
        'AEGONA',
        [Validators.required, Validators.pattern(/[a-zA-Z\s]+/)],
      ],
      businessPhone: ['', [Validators.required]],
      email: ['quangdev@gmail.com', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    })
  }

  get fullName() {
    return this.contactForm.get('fullName')
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value

      const CREATE_CONTACT_MUTATION = gql`
        mutation CreateContact($input: CreateContactInput!) {
          createContact(input: $input) {
            id
            fullName
            email
            companyName
            message
            businessPhone
          }
        }
      `

      this.apollo
        .mutate({
          mutation: CREATE_CONTACT_MUTATION,
          variables: {
            input: {
              fullName: formData.fullName,
              companyName: formData.companyName,
              businessPhone: formData.businessPhone,
              email: formData.email,
              message: formData.message,
            },
          },
        })
        .subscribe({
          next: (result) => {
            alert(
              'Contact created successfully: ' + JSON.stringify(result.data),
            )
            this.contactForm.reset()
          },
          error: (error) => {
            console.error('Error creating contact', error)
            alert('Failed to create contact')
          },
        })
    } else {
      alert('Form is invalid')
    }
  }
}
