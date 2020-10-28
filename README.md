# Vue.js Jest Test

## Jest
By default, Jest will run all the tests present in a tests / unit or `__tests__` folder. For example, the tests in app.spec.js will be spotted and run by Jest

### This library offers an API to test the Vue components, here are some of the most used methods:

- mount: creates a Wrapper that contains the mounted and rendered Vue component;
- shallowMount: like mount, it creates a Wrapper that contains the mounted and rendered Vue component, but with stubbed child components;
- createLocalVue: returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class.

### The class Wrapper representing your mounted component offers method such as:

- .html(), .text(): get the HTML or text content
- .find(), .findAll(): search for HTML in the component
- .setData(), .setMethods(), .setProps(): override options in your component
- .trigger(): trigger events

## Settings:

### First install:
```js
npm install @vue/cli-plugin-unit-jest @vue/test-utils
```

### Next 
Next, modify your project’s package.json file to have an entry in scripts which says:

```js
"test": "jest"
```

### Then
Then, create a file jest.config.js with the following content:
```js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest'
}
```

### Folders
Create a `__tests__` folder in root directory, create a files insidethis folder: app.spec.js

### Import
In app.spec.js
```js
import { mount } from "@vue/test-utils";
import App from "../src/App";
```

### Let’s write our first test

```js
// checks if "data" in our component is a function
describe("App", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof App.data).toBe("function");
  });
});
```

Then if you type in your terminal 
```js
npm test
```

the test should pass! This is a  basic test which checks if "data" in our component is a function.

### Mount our component
```js
describe('Mounted App', () => {
  const wrapper = mount(App);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
}
```

This time we are mounting the component, which gives us back a wrapper. (A wrapper is a mock Vue instance.)

We can use it to validate whether certain values are present using Jest’s expect function. We can write tests like this:

```js
it('renders the correct markup', () => {
  expect(wrapper.html()).toContain('What is the sum of the two numbers?')
})
```

And this:

```js
// it's also easy to check for the existence of elements
it('has a button', () => {
  expect(wrapper.contains('button')).toBe(true)
})
```

These tests all pass! Let’s write some tests for the app’s more Vue-specific functionality.

```js
it('renders correctly with different data', async () => {
  wrapper.setData({ x1: 5, x2: 10 })
  await wrapper.vm.$nextTick()
  expect(wrapper.text()).toContain('10')
})
```
setData() allows you to set the component’s data.

Finally, we’re going to test whether our app gives the correct output according to what we intend it to do – test addition!

```js
it('button click without correct sum', () => {
  expect(wrapper.vm.message).toBe("")
  const button = wrapper.find('button')
  button.trigger('click')
  expect(wrapper.vm.message).toBe('TRY AGAIN')
})
```

x1 and x2 are set from our previous test. 
When the button is clicked, the correct sum has not been entered so we expect the message to be 'TRY AGAIN'. 
Run npm test the test should pass.



```js
it('button click with correct sum', () => {
  wrapper.setData({ guess: "15" })
  const button = wrapper.find('button')
  button.trigger('click')
  expect(wrapper.vm.message).toBe('SUCCESS!')
})
```

On the other hand, when we set the sum to be correct, wrapper.vm.message will say ‘SUCCESS!’

## Conclusion 
i just created my first test in vue.js


