/// <reference types = "cypress" />

it("A external test...", () => {});

describe("Should group tests...", () => {
  describe("Should group more specific tests...", () => {
    it.skip("A internal test...", () => {});
  });

  describe.skip("Should group more specific tests...", () => {
    it("A internal test...", () => {});
  });

  it.only("A internal test...", () => {});
});
