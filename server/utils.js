const average = (...elem) => {
  const sum = elem.reduce((a, b) => parseInt(a) + parseInt(b));
  return sum / elem.length;
}

module.exports = { average };
