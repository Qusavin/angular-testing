import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';
import {ChildComponent, TargetComponent} from './test-components';

describe('MockComponent', () => {
    beforeEach(() => MockBuilder(TargetComponent));

    it('sends the correct value to the child input', () => {
        const fixture = MockRender(TargetComponent);
        const component = fixture.point.componentInstance;

        const childComponent = ngMocks.find<ChildComponent>('child').componentInstance;

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
            <child>
                <p>inside content</p>
            </child>
        `);

        const mockNgContent = localFixture.point.nativeElement.innerHTML;

        expect(mockNgContent).toContain('inside content');
    });

    it('renders ContentChild of the child component', () => {
        const fixture = MockRender<ChildComponent>(`
            <child>
                <p>inside content</p>
                <ng-template #something>
                    <p>inside template</p>
                </ng-template>
            </child>
        `);

        // Injected ng-content rendered everything except templates.
        const mockNgContent = fixture.point.nativeElement.innerHTML;

        expect(mockNgContent).toContain('inside content');
        expect(mockNgContent).not.toContain('inside template');

        // Render the template
        const mockComponent = fixture.componentInstance;
        ngMocks.render(mockComponent, ngMocks.findTemplateRef('something'));

        // The rendered template is wrapped by <div data-key="something">.
        const mockNgTemplate = ngMocks.find(ChildComponent).nativeElement.innerHTML;

        expect(mockNgTemplate).toContain('inside template');
    });
});
