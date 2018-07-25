# Raytracing in a weekend

This is a TypeScript implementation of a simple Raytracer, which was made by following Peter Shirley's
[Raytracing in one weekend](http://in1weekend.blogspot.com/2016/01/ray-tracing-in-one-weekend.html) ebook.

We're targetting Canvas in a web browser as our rendering target to keep things simple.

## Prerequisites

* Node 9.8 or above. There's a `.nvmrc` file in the root dir if you use [nvm](https://github.com/creationix/nvm).
* The Ray Tracing in one weekend book from either [here](http://in1weekend.blogspot.com/2016/01/ray-tracing-in-one-weekend.html) or [on Kindle](https://www.amazon.com.au/Ray-Tracing-Weekend-Minibooks-Book-ebook/dp/B01B5AODD8/ref=sr_1_1?ie=UTF8&qid=1532488640&sr=8-1&keywords=Ray+Tracing+in+One+Weekend).


## Setup

``` bash
git clone https://github.com/luma/raytraceInAWeekend.git
cd raytraceInAWeekend/
npm i
```

## Project layout

The source is [TypeScript](https://www.typescriptlang.org/) and we're using [Webpack](https://webpack.js.org/) for asset compilation.

The basic structure is as follows

* `dist/` the complied bundle created by Webpack.
* `src/` the raw TypeScript source, the entry point is `src/index.ts`.
* `index.html` what you open in your browser to actually render anything.


## Usage

``` bash
npm run build
# Or for local dev
npm run watch
```

Then open `index.html` in your browser of choice.
