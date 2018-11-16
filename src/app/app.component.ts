import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  private authSubscription: Subscription;

  constructor ( private auth: AuthService, private router: Router) {
    // The user Observable will be triggered everytime the user change.
    this.authSubscription = this.auth.user$.subscribe(user => {
      if (user) {
        const returnUrl = localStorage.getItem('returnUrl');
        this.router.navigate([returnUrl]);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
