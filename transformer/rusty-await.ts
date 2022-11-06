import * as ts from "typescript";

export default function (program: ts.Program, pluginOptions: {}) {
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      const visitor = (node: ts.Node): ts.Node => {
        // `foo.await()` to `(await foo)`
        if (
          ts.isCallExpression(node) &&
          ts.isPropertyAccessExpression(node.expression) &&
          ts.isIdentifier(node.expression.name) &&
          node.expression.name.escapedText === "await"
        ) {
          const transformed = ts.factory.createParenthesizedExpression(
            ts.factory.createAwaitExpression(node.expression.expression)
          );

          return ts.visitEachChild(transformed, visitor, ctx);
        }

        return ts.visitEachChild(node, visitor, ctx);
      };

      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
}
