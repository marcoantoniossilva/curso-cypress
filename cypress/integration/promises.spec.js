it("sem testes ainda", () => {});

const getSomething = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(14), 2000);
  });
};

const system = () => {
  console.log("init");
  getSomething().then((something) => console.log(`Something is ${something}`));
  console.log("end");
};

system();
