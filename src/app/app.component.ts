import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'at-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    standalone: true,
    imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
    title = 'angular-testing';
}
