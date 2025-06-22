function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => {
    return array.slice(i * size, (i + 1) * size);
  });
}
export {
  chunk
};
//# sourceMappingURL=chunk.js.map
