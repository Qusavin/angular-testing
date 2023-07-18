import {Component, ElementRef, Inject} from '@angular/core';
import {Subject} from 'rxjs';
import {MockBuilder, MockRender} from "ng-mocks";
import {ForDirective} from './for.directive';
import {CommonModule} from "@angular/common";

describe(`AtFor directive`, () => {
    @Component({
        template: `
            <div *ngFor="let item of items$ | async; else: loading; empty: blank">
                {{ item }}
            </div>
            <ng-template #loading>Loading</ng-template>
            <ng-template #blank>Blank</ng-template>
        `,
        standalone: true,
        imports: [ForDirective, CommonModule]
    })
    class TestComponent {
        readonly items$ = new Subject<string[]>();

        constructor(
            @Inject(ElementRef)
            readonly el: ElementRef<HTMLElement>
        ) {}
    }

    beforeEach(() => MockBuilder(TestComponent).keep(ForDirective));

    it(`when ngFor is falsy shows loading`, () => {
        const fixture = MockRender(TestComponent);
        const component = fixture.point.componentInstance;

        expect(text(component)).toBe(`Loading`);
    });

    it(`when ngFor is empty shows empty content`, () => {
        const fixture = MockRender(TestComponent);
        const component = fixture.point.componentInstance;

        component.items$.next([]);
        fixture.detectChanges();

        expect(text(component)).toBe(`Blank`);
    });

    it(`does not interfere with regular ngFor`, () => {
        const fixture = MockRender(TestComponent);
        const component = fixture.point.componentInstance;

        component.items$.next([`1`, `2`, `3`]);
        fixture.detectChanges();

        expect(text(component)).toBe(`1  2  3`);
    });

    function text(testComponent: TestComponent): string {
        return testComponent.el.nativeElement.textContent?.trim() || ``;
    }
});
