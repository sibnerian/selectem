import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import selectem from '../src/selectem';

chai.use(sinonChai);
const expect = chai.expect;

const state = { foober: 1, goober: 2 };
const ownProps = { oober: 3 };
const fooberSelector = s => s.foober;
const gooberSelector = s => s.goober;
const fooberOoberSelector = (s, p) => s.foober + p.oober;


describe('selectem', () => {
  it('returns a function', () => {
    expect(selectem({})).to.be.a('function');
  });

  it('has arity 1 if no selectors depend on ownProps', () => {
    const mapStateToProps = selectem({ fooberSelector, gooberSelector });
    expect(mapStateToProps.length).to.eql(1);
  });

  it('has arity 2 if some selector depends on ownProps', () => {
    const mapStateToProps = selectem({ fooberSelector, gooberSelector, fooberOoberSelector });
    expect(mapStateToProps.length).to.eql(2);
  });

  it('has arity 2 if some selector has arity 0', () => {
    const weirdSelector = (...args) => typeof args[0];
    const mapStateToProps = selectem({ weirdSelector });
    expect(mapStateToProps.length).to.eql(2);
  });

  describe('when applied to state', () => {
    it('strips off "Selector" from keys and applies each selector to state', () => {
      const mapStateToProps = selectem({ fooberSelector, gooberSelector });
      expect(mapStateToProps(state)).to.eql({
        foober: 1,
        goober: 2,
      });
    });

    it('passes through props that don’t end in "Selector"', () => {
      const mapStateToProps = selectem({ fooberSelector, greeble: s => s.foober + s.goober });
      expect(mapStateToProps(state)).to.eql({
        foober: 1,
        greeble: 3,
      });
    });

    it('passes through ownProps to selectors that require it', () => {
      const mapStateToProps = selectem({ fooberSelector, gooberSelector, fooberOoberSelector });
      expect(mapStateToProps(state, ownProps)).to.eql({
        foober: 1,
        goober: 2,
        fooberOober: 4,
      });
    });

    it('calls 2-arg selectors with both args, but 1-arg selectors with 1', () => {
      const selectors = {
        fooberSelector: sinon.spy(fooberSelector),
        gooberSelector: sinon.spy(gooberSelector),
        fooberOoberSelector: sinon.spy(fooberOoberSelector),
      };
      const mapStateToProps = selectem(selectors);
      expect(mapStateToProps(state, ownProps)).to.eql({
        foober: 1,
        goober: 2,
        fooberOober: 4,
      });
      expect(selectors.fooberSelector).to.have.been.calledWithExactly(state);
      expect(selectors.gooberSelector).to.have.been.calledWithExactly(state);
      expect(selectors.fooberOoberSelector).to.have.been.calledWithExactly(state, ownProps);
    });
  });
});
