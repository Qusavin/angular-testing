import {MockBuilder, MockInstance, MockRender, ngMocks} from 'ng-mocks';
import {FormatDatePipe} from './format-date.pipe';
import {FormatDateService} from './format-date.service';
import {Component} from "@angular/core";

describe(`atFormatDate`, () => {
    @Component({
        template: '',
        standalone: true,
        providers: [FormatDatePipe, FormatDateService]
    })
    class TestComponent {}

    beforeEach(() => MockBuilder(TestComponent).keep(FormatDatePipe));

    it(`should call format service method`, () => {
        const formatFn = jest.fn();
        MockInstance(FormatDateService, 'format', formatFn)

        MockRender(TestComponent);

        const date = new Date();
        const formatDatePipe = ngMocks.findInstance(FormatDatePipe);

        formatDatePipe.transform(date);

        expect(formatFn).toHaveBeenCalledWith(date);
    });
});
