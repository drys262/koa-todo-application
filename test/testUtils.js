const mochaAsync = (fn) => (done) => {
  fn.call().then(done, (err) => {
    done(err);
  });
};

export default mochaAsync;
