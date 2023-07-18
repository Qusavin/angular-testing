import {Pipe, PipeTransform} from '@angular/core';

export type AtMapper<T, G> = (item: T, ...args: any[]) => G;

@Pipe({name: 'atMapper', standalone: true})
export class AtMapperPipe implements PipeTransform {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    transform<T, G>(value: T, mapper: AtMapper<T, G>, ...args: any[]): G {
        return mapper(value, ...args);
    }
}
