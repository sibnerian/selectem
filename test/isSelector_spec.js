import chai from 'chai';
import { isSelector as isSelectorSrc } from '../src/selectem';
import { isSelector as isSelectorBuild } from '../build/selectem';

const expect = chai.expect;

function runSuite(isSelector, srcOrBuild) {
  describe(srcOrBuild, () => {
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
}

describe('isSelector', () => {
  runSuite(isSelectorSrc, 'src');
  runSuite(isSelectorBuild, 'build');
});
