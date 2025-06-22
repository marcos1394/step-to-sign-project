function promiseWithResolvers() {
  let resolver;
  let rejecter;
  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  return {
    promise,
    resolve: resolver,
    reject: rejecter
  };
}
export {
  promiseWithResolvers
};
//# sourceMappingURL=with-resolver.js.map
