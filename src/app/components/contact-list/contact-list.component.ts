import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export default class ContactListComponent implements OnInit {
  private ContactService = inject(ContactService);

  contacts: Contact[] = [];

  ngOnInit(): void {
    this.ContactService.list().subscribe((contacts: any) => {
      this.contacts = contacts;
    });
  }
  loadAll() {
    this.ContactService.list().subscribe((contacts: any) => {
      this.contacts = contacts;
    });
  }

  deleteContact(contact: Contact) {
    this.ContactService.delete(contact.id).subscribe(() => {
      this.loadAll();
    });
  }
}
