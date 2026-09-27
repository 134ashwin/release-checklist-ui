import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReleaseService } from './release.service';
import { Release } from './release.model'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
      <h1>🚀 Release Checklist Dashboard</h1>
      
      <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h3>Create New Release</h3>
        <input [(ngModel)]="name" placeholder="Release Name" style="margin-right: 10px; padding: 5px;" />
        <input [(ngModel)]="date" type="date" style="margin-right: 10px; padding: 5px;" />
        <button (click)="create()" style="padding: 5px 15px; cursor: pointer;">Add</button>
      </div>

      <h2>Releases</h2>
      <div *ngIf="releases.length === 0">No releases found.</div>
      <div *ngFor="let r of releases" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
        <strong>{{ r.name }}</strong> - {{ r.releaseDate }} 
        <span style="font-weight: bold; color: blue;">[{{ r.status }}]</span>
      </div>
    </div>
  `
})
export class App implements OnInit {
  releases: Release[] = [];
  name = '';
  date = '';

  constructor(private releaseService: ReleaseService) {}

  ngOnInit() {
    this.releaseService.getReleases().subscribe((data) => (this.releases = data));
  }

 create() {
  if (!this.name || !this.date) return;

  // Append time part explicitly to make it valid UTC
  const utcDate = new Date(`${this.date}T00:00:00.000Z`).toISOString();

  this.releaseService
    .createRelease({ name: this.name, date: utcDate })
    .subscribe({
      next: () => {
        this.name = '';
        this.date = '';
      },
      error: (err) => console.error('GraphQL Error:', err)
    });
}
}