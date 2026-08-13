import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage {
  protected readonly api = inject(ApiService);
  protected readonly auth = inject(AuthService);
}
