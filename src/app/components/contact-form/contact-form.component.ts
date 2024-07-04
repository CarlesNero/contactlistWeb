import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export default class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private ContactService = inject(ContactService);

  form?: FormGroup;
  contact?: Contact;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);

    if (id) {
      this.ContactService.get(parseInt(id)).subscribe((contact) => {
        this.contact = contact;
        this.form = this.fb.group({
          name: [contact.name, [Validators.required]],
          email: [contact.email, [Validators.required]],
          phone: [contact.phone, [Validators.required]],
        });
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      });
    }
  }

  save() {
    const contactForm = this.form!.value;
    if (this.contact) {
      this.ContactService.update(this.contact.id, contactForm).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.ContactService.create(contactForm).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
