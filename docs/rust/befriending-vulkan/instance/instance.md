---
prev:
  text: 'Befriending Vulkan Introduction'
  link: '/rust/befriending-vulkan/introduction'
next:
  text: 'Overview'
  link: '/rust/glossary'
---

# Introduction

In this section we will understand a few concepts, and then start writing our first vulkan program. To be specific, we will create an instance and understand every nuance involved in this process.

## Important concepts before we start

### Vulkan Instance
Instance is an object/struct that contains some information regarding your program. If you want to call some API, it knows how to call that API, and also where to look for that API so that it can call them.

How your call reached vulkan loader(and subsequently to driver), is determined by your vulkan instance on the basis of layers that you have enabled. A vulkan instance live in a silo, which means if you crate multiple instances, they will not know aboout each other.

You create an instance by providing necessary information such that the layers and extension that you want to use, application version, application name etc. Vulkan will do the necessary work like loading layers in memory and then give you can instance handle, which you can use to call further APIs.

I have said too many words, first let me explain them one by one. It will become very clear after that.

### Vulkan loader
Loaders are a system program that loads executable programs into memory. It connects low level machine code to your executable programs. Now what does low level machine code means? It means drivers (or ICDs). You can have multiple vulkan drivers installed on your machine, and each driver can have multiple physical devices(read GPUs) attached to them. Vulkan loader is responsible for querying all the drivers installed on your system, and then query the physical devices that are attached to them, and give you a combined list of all the physical devices that your program (i.e. executable program) can use.

### ICD (Installable Client Drivers)
For our practical purpose, it is safe to treat them as Vulkan drivers.

### Layers
These are middlewares that sits between your executable program and the vulkan loaders. They are not loaded into the memory by default, they gets loaded when you indicate that you want to load them while creating a vulkan instance. When you decide to use a layer while create a vulkan instance, it loads the respective layer into memory. These layers provide a series of middlewares(trampoline functions) that gets called for relevant APIs.

#### call chain
When you call an API, it passes through a series of iterative calls before it reaches its final destination. This is called the call chain. When you activate a layer, it sits somewhere in your call chain and becomes a part of the call chain.

### Extensions
Functionalities provided by Vulkan may be extended or modified by some programs. To be able to do so, they will have to register as an extension. Like layers, an extension can also be enable only at the time of creating a vulkan instance.

#### Difference between Layers and Extensions
Layers sit somewhere in your call chain, and they may intercept/modify data passing to and from your executable programs and the driver. A logger can be implemented as a layer.
Extensions on the other hand add functionalities to the Vulkan. For example, core vulkan doesn't support rendering to a screen, but this functionality is provided by extensions.
In case you want to ask, let me tell you that a Layer can also be an extension.

## Ash
As we all know, official Vulkan APIs are written in C. But, community maintained bindings for different languages exist, and they are at par with the official APIs. The binding that we will use is [Ash](https://crates.io/crates/ash) is a vulkan binding that wraps official C APIs. This is the most popular Rust binding for vulkan at the time of revising this tutorial.

Another notable mentioncan be [Vulkano](https://crates.io/crates/vulkano). Interestingly, they have their own [tutorial](https://vulkano.rs/).

We will use [Ash](https://crates.io/crates/ash), because
- It is more popular
- It's thin layer, so it is eesier to read official C/CPP documentation and apply in Ash

## Creating an instance

First install ash by `cargo add ash`.

Then create a folder structure like this inside your src folder
```
src
|---tutorials
|---|---instance
|---|---|---01_1_vulkan_instance.rs
|---main.rs
```

Add this snippet to `cargo.tolm` file. This will help us run this particular program by the command `cargo run --bin 00`
``` toml
[[bin]]
name = "00"
path = "src/tutorials/01_1_vulkan_instance.rs"
```

Add this to the top of the file
``` rust
use std::ffi::CString;
use ash::{vk, Entry, Instance};
```
And then add this to your main function
``` rust
let entry = unsafe { Entry::load().expect("Failed to create entry.") };
let instance = create_instance(&entry);
```
Almost all the APIs of vulkan can be called only on instance. But, some programs can be called without an instance object also. For example, the API to create an instance.

Ash exposes such APIs through `Entry` module. Above code should be clear now, we are creating an entry object, and in the second line, we are calling our custom function to create an instance using the entry object.

Please find the [:link: Rust code on github here](https://github.com/ravishankarkumar/vulkantutorial-rust-code/blob/main/src/tutorials/instance/01_1_vulkan_instance.rs)
