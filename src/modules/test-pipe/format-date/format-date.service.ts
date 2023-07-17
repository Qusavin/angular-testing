import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class FormatDateService {
    format(date: Date): Observable<string> {
        return of('');
    }
}
