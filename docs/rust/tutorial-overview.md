---
prev:
  text: 'Overview'
  link: '/rust/overview'
next:
  text: 'Development environment setup'
  link: '/rust/dev-env-setup'
---
# Tutorial Overview
As said in the last section, specialised hardwares(read GPUs), have their own tantrums. First we will look at nuances involved in programming for graphics hardwares. And then we will look into how vulkan handles them.


## Graphics Programming nuances
::: danger
If you are an absolute begineer, this sub-section will scare you. You will have to bear with me. It starts to get easy from here.
:::
In normal programming(read CPUs), we create data either in stack or heap memory. Our CPU can read/modify them. In case of GPUs, this becomes complicated. They don't read write data the way CPUs do.

To pass data to GPUs, we create buffers with specific parameters, and then we ask GPUs to read from there. And once GPUs are done processing the data, they can write them back to speciliased buffers for CPUs to read.

In many a cases, to optimise for speed or otherwise, the data has to pass through two buffers. In one buffer, CPU writes, it is then transferred to another buffer that is specialised for faster access by GPU. And the GPUs read it from there.

Even the instructions for GPUs to process these data is written differently. We write instructions to process just one data, but the GPUs apply the same instruction on each and every data. And the language for writing instructions to process data is also different, we call it a shader language.

If we want to command/ask the GPU to use our shader instructions to process the data that we wrote in buffers. Then these command also has to go through a buffer.

There are a lot of steps involved in calculating the final pixels that is being drawn on the screen. And quite a few of them are customizable by us. And we have to provide that customizations to be able to get output.

Things we do in Graphics programming (Inexhaustive list, and in no particular order):
- Make data visible to GPU through buffers
- Write instructions for processing these data in shader language
- Provide customisations/parameters for modifying steps involved in calculating final pixel
- Provide commands to GPU through command buffer

Some Graphic APIs handle some of the above things by themselves, by assuming stuffs on your behalf. But, vulkan needs you to specify them categorically.

::: info
Almost all the authors/bloggers in this space where we teach graphic programming have a habbit of keep comparing different Graphic APIs, such as OpenGL vs Vulkan etc. I will not do that. I believe that begineers get more distracted and confused by that approach, and the experts don't need them. 
:::

## Steps in rendering a triangle using vulkan
Rendering a triangle exposes bulk of the complexities involved in graphics programming. Let's see what we will need to do to draw a triangle using Vulkan.

1. Creating a vulkan Instance
1. Choose a physical device
1. Create a logical device(mapped to physical device)
1. Select queue families for chosen device
1. Create a window
1. Create a window surface
1. Create a swapchain
    1. Acquire image from swapchain
    1. Create imageview for image acquired from swapchain
1. Create a framebuffer
1. Create a Renderpass
1. Create a Graphics pipeline
1. Create a command Pool
1. Get allocated commandbuffer from CommandPool
1. Main loop to orchestrate all the above steps

Looks like a lot? Don't worry. We will have proper sections dedicated to each step in the above list. And I will ensure that you understand it.


