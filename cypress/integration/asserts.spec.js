/// <reference types = "cypress" />

it("Equality", () => {
  const a = 1;

  expect(a).equal(1);
  expect(a).equals(1);
  expect(a).eq(1);
  expect(a).to.equal(1);
  expect(a).to.be.equal(1);
  expect(a).not.to.be.equal(2);

  //expect(a).equal(2);
  //expect(a, "Números diferentes!").equal(2);
});

it("Truthy", () => {
  const a = true;
  const b = null;
  let c;

  expect(a).to.be.true;
  expect(b).to.be.null;
  expect(a).not.to.be.null;
  expect(c).to.be.undefined;
});

it("Object Equality", () => {
  const obj = {
    a: 1,
    b: 2,
  };

  expect(obj).equal(obj);

  // Cosidera referências de objetos e por isso dá erro (considera errado)
  //expect(obj).to.be.equal({ a: 1, b: 2 });

  // O 'deep' não cosidera referências de objetos e por isso considera que são iguais
  expect(obj).deep.equal({ a: 1, b: 2 });

  // Mesma coisa de usar equals.deep
  expect(obj).eql({ a: 1, b: 2 });

  // Verifica se 'obj' possui a propriedade 'a'
  expect(obj).to.have.property("a");

  // Verifica se 'obj' possui a propriedade 'a' e com valor '1'
  expect(obj).to.have.property("a", 1);

  // Verifica se 'obj' possui a propriedade 'a' e com valor '1' (outra forma)
  expect(obj).include({ a: 1 });

  // Verifica se 'obj' não possui a propriedade 'a'
  expect(obj).not.include({ z: 1 });

  expect(obj).be.not.empty;

  expect({}).to.be.empty;
});

it("Arrays", () => {
  const arr = [1, 2, 3];

  //Espera-se que 'arr' possua os membros parametrizados
  expect(arr).to.include.members([1, 2]);

  //Espera-se que 'arr' possua TODOS os membros parametrizados
  expect(arr).to.have.members([1, 2, 3]);

  expect(arr).to.not.be.empty;

  expect([]).to.be.empty;
});

it("Types", () => {
  const num = 1;
  const str = "String";
  const obj = {};
  const arr = [];

  //Espera-se que 'num' seja do tipo 'number'
  expect(num).to.be.a("number");

  //Espera-se que 'str' seja do tipo 'string'
  expect(str).to.be.a("string");

  //Espera-se que 'obj' seja do tipo 'object'
  expect(obj).to.be.a("object");

  //Espera-se que 'arr' seja do tipo 'array'
  expect(arr).to.be.a("array");
});

it("Strings", () => {
  const str = "String de teste";

  //Espera-se que 'str' tenha o conteúdo exatamente como o parametrizado
  expect(str).to.be.equal("String de teste");

  //Espera-se que 'str' tenha 15 caracteres
  expect(str).to.have.length(15);

  //Espera-se que 'str' contenha o conteúdo parametrizado
  expect(str).contains("teste");

  //Verificação de conteúdo de string com regex
  //Espera-se que termine com 'teste'
  expect(str).to.match(/teste$/);

  //Espera-se que tenha 15 caracteres
  expect(str).to.match(/.{15}/);

  //Espera-se que tenha apenas letras
  expect(str).to.match(/\w+/);

  //Espera-se que não tenha números
  expect(str).to.match(/\D+/);
});

it.only("Numbers", () => {
  const number = 4;
  const floatNumber = 5.123;

  //Espera-se que 'number' seja = 4
  expect(number).to.be.equal(4);

  //Espera-se que 'number' seja maior que 3
  expect(number).to.be.above(3);

  //Espera-se que 'number' seja menor que 7
  expect(number).to.be.below(7);

  //Espera-se que 'floatNumber' seja = 5.123
  expect(floatNumber).to.be.equal(5.123);

  //Espera-se que 'floatNumber' seja próximo de 5.1 com uma precisão de 0.1
  expect(floatNumber).to.be.closeTo(5.3, 0.2);
});
