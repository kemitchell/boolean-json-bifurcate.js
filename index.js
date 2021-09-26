module.exports = function bifurcate (argument) {
  if (isNegation(argument)) {
    return {not: bifurcate(argument.not)}
  } else if (isConjunction(argument)) {
    return argument.and
      .reverse()
      .reduce(function (last, conjunct) {
        return last
          ? {and: [bifurcate(conjunct), last]}
          : bifurcate(conjunct)
      })
  } else if (isDisjunction(argument)) {
    return argument.or
      .reverse()
      .reduce(function (last, disjunct) {
        return last
          ? {or: [bifurcate(disjunct), last]}
          : bifurcate(disjunct)
      })
  } else {
    return argument
  }
}

function isNegation (argument) {
  return (
    typeof argument === 'object' &&
    'not' in argument
  )
}

function isConjunction (argument) {
  return (
    typeof argument === 'object' &&
    'and' in argument
  )
}

function isDisjunction (argument) {
  return (
    typeof argument === 'object' &&
    'or' in argument
  )
}
