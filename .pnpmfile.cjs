function readPackage(pkg, context) {
  // Override rollup-plugin-terser to accept rollup 3.x
  if (pkg.name === 'rollup-plugin-terser') {
    pkg.peerDependencies = {
      ...pkg.peerDependencies,
      rollup: '^2.0.0 || ^3.0.0'
    };
  }
  
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
