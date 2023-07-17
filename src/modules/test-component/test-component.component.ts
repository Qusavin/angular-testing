import {CommonModule} from '@angular/common';
import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    NgModule,
    Output,
    TemplateRef,
} from '@angular/core';

@Component({
    selector: 'child',
    template: 'child',
})
export class ChildComponent {
    @ContentChild('something')
    public injectedSomething: TemplateRef<void> | undefined;

    @Input()
    public someInput = '';

    @Output()
    public someOutput = new EventEmitter();

    public childMockComponent() {}
}

@Component({
    selector: 'target-mock-component',
    template: `
        <child
            [someInput]="value"
            (someOutput)="trigger($event)"
        ></child>
    `,
})
export class TargetComponent {
    public value = '';
    public trigger = (obj: any) => obj;
}

@NgModule({
    imports: [CommonModule],
    declarations: [TargetComponent, ChildComponent],
})
export class ItsModule {}
