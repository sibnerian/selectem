# selectem
Shorthand for react-redux’s `mapStateToProps`. Save yourself some keystrokes.

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
Yes, if you give a prop a custom name it will just get passed through automatically! Only props that end in "Selector" will be renamed.

### I have a complicated `mapStateToProps` function but I still hate typing.
It happens - particularly if you need per-instance memoization. `selectem` is pretty simple, so you can mix it in with standard `mapStateToProps` syntax without too much trouble:

```jsx
const mapStateToProps = (state, ownProps) => {
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

This basically boils down to calling the `selectem` function using `(state, ownProps)` as arguments. I'm not sure if this is actually nicer than just typing it out, but works!

## License

MIT
