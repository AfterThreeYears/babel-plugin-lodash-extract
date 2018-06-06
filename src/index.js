function generateImportDeclaration(t, name) {
  const specifiers = [t.ImportDefaultSpecifier(t.identifier(name))];
  return t.ImportDeclaration(specifiers ,t.StringLiteral(`lodash/${name}`));
}

module.exports = ({ types: t }) => {
  return {
    pre() {
      this.dep = [];
      this.ignores = ['_', 'lodash'];
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === 'lodash') {
          const libDep = path.node.specifiers
            .filter(({ local }) => !this.ignores.includes(local.name))
            .map(({ local }) => local.name);
          this.dep.push(...libDep);
          const importDeclaration = libDep.map((name) => generateImportDeclaration(t, name));
          path.replaceWithMultiple(importDeclaration);
        }
      },
      CallExpression(path) {
        let node = path.node;
        if (node.callee.object && node.callee.object.name === '_') {
          const {name} = node.callee.property;
          if (!this.dep.includes(name)) {
            this.dep.push(name);
            const parent = path.findParent((path) => path.parentKey === 'body');
            parent.insertBefore(generateImportDeclaration(t, name));
          }
          const identifier = t.Identifier(name)
          const callExpression = t.callExpression(identifier, node.arguments);
          path.replaceWithMultiple(callExpression)
        }
      },
    },
  }
};