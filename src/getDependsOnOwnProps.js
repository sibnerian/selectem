/* eslint-disable */
// Copied directly from https://github.com/reactjs/react-redux/blob/master/src/connect/wrapMapToProps.js#L20

// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
export default function getDependsOnOwnProps(mapToProps) {
  return (mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined)
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1
}
