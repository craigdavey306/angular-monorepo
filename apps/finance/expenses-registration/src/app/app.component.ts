import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NavbarComponent,
  NavbarItem,
} from '@bt-libs/shared/ui/common-components';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navItems: NavbarItem[] = [
    { label: 'expenses approval', route: '/expenses-approval' },
  ];
}
