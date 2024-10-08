---
prev:
  text: 'Create Instance (Basic)'
  link: '/rust/befriending-vulkan/instance/instance-basic'
next:
  text: 'Overview'
  link: '/rust/glossary'
---

# Introduction

Vulkan is designed to be a truly cross platform API, which means same API for mobile as well as desktop. But, support for vulkan is not universal. Apple has declined to support Vulkan on their platform. Support for Vulkan on Apple Operating Systems (macOS, iOS), is achieved through a translation layer named [MoltenVK](https://github.com/KhronosGroup/MoltenVK). When you call a vulkan API, MoltenVK translates that call and invoke Apple Metal APIs under the hood. Generally, it doesn't matter much, but there may be some limitations in some specific use cases.

In this chapter, our goal is to achieve macOS support in the `create_instance` function created in the last chapter.

:::info Not so fun fact
Apple has deprecated `OpenGL` on their platforms, which is also locked at a old version on their devices. They are pushing for `Apple Metal`, their own Graphics APIs, so they may probably never officially support `Vulkan`.
:::

## Export required variables (macOS only)

On Apple devices, add the following lines to your `~/.zshrc` file.
``` shell
export VULKAN_SDK=$HOME/VulkanSDK/<version>/macOS
export DYLD_FALLBACK_LIBRARY_PATH=$VULKAN_SDK/lib
export VK_ICD_FILENAMES=$VULKAN_SDK/share/vulkan/icd.d/MoltenVK_icd.json
export VK_LAYER_PATH=$VULKAN_SDK/share/vulkan/explicit_layer.d
```

::: info
Don't forget to replace `<version>` with the actual version installed. On some systems, the installation path is slightly different, please ensure the correct path is exported.
:::

The third line is particularly interesting, look at what we are exporting `VK_ICD_FILENAMES`. On my system, `MoltenVK_icd.json` file has the following contents.

``` json
{
    "file_format_version": "1.0.0",
    "ICD": {
        "library_path": "../../../lib/libMoltenVK.dylib",
        "api_version": "1.2.0",
        "is_portability_driver": true
    }
}
```

There is no point saying much, rather than indicating that MoltenVK is loaded as a portability layer, to act as translation layer between vulkan loader and Apple Metal driver.

## Expanding `app_info` (All platforms)
::: info
This is not for cross-platform support. In the last chapter, we kept `create_instance` to a bare minimum so that we can understand better. Now that we understand the basics, I am taking the liberty to customise is further.
:::

In the last section, we used default values for most of the fields in `app_info`. Let's customise it further.

First of all, add the following to the top (import/use) section
``` rust
use std::ffi::CString;
```

Then update the `app_info` creation code to the following.
``` rust
    let app_name = CString::new("Vulkan Application").unwrap();
    let engine_name = CString::new("No Engine").unwrap();
    let app_info = vk::ApplicationInfo::default()
        .application_name(app_name.as_c_str())
        .application_version(vk::make_api_version(0, 0, 1, 0))
        .engine_name(engine_name.as_c_str())
        .engine_version(vk::make_api_version(0, 0, 1, 0))
        .api_version(vk::make_api_version(0, 1, 2, 0));
```

The beauty of `Ash crate` is that, a lot of APIs are self-explanatory. In such situations, like the one above, I will take the liberty and not provide redundant explanations.

## Add extensions (macOD)
After creating `app_info` struct, let's add the following code
``` rust
let mut extension_names: Vec<*const i8> = Vec::new();
#[cfg(any(target_os = "macos", target_os = "ios"))]
{
    extension_names.push(ash::khr::portability_enumeration::NAME.as_ptr());
}
```

First of all, it creates a vector of constant pointers named `extension_names`. And then uses a rust macro, to conditionally push `VK_KHR_portability_enumeration` to the `extension_names` for apple platforms. This extension is essential for adding portability for vulkan aon macOS.

If you want to know more, you can look at the [official document](https://www.lunarg.com/wp-content/uploads/2022/04/Portability-Enumeration-Extension-APR2022.pdf) regarding `VK_KHR_portability_enumeration` extension.

## Enable `ENUMERATE_PORTABILITY_KHR` flag (macOS)

Let's add the following code
``` rust
let create_flags = if cfg!(any(target_os = "macos", target_os = "ios")) {
    vk::InstanceCreateFlags::ENUMERATE_PORTABILITY_KHR
} else {
    vk::InstanceCreateFlags::default()
};
```
This code block, enables `ENUMERATE_PORTABILITY_KHR` flag for apple platforms.

## Update `instance_create_info` (all platforms)

``` rust
let mut instance_create_info = vk::InstanceCreateInfo::default()
    .application_info(&app_info)
    .enabled_extension_names(&extension_names)
    .flags(create_flags);
```

The above code should be self-explanatory.

*_NOTE_*: Now, our code can create a vulkan instance on any platform.

Please find the [:link: final code on github](https://github.com/ravishankarkumar/vulkantutorial-rust-code/blob/main/src/tutorials/instance/01_1_vulkan_instance.rs)
