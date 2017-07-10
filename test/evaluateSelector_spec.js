import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { evaluateSelector } from '../src/selectem';

chai.use(sinonChai);
const expect = chai.expect;

const mockFunctionArity1 = sinon.spy(x => x);
const mockFunctionArity2 = sinon.spy((x, y) => y);

describe('evaluateSelector', () => {
  beforeEach(() => {
    mockFunctionArity1.reset();
    mockFunctionArity2.reset();
  });

  it('passes in state only for arity 1', () => {
    evaluateSelector(mockFunctionArity1, 'stateObject');
    expect(mockFunctionArity1).to.have.callCount(1);
    expect(mockFunctionArity1).to.have.been.calledWithExactly('stateObject');
  });

  it('does not pass in ownProps for arity 1, even if supplied', () => {
    evaluateSelector(mockFunctionArity1, 'stateObject', 'ownProps');
    expect(mockFunctionArity1).to.have.callCount(1);
    expect(mockFunctionArity1).to.have.been.calledWithExactly('stateObject');
  });

  it('passes in state and ownprops for arity 2', () => {
    evaluateSelector(mockFunctionArity2, 'stateObject', 'ownProps');
    expect(mockFunctionArity2).to.have.callCount(1);
    expect(mockFunctionArity2).to.have.been.calledWithExactly('stateObject', 'ownProps');
  });
});
