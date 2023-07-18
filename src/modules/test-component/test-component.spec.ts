import {MockBuilder, MockRender, ngMocks} from 'ng-mocks';
import {ChildComponent, TargetComponent} from './test-components';

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
