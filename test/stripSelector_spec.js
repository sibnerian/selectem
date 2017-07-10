import chai from 'chai';
import { stripSelector } from '../src/selectem';

const expect = chai.expect;

describe('stripSelector', () => {
  it('returns "foo" for "fooSelector', () => {
    expect(stripSelector('fooSelector')).to.eql('foo');
  });

  it('returns "bar" for "bar"', () => {
    expect(stripSelector('bar')).to.eql('bar');
  });
});
