import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiDialogModule,
    TuiRootModule,
} from '@taiga-ui/core';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'at-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    standalone: true,
    imports: [CommonModule, RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule],
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
})
export class AppComponent {
    title = 'angular-testing';
}
