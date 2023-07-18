import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AtValueChangesDirective} from './value-changes.directive';
import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from 'ng-mocks';

describe(`AtValueChangesDirective`, () => {
    @Component({
        template: `
            <form
                [formGroup]="form"
                (atValueChanges)="formSpy($event)"
            >
                <input
                    formControlName="control"
                    (atValueChanges)="controlSpy($event)"
                />
            </form>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [AtValueChangesDirective, ReactiveFormsModule],
    })
    class TestComponent {
        readonly form = new FormGroup({
            control: new FormControl(),
        });

        formSpy = jest.fn();
        controlSpy = jest.fn();
    }

    beforeEach(() => {
        MockBuilder(TestComponent);
    });

    it(`works for controls`, () => {
        const fixture = MockRender(TestComponent);
        const testComponent = fixture.point.componentInstance;

        fixture.detectChanges();

        const input = ngMocks.find<HTMLInputElement>(fixture, 'input');

        setInputValue(input.nativeElement, 'hello');

        expect(testComponent.controlSpy).toHaveBeenCalledWith('hello');
    });

    it(`works for containers`, () => {
        const fixture = MockRender(TestComponent);
        const testComponent = fixture.point.componentInstance;

        fixture.detectChanges();

        const input = ngMocks.find<HTMLInputElement>(fixture, 'input');

        setInputValue(input.nativeElement, 'hello');

        expect(testComponent.formSpy).toHaveBeenCalledWith({control: 'hello'});
    });

    function setInputValue(input: HTMLInputElement, value: string) {
        input.value = value;
        input.dispatchEvent(new Event('input'));
    }
});
