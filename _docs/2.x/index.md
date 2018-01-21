---
layout: project
version: 2.x
title: Installation
---
# Installation {#page-title}

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)

### Prerequisites

Before installing **Opis Colibri** make sure that you have [Node.js] and [Yarn] installed.
Also, you must make sure that you have [Composer] installed. 

**Opis Colibri** utilizes [Composer] and [Yarn] to manage its dependencies and it is mandatory that both 
[Composer] and [Yarn] are globally available.

### Installation

Unlike classical PHP frameworks, **Opis Colibri** does not have a predefined folder structure and it can only
be installed and used as a part of an application.

To ease the learning and development process, we have created an application that can be used as a starting point for future
projects. The application can be installed using [Composer]'s `create-project` command.

```bash
cd /var/www
composer create-project opis-colibri/app website.dev
```

To start the application just type the following commands into the terminal

```bash
cd website.dev
php -S localhost:8080 -t public router.php
```

You can now finish the installation process by visiting the newly created web 
application at [http://localhost:8080]

[Node.js]: https://nodejs.org
{:rel="nofollow" target="_blank"}
[Yarn]: https://yarnpkg.com
{:rel="nofollow" target="_blank"}
[Composer]: http://getcomposer.org
{:rel="nofollow" target="_blank"}
[http://localhost:8080]: http://localhost:8080
{:rel="nofollow" target="_blank"}
