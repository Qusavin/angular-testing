import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    NgModule,
    Output,
    TemplateRef,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';

@Component({
    selector: 'child',
    template: 'dependency',
})
class ChildComponent {
    @ContentChild('something')
    injectedSomething?: TemplateRef<any>;

    @Input()
    someInput = '';

    @Output()
    readonly someOutput = new EventEmitter();

    childMockRender() {}
}

@NgModule({
    declarations: [ChildComponent],
    imports: [CommonModule],
})
class ChildModule {}

@Component({
    selector: 'target',
    template: `
        <child
            [someInput]="value1"
            (someOutput)="trigger.emit($event)"
        ></child>
    `,
})
class TargetComponent {
    @Input()
    value1 = 'default1';

    @Input()
    value2 = 'default2';

    @Output()
    readonly trigger = new EventEmitter();

    public targetMockRender() {}
}

describe('MockRender', () => {
    beforeEach(() => MockBuilder(TargetComponent, ChildModule));

    it('renders template', () => {
        const spy = jest.fn();

        const fixture = MockRender(
            `
            <target
              (trigger)="myListener1($event)"
              [value1]="myParam1"
              value2="check"
            >
              <ng-template #header>
                something as ng-template
              </ng-template>
              something as ng-content
            </target>
          `,
            {
                myListener1: spy,
                myParam1: 'something1',
            },
        );

        expect(ngMocks.input(fixture.point, 'value1')).toEqual('something1');
        expect(ngMocks.input(fixture.point, 'value2')).toEqual('check');

        ngMocks.output(fixture.point, 'trigger').emit('foo1');
        expect(spy).toHaveBeenCalledWith('foo1');
    });

    it('renders inputs and outputs automatically', () => {
        const spy = jest.fn();
        const fixture = MockRender(TargetComponent, {
            trigger: spy,
            value1: 'something2',
        });

        // Checking the inputs.
        expect(ngMocks.input(fixture.point, 'value1')).toEqual('something2');
        expect(ngMocks.input(fixture.point, 'value2')).toEqual('default2');

        // Checking the outputs.
        ngMocks.output(fixture.point, 'trigger').emit('foo2');
        expect(spy).toHaveBeenCalledWith('foo2');

        fixture.componentInstance.value1 = 'updated';
        fixture.detectChanges();
        expect(ngMocks.input(fixture.point, 'value1')).toEqual('updated');
    });
});
