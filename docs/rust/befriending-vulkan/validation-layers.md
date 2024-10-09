---
prev:
  text: 'Create cross platform instance'
  link: '/rust/befriending-vulkan/instance/instance-cross-platform'
next:
  text: 'Physical Device and Queue families'
  link: '/rust/befriending-vulkan/physical-device-queue-family'
---

# Introduction
Vulkan is designed to be a minimalistic and highly performant API. As a result, there is almost no errro checking in the APIs by default. But, we can add validations if we want. We do it by adding `Valudation Layers`.

::: info Suggestion
For performance reason, it is advisable to have error/debug validation layers only in development environment.
:::

## Add validation Layers

###

First of all, import `ext::debug_utils,` from `ash crate` and `os::raw::{c_char, c_void}` from `std`. 
```rust
use ash::{vk, Entry, Instance, ext::debug_utils};
```

Add a new crate called `log` with, `cargo add log`.

Then, add the following at a convenient place.

``` rust
pub const ENABLE_VALIDATION_LAYERS: bool = true;
const REQUIRED_LAYERS: [&str; 1] = ["VK_LAYER_KHRONOS_validation"];
```

Now, in `create_instance` function, add the following code at appropriate place.
```rust
if ENABLE_VALIDATION_LAYERS {
  extension_names.push(debug_utils::NAME.as_ptr());
}
```

Create a function called `get_layer_names_and_pointers`, which returns a tuple containing layer names, and layer names pointers in comptible format.
```rust
pub fn get_layer_names_and_pointers() -> (Vec<CString>, Vec<*const c_char>) {
    let layer_names = REQUIRED_LAYERS
        .iter()
        .map(|name| CString::new(*name).unwrap())
        .collect::<Vec<_>>();
    let layer_names_ptrs = layer_names
        .iter()
        .map(|name| name.as_ptr())
        .collect::<Vec<_>>();
    (layer_names, layer_names_ptrs)
}
```

Also, add another function that will check whether the debug layer, which we want to enable, is available or not.
``` rust
pub fn check_validation_layer_support(entry: &Entry) {
    let supported_layers = unsafe { entry.enumerate_instance_layer_properties().unwrap() };
    for required in REQUIRED_LAYERS.iter() {
        let found = supported_layers.iter().any(|layer| {
            let name = unsafe { CStr::from_ptr(layer.layer_name.as_ptr()) };
            let name = name.to_str().expect("Failed to get layer name pointer");
            required == &name
        });

        if !found {
            panic!("Validation layer not supported: {}", required);
        }
    }
}
```

Now, create a callback function, that will be called from the validation layers

``` rust
unsafe extern "system" fn vulkan_debug_callback(
    flag: vk::DebugUtilsMessageSeverityFlagsEXT,
    typ: vk::DebugUtilsMessageTypeFlagsEXT,
    p_callback_data: *const vk::DebugUtilsMessengerCallbackDataEXT,
    _: *mut c_void,
) -> vk::Bool32 {
    use vk::DebugUtilsMessageSeverityFlagsEXT as Flag;

    let message = CStr::from_ptr((*p_callback_data).p_message);
    match flag {
        Flag::VERBOSE => log::debug!("{:?} - {:?}", typ, message),
        Flag::INFO => log::info!("{:?} - {:?}", typ, message),
        Flag::WARNING => log::warn!("{:?} - {:?}", typ, message),
        _ => log::error!("{:?} - {:?}", typ, message),
    }
    vk::FALSE
}
```

Now, create a function that will actually setup debug messanger.

``` rust
/// Setup the debug message if validation layers are enabled.
pub fn setup_debug_messenger(
    entry: &Entry,
    instance: &Instance,
) -> Option<(debug_utils::Instance, vk::DebugUtilsMessengerEXT)> {
    if !ENABLE_VALIDATION_LAYERS {
        return None;
    }

    let create_info = vk::DebugUtilsMessengerCreateInfoEXT::default()
        .flags(vk::DebugUtilsMessengerCreateFlagsEXT::empty())
        .message_severity(
            vk::DebugUtilsMessageSeverityFlagsEXT::ERROR
                | vk::DebugUtilsMessageSeverityFlagsEXT::WARNING
                | vk::DebugUtilsMessageSeverityFlagsEXT::INFO,
        )
        .message_type(
            vk::DebugUtilsMessageTypeFlagsEXT::GENERAL
                | vk::DebugUtilsMessageTypeFlagsEXT::VALIDATION
                | vk::DebugUtilsMessageTypeFlagsEXT::PERFORMANCE,
        )
        .pfn_user_callback(Some(vulkan_debug_callback));
    let debug_utils = debug_utils::Instance::new(entry, instance);
    let debug_utils_messenger = unsafe {
        debug_utils
            .create_debug_utils_messenger(&create_info, None)
            .unwrap()
    };

    Some((debug_utils, debug_utils_messenger))
}
```

Finally, its time to enable the validation layer. Update instance createation code with the following snippet.

```rust
let (_layer_names, layer_names_ptrs) = get_layer_names_and_pointers();
let mut instance_create_info = vk::InstanceCreateInfo::default()
    .application_info(&app_info)
    .enabled_extension_names(&extension_names)
    .flags(create_flags);
if ENABLE_VALIDATION_LAYERS {
    check_validation_layer_support(entry);
    instance_create_info = instance_create_info.enabled_layer_names(&layer_names_ptrs);
}

unsafe { entry.create_instance(&instance_create_info, None).unwrap() }
```

If everything went well, then you should now be able to create vulkan instance with dvalidation layers enabled.

Please find the [:link: final code on github](https://github.com/ravishankarkumar/vulkantutorial-rust-code/blob/main/src/tutorials/02_validation_layers.rs)
