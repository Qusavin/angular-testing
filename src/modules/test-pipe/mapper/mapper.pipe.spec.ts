import {AtMapper, AtMapperPipe} from './mapper.pipe';

describe(`AtMapper pipe`, () => {
    let pipe: AtMapperPipe;
    const data = 'test';
    const args = ['three', 'eleven'];
    const mapper: AtMapper<string, string> = (item, ...rest) =>
        item.toUpperCase() + rest.join(` `);

    beforeEach(() => {
        pipe = new AtMapperPipe();
    });

    it(`Mapper works`, () => {
        expect(pipe.transform(data, mapper)).toBe(data.toUpperCase());
    });

    it(`Works with extra arguments`, () => {
        expect(pipe.transform(data, mapper, ...args)).toEqual(`TESTthree eleven`);
    });
});
