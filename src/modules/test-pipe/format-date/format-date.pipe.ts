import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {FormatDateService} from './format-date.service';

@Pipe({
    name: 'atFormatDate',
    standalone: true,
})
export class AtFormatDatePipe implements PipeTransform {
    constructor(private readonly formatDateService: FormatDateService) {}

    transform(date: Date): Observable<string> {
        return this.formatDateService.format(date);
    }
}
