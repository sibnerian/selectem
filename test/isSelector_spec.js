import chai from 'chai';
import { isSelector } from '../src/selectem';

const expect = chai.expect;

describe('isSelector', () => {
  it('returns true for "fooSelector', () => {
    expect(isSelector('fooSelector')).to.eql(true);
  });

  it('returns false for "foo"', () => {
    expect(isSelector('foo')).to.eql(false);
  });

  it('returns false for "Selector" (edge case)', () => {
    expect(isSelector('Selector')).to.eql(false);
  });
});
