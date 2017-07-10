# selectem

[![Build Status](https://travis-ci.org/sibnerian/selectem.svg?branch=master)](https://travis-ci.org/sibnerian/selectem) [![Coverage Status](https://coveralls.io/repos/github/sibnerian/selectem/badge.svg?branch=master)](https://coveralls.io/github/sibnerian/selectem?branch=master) [![npm version](https://badge.fury.io/js/selectem.svg?branch=master)](https://badge.fury.io/js/selectem)

Shorthand for react-redux’s mapStateToProps. Need some props? Just select 'em!

## Before
```jsx
const mapStateToProps = (state) => ({
  foober: fooberSelector(state),
  goober: gooberSelector(state),
  anotherProp: anotherPropSelector(state),
  youGetTheIdea: youGetTheIdeaSelector(state),
});
```
<img src="http://i.imgur.com/oQbpQWM.gif" alt="a dude banging his keyboard, clearly frustrated" width="200" />

## After
```jsx
const mapStateToProps = selectem({
  fooberSelector,
  gooberSelector,
  anotherPropSelector,
  youGetTheIdeaSelector,
});
```

<img src="http://i.imgur.com/ndpQAld.gif" alt="a cool kid on a computer giving the thumbs up" width="200" />

## Why tho?
- Avoid typos
- Write less characters
- DRY up your code
- Why not?

## Advanced
### What if my selectors need `ownProps`?
Normally `react-redux` checks the number of arguments of `mapStateToProps` to determine whether or not to pass in an `ownProps` parameter [[1]](https://github.com/reactjs/react-redux/blob/master/docs/api.md#the-arity-of-mapstatetoprops-and-mapdispatchtoprops-determines-whether-they-receive-ownprops). We’ll do the [same arity check as `react-redux`](https://github.com/reactjs/react-redux/blob/master/src/connect/wrapMapToProps.js#L20) and pass `ownProps` to each selector that needs it. :+1:

### I want to give one of my props a custom name! Can it be done?
Yes, only props that end in "Selector" will be renamed! If you give a prop a custom name it will just get passed through automatically.

### I have a complicated `mapStateToProps` function but I still hate typing.
It happens - particularly if you need per-instance memoization. `selectem` is pretty simple, so you can mix it in with standard `mapStateToProps` syntax without too much trouble:

```jsx
const mapStateToProps = () => {
  // some complicated memoization stuff
  return (state, ownProps) => ({
    someProp: myPerInstanceMemoizedSelector(state, ownProps),
    ...selectem({
      fooSelector,
      barSelector,
      bazSelector,
    })(state, ownProps),
  });
};
```

This basically boils down to calling the `selectem` function using `(state, ownProps)` as arguments.
I'm not sure if this is actually nicer than just typing it out, but it works!

## License

MIT
