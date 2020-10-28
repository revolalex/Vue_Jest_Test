![](https://img.shields.io/badge/made%20with-vue.js-green?logo=vue.js).
<img src="https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Frevolalex%2FVue_Jest_Test" alt="Hits">.

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
Let’s make some changes to the default files that the vue-cli create for us.
Delete the src/components directory and modify App.vue as such:

### App.vue

```js
<template>
  <div id="app">
      <div>
        <h3>Let us test your arithmetic.</h3>
        <p>What is the sum of the two numbers?</p>
        <div class="inline">
          <p>{{ x1 }} + {{ x2 }} =</p> <input v-model="guess"> <button v-on:click="check">Check Answer</button>
        </div>
        <button v-on:click="refresh">Refresh</button>
        <p>{{message}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      x1: Math.ceil(Math.random() * 100), 
      x2: Math.ceil(Math.random() * 100),
      guess: "",
      message: ""
    }
  },
  methods: {
    check() {
      if (this.x1 + this.x2 === parseInt(this.guess)) {
        this.message = "SUCCESS!"
      } else {
        this.message = "TRY AGAIN"
      }
    },
    refresh() {
      this.x1 = Math.ceil(Math.random() * 100);
      this.x2 = Math.ceil(Math.random() * 100);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.inline * {
  display: inline-block;
}
img {
  height: 350px;
}
</style>
```

Take a look through the code and see if you can figure out what the app does.

Then go ahead and run $ npm run serve from the root directory of the project.

### Screenshot
<img width="686" alt="Capture d’écran 2020-10-28 à 16 59 26" src="https://user-images.githubusercontent.com/56839789/97462421-fb512d00-193e-11eb-9928-eb8f9383bd87.png">


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

Then if you type in the terminal 
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
I have just created my first test

 
## Status
Project is:  _Finish_


## Contact	
- [![LinkedIn][linkedin-shield]][linkedin-url] 	
- revolalex@gmail.com


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/alexandre-rodrigueza/




