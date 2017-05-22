---
layout: project
version: 2.x
title: Core concepts
---

# Core concepts

1. [Modules](#modules)
2. [Assets](#assets)
3. [Collectors](#collectors)
4. [Installers](#installers)
5. [Applications](#applications)

### Modules

Modules are ordinary PHP packages, managed with the help of Composer, which stands at the 
foundation of the **Opis Colibri** framework. Every feature, every functionality of an 
application is provided with the help of a module and they can encapsulate not only executable 
code, but also web assets.

Each module must contain a standard `composer.json` file that provides information about the package.
The [type] property must be defined as `opis-colibri-module` and you can provide supplementary 
information by adding a `module` entry under the [extra] property.

```json
{
    "name": "foo/bar",
    "type": "opis-colibri-module", 
    "license": "Apache-2.0",
    "description": "My first module",
    "authors": [
        {
            "name": "John Doe",
            "email": "jd@example.com"
        }
    ],
    "require": {
        "foo/baz": "1.0.*"
    },
    "autoload": {
        "psr-4": {
            "Foo\\Bar\\": "src/"
        }
    },
    "extra": {
        "module": {
            "title": "My Module"
        }
    }
}
```

The `module` property support the following optional entries:

- **title**: human readable title for the module
- **hidden**: boolean value indicating if the module should be shown when modules are listed
- **assets**: the path(relative to the `composer.json` file) to the folder where the [assets](#assets) are kept
- **collector**: module's [collector](#collectors)
- **installer**: module's [installer](#installers)

**Opis Colibri** treats modules in a special way, giving them a state. 
A module can be *uninstalled*, *installed* or *enabled*. 
The classes defined by a module are not usable until the module gets enabled.
If the module have dependencies to other modules, then the module can be enabled
only when all its dependencies are enabled.

### Assets

The web assets encapsulated by a module must be added together into a folder and 
that folder needs to be referenced into the `composer.json` file, using the `assets` property.
The path to the assets folder must be relative to the `composer.json`'s path.

```json
{
    "extra": {
        "module": {
            "title": "My module",
            "assets": "assets_dir"
        }
    }
}
```

The module's assets folder is installed at download time into the [application](#applications)'s 
assets folder. The name of the installed folder is derived form the module's name. 
For example the assets of a `foo-bar/baz` module will be installed in a folder named `foo-bar.baz`.

If the module's assets folder contains at its root a `bower.json` file, then the assets will
be installed into the application's assets folder using Bower, otherwise the installation 
consist in copying the module's assets folder to the application's assets folder.

### Collectors

A *collector* is a class that extends `Opis\Colibri\Collector` and acts in a similar 
way as a *service provider* does.
It is not mandatory for a module to have a collector class, but without it the module is
pretty much useless. A module can have only one collector that must be declared using the 
`collector` property. 

```json
{
    "extra": {
        "module": {
            "title": "My module",
            "assets": "assets_dir",
            "collector": {
                "file": "src/Collector.php",
                "class": "Foo\\Bar\\Collector"
            }
        }
    }
}
```

The `collector` property has the following entries:

- **class**: collector's class name
- **file**: the path(relative to the `composer.json` file) where the collector's class was declared

### Installers

An *installer* is class that extends `Opis\Colibri\Installer` and allows you to execute code
when a module change its state. A module can have only one installer that must be declared
using the `installer` property. Having an installer is not mandatory.

```json
{
    "extra": {
        "module": {
            "title": "My module",
            "assets": "assets_dir",
            "collector": {
                "file": "src/Collector.php",
                "class": "Foo\\Bar\\Collector"
            },
            "installer": {
                "file": "src/Installer.php",
                "class": "Foo\\Bar\\Installer"
            }
        }
    }
}
```

The `installer` property has the following entries:

- **class**: installer's class name
- **file**: the path(relative to the `composer.json` file) where the installer's class was declared


### Applications

An application is a package of [type] `project`.

[type]: https://getcomposer.org/doc/04-schema.md#type
{:rel="nofollow" target="_blank"}
[extra]: https://getcomposer.org/doc/04-schema.md#extra
{:rel="nofollow" target="_blank"}