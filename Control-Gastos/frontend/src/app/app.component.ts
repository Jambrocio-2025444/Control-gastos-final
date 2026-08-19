import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>
            <app-session-expired></app-session-expired>`,
    standalone: false
})
export class AppComponent {}