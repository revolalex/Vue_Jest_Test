import { mount } from "@vue/test-utils";
import App from "../src/App";

// checks if the data for our component is a function
describe("App", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof App.data).toBe("function");
  });
});

//we are mounting the component, which gives us back a wrapper
//A wrapper is Vue instance Simulation.
//We can use it to validate whether certain values are present using Jest’s expect function
describe("Mounted App", () => {
  const wrapper = mount(App);

  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain("What is the sum of the two numbers?");
  });

  // it's also easy to check for the existence of elements
  it("has a button", () => {
    expect(wrapper.contains("button")).toBe(true);
  });

  //   setData allows you to set the component’s data. Since those
  //   variables were initialized in data, they are reactive.
  //   When we are mocking our component however, we must call $nextTick()
  //   on wrapper.vm, which is the component underlying the wrapper.
  //   Then, we can find that our reactive properties are updated.
  it("renders correctly with different data", async () => {
    wrapper.setData({ x1: 5, x2: 10 }); // set the x's value
    await wrapper.vm.$nextTick(); // wait for next update
    expect(wrapper.text()).toContain("10"); // check if one of the x's contains 10
  });
  // Finally, we’re going to test whether our app gives the correct
  // output according to what we intend it to do – test addition!
  it("button click without correct sum", () => {
    expect(wrapper.vm.message).toBe("");
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.message).toBe("TRY AGAIN");
  });

  // check with correct answer 15
  it("button click with correct sum", () => {
    wrapper.setData({ guess: "15" });
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.message).toBe("SUCCESS!");
  });
});
