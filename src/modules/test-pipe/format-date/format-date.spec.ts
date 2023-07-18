import {TestBed} from '@angular/core/testing';
import {MockInstance, MockProvider, ngMocks} from 'ng-mocks';
import {configureTestSuite} from '@utils/configure-test-suit';
import {AtFormatDatePipe} from './format-date.pipe';
import {FormatDateService} from './format-date.service';

describe(`AtFormatDate pipe`, () => {
    const formatFn = jest.fn();

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            providers: [
                AtFormatDatePipe,
                MockProvider(FormatDateService, {format: formatFn}),
            ],
        });
    });

    it(`should call format service method`, () => {
        MockInstance(FormatDateService, 'format', formatFn);

        const date = new Date();
        const formatDatePipe = ngMocks.findInstance(AtFormatDatePipe);

        formatDatePipe.transform(date);

        expect(formatFn).toHaveBeenCalledWith(date);
    });
});
