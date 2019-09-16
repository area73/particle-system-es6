

> ## 🛠 Status: On active development


# Particle System:  ES6 Object Oriented Vs Functional Paradigm

There are two source sone for Object Orientes and the other one for functional programing bouth durces do the same.
This repo is intented to see the difernece  on mind change from adopting a object orientes aproach and switching to functional programming


## Index
* [Features](#features)
  * [Design Patterns](#patterns)
* [Screenshots](#Screenshots)
* [Getting Started](#Getting-Started)
  * [Code scaffolding](#code-scaffolding)
  * [Prerequisites](#Prerequisites)
  * [Installation](#installation)
  * [Start the development server](#start-server)
* [Running tests](#Running-the-tests)
* [Built With](#Built-With)
* [Authors](#Authors)
* [License](#License)
* [Bibliography / Acknowledgments](#Acknowledgments)

<hr>


## <a name="features">Features</a>
This is a very simple particle system with 3 actors.

**Particle:** the _main object of this system that will be affected by forces.

**Emmisor:** Entity that will spell particles at different speed and angle

**Filed:** A gravity field. This gravity can be positive (it will attract particles), or negative
 (it will repel particles)
 
There are other peaces to consider , the particle system itself were we set our scenario and a 
display system 

### <a name="patterns">Design Patterns</a>
This application contains a variety of design patterns to make the code readable and maintainable.

## <a name="Screenshots">Screenshots</a>
![Alt text](/assets/screen01.png?raw=true "Particle System")

## <a name="Getting-Started">Getting Started</a>
There is no need for a build or any package installation :scream_cat:

Just run the index.html on a modern browser and that's it.

All the imports are made with ES6 modules


### <a name="code-scaffolding">Code scaffolding</a>
<pre>
/root --> config files
  /assets --> images and static content
  /src --> this is were the code is located (fn -> functional , OO -> object orientes )
  /test --> testing files
</pre>

### <a name="Prerequisites">Prerequisites</a>
As I said before there is no need ot install any dependencies although this project has a package
.json to manage dev dependencies. This dev dependencies are related to eslint and prettier (tools
 for code linting and good practices)  

### <a name="installation">Installation</a>
None , hurrah !! :metal: :metal:


### <a name="_start-server">Start the development server</a>

... but (there is always a but), you will need to run the index.html in a server because trying 
to execute index.html from file directory won't work since ES6 modules are sandbox to be executed
 in a server and not from file system.
 
 If you don't have any server you can run from the root of the project the following command:
 
 `npx simple-server`
 
 Then you can visit:

`
index-oo.html (Object Oriented)

index-fn.html (functional) 
 `

## <a name="Running-the-tests">Running the tests</a>
I'm using Jest to do the testing. You can do:

`npm run test`

## <a name="Built-With">Built With</a>
Good old plain Javascript  

## <a name="Authors">Author</a>
Work by:
<a href="mailto:rerades@siete3.com">Rodrigo Erades</a>

## <a name="License">License</a>
MIT Licence

## <a name="Acknowledgments">Bibliography / Acknowledgments</a>
This Particle system is base on this article and repo:

https://software.intel.com/en-us/html5/hub/blogs/build-a-javascript-particle-system-in-200-lines

https://github.com/jsoverson/JavaScript-Particle-System

[A functional canvas approach with redux](https://medium
.com/@peterxjang/a-functional-canvas-approach-with-redux-ce59a369241b)

https://www.oddlyfunctional.com/making-a-game-with-functional-programming-part-1

