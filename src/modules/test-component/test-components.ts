import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';

@Component({
    selector: 'at-child',
    template: 'child {{someInput}}',
    standalone: true,
})
export class ChildComponent {
    @ContentChild('something')
    injectedSomething: TemplateRef<void> | undefined;

    @Input()
    someInput = '';

    @Output()
    readonly someOutput = new EventEmitter<string>();
}

@Component({
    selector: 'target-mock-component',
    template: `
        <at-child
            [someInput]="value"
            (someOutput)="log($event)"
        ></at-child>
    `,
    standalone: true,
    imports: [ChildComponent],
})
export class TargetComponent {
    value = '';

    log(value: string) {}
}
