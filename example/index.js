module.exports = ({ types: t }) => {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === 'a') {
          path.replaceWith(t.Identifier('b'));
        }
      },
      BinaryExpression(path) {
        if (path.node.operator === '+') {
          const left = t.numericLiteral(2);
          const right = t.numericLiteral(3);
          path.replaceWith(t.binaryExpression('-', left, right));
        }
      }
    },
  };
}