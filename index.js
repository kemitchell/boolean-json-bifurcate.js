module.exports = bifurcate

function bifurcate(argument) {
  if (typeof argument === 'string') {
    return argument }
  else if ('not' in argument) {
    return { not: bifurcate(argument.not) } }
  else if ('and' in argument) {
    return argument.and
      .reverse()
      .reduce(function(last, conjunct) {
        return (
          last ?
            { and: [ bifurcate(conjunct), last ] } :
            bifurcate(conjunct) ) }) }
  else if ('or' in argument) {
    return argument.or
      .reverse()
      .reduce(function(last, disjunct) {
        return (
          last ?
            { or: [ bifurcate(disjunct), last ] } :
            bifurcate(disjunct) ) }) }
  else {
    var error = new Error('Invalid Boolean JSON object')
    error.object = argument
    throw error } }
