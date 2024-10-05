---
prev:
  text: 'Overview'
  link: '/rust/overview'
# next:
#   text: 'New intro'
#   link: '/rust/markdown-examples'
---
# Overview
::: warning
This page contains useless and boring information, with the sole intention of making you feel good. You won't loose anything by skipping it.
:::

## Vulkan overview
Vulkan is a verbose API. Actually, its a very verbose API. Evrything it needs to execute an instruction, it will expect you to provide it. And the way to pass these data will be in object/struct kind of construct. Even you are a very smart person, it will still take a lot of time to digest and internalise everything. Many a times, you will feel like you have hit a roadblock, the frustration will make you want to give up.

But that is exactly why you are here. It's my responsibility to simplify it, and make it as interesting as it can be. If you fail, its my failure.

## GPUs overview
::: tip
Save your time by skipping this section if you understand what GPUs are.
:::

IT industry largely revolves around softwares that gets executed on CPUs. Which can execute only one instruction at a time. If you have a multi-core CPU, then you can run a few instructions at a time. You take advantage of multi-threading and you **feel** like you are running everything at once. But, even you taking into use the best hardware and software constructs, the number of instructions that you can execute at once on CPU is fairly small. But, CPUs can execute every kind of instruction that can be there. They are the best generalists.

There exists other hardwares that are not generalists. They can do just one type of work, and because they can do just one type of work, you gets to remove all the functionalities needed to make it general purpose. By removing these extra functionalities, the hardware gets so simplified that they become cheap and small and less power hungry. And because they are cheap, small, and less power hungry, its possible to have lakhs(million/10) of such hardwares on a single chip. And such chips can run lakhs(million/10) of instructions and once. GPU(Graphics Processing Unit) is one such hardware.

If you watch [this video by NVIDIA](https://www.youtube.com/watch?v=-P28LKWTzrI), I will probably to able to drive home my point.

## GPU/Graphics Programming overview
Because GPUs are very specialised hardwares, they have a lot of tantrums w.r.t. to how you give instructions and data to them, and how you get back the results. Another reason for these tantrums are that they have been less researched and innivated upon as compared to CPUs.

Vulkan, or any graphics API, sits between you and the hardware. Some of these APIs are good at handling these tantrums themselves, and make your life easy. Some, including vulkan, believe that by handling all these tantrums, they will end up making this middle layer fat. And these fat middle layers will take away power from the users. And that's the reason why you vulkan is a very verbose API.

The advantage of learning vulkan is that you get to learn all the nuances of graphics programming. You are more in control, and you can easily master other APIs, whevener you need to.
