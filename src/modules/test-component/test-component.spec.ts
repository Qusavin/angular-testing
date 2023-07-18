import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';

@Component({
    selector: 'at-child',
    template: 'child {{someInput}}',
    standalone: true,
})
class ChildComponent {
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
class TargetComponent {
    value = '';

    log(value: string) {}
}

describe('MockComponent', () => {
    beforeEach(() => MockBuilder(TargetComponent));

    it('sends the correct value to the child input', () => {
        const fixture = MockRender(TargetComponent);
        const component = fixture.point.componentInstance;

        const childComponent = ngMocks.find<ChildComponent>('at-child').componentInstance;

        const newInputValue = '42';

        component.value = newInputValue;
        fixture.detectChanges();

        expect(childComponent.someInput).toEqual(newInputValue);
    });

    it('does something on an emit of the child component', () => {
        const fixture = MockRender(TargetComponent);
        const component = fixture.point.componentInstance;

        const mockComponent = ngMocks.findInstance(ChildComponent);

        ngMocks.stubMember(component, 'log', jest.fn());

        const outputValue = '42';

        mockComponent.someOutput.emit(outputValue);

        expect(component.log).toHaveBeenCalledWith(outputValue);
    });

    it('renders something inside of the child component', () => {
        const localFixture = MockRender<ChildComponent>(`
            <at-child>
                <p>inside content</p>
            </at-child>
        `);

        const mockNgContent = localFixture.point.nativeElement.innerHTML;

        expect(mockNgContent).toContain('inside content');
    });
});
