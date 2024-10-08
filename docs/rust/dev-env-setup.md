---
prev:
  text: 'Tutorial Overview'
  link: '/rust/tutorial-overview'
next:
  text: 'Befriending Vulkan'
  link: '/rust/befriending-vulkan/introduction'
outline: [2,3]
---

# Development environment setup

## **macOS**
This instructions assume that you are running macOS 10.11 or later, have Apple silicon, and your laptop support Metal API.

<!-- ### homebrew
If you don't have brew installed, please [install it from here](https://brew.sh/) -->

### Rust
Ensure you have latest version of rust. You can [install it from here](https://www.rust-lang.org/tools/install)

### Visual studio code or any code editor
Ensure you have latest version of VS Code, you can [install it from here](https://code.visualstudio.com/download). If you prefer, you can use any other code editor of your choice.

### Vulkan SDK
Please download and install [Vulkan SDK](https://vulkan.lunarg.com/). If installed properly, you will vkCube in your application. If you run that, you should see rotating vkCube, something similar to this.
![vkcube screenshot](/vkcube.png)


## Base code setup

### Prerequisites
Cargo must be installed on your system. You can check by running `cargo --version` from your terminal. If it is not, follow the instructions at [Rust Lang official portal](https://www.rust-lang.org/) to set it up.

### Project setup
Let's setup a new project in a location/folder of your choice.

``` shell
cargo new befriend-vulkan
cd befriend-vulkan
cargo run
```

If all went well, then you should see the following text on your terminal.
``` text
Hello, world!
```

If everything went as planned, we are ready to start learning Vulkan.