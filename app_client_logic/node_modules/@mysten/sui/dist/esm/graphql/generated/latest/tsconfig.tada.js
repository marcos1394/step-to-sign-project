var compilerOptions = {
  plugins: [
    {
      name: "@0no-co/graphqlsp",
      schema: "./schema.graphql",
      tadaOutputLocation: "src/graphql/generated/latest/tada-env.ts"
    }
  ]
};
var tsconfig_tada_default = {
  compilerOptions
};
export {
  compilerOptions,
  tsconfig_tada_default as default
};
//# sourceMappingURL=tsconfig.tada.js.map
