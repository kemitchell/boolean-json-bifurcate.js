module.exports = function bifurcate (argument) {
  if (negation(argument)) {
    return {not: bifurcate(argument.not)}
  } else if (conjunction(argument)) {
    return argument.and
    .reverse()
    .reduce(function (last, conjunct) {
      return last
      ? {and: [bifurcate(conjunct), last]}
      : bifurcate(conjunct)
    })
  } else if (disjunction(argument)) {
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

function conjunction (argument) {
  return (
    typeof argument === 'object' &&
    'and' in argument
  )
}

function disjunction (argument) {
  return (
    typeof argument === 'object' &&
    'or' in argument
  )
}

function negation (argument) {
  return (
    typeof argument === 'object' &&
    'not' in argument
  )
}
