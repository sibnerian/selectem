import chai from 'chai';
import { stripSelector as stripSelectorSrc } from '../src/selectem';
import { stripSelector as stripSelectorBuild } from '../build/selectem';

const expect = chai.expect;

function runSuite(stripSelector, srcOrBuild) {
  describe(srcOrBuild, () => {
    it('returns "foo" for "fooSelector', () => {
      expect(stripSelector('fooSelector')).to.eql('foo');
    });

    it('returns "bar" for "bar"', () => {
      expect(stripSelector('bar')).to.eql('bar');
    });
  });
}

describe('stripSelector', () => {
  runSuite(stripSelectorSrc, 'src');
  runSuite(stripSelectorBuild, 'build');
});
