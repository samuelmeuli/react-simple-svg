# react-simple-svg

**Inline SVGs in React made easy**

Why another SVG component library for React?

* Supports three types of SVG sources:
  - `import` statements
  - SVG strings
  - URLs

* Makes it easy to change strokes and fills without CSS

* Accessibility support


→ **[Examples](https://samuelmeuli.github.io/react-simple-svg)**


## Usage

Install the package using NPM:

```
npm install react-simple-svg
```

Add the component to your React application in one of three ways:


### 1. Using `import`

If you are using Webpack, install `svg-inline-loader` from NPM. For other module bundlers, you need an equivalent tool that converts imported SVG files to strings.

```
npm install -D svg-inline-loader
```

Extend your Webpack config:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};

```


Finally, add the SVG file to your React component:

```jsx
import SimpleSvg from 'react-simple-svg';
import icon from './assets/icon.svg';

// Somewhere in your code:
<SimpleSvg
  src={icon}
  height={100}
  width={100}
/>
```

### 2. Using an SVG string

```jsx
import SimpleSvg from 'react-simple-svg';

const icon = '<svg xmlns="..." viewBox="...">...</svg>';

// Somewhere in your code:
<SimpleSvg
  src={icon}
  height={100}
  width={100}
/>
```

### 3. Using a URL

```jsx
import SimpleSvg from 'react-simple-svg';

// File from a public folder:
const iconUrl = '../public/icon.svg#someId'; // ID is required!

// Somewhere in your code:
<SimpleSvg
  src={iconUrl}
  height={100}
  width={100}
/>
```

**Important:** Internally, `react-simple-svg` uses [SVG `<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use) elements for URL sources. Please make sure of the following:

* SVGs must contain an `id` attribute (e.g. `<svg id="someId">...</svg>`), which must then be used to reference the target element in the URL (see code above)
* SVGs are not allowed to contain stroke/fill attributes if you want to override them using `<SimpleSvg>` props (they always have precedence, so the props will not work)


## Props

Prop | Type | Default | Description
---- | ---- | ------- | -----------
`src` (required) | String | – | SVG string or URL
`height` (required) | Number | – | SVG height
`width` (required) | Number | – | SVG width
`className` | String | `""` | Additional class names for the `<svg>` tag
`title` | String | – | Content for the [SVG `<title>` tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title) (recommended for accessibility)
`description` | String | – | Content for the [SVG `<desc>` tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc) (recommended for accessibility)
`role` | String | `"img"` | Role of the SVG element (e.g. `"img`, `"presentation"`)
`fill` | String | – | SVG fill color
`fillOpacity` | Number | – | SVG fill opacity
`stroke` | Number | – | SVG stroke color
`strokeOpacity` | Number | – | SVG stroke opacity
`strokeWidth` | Number | – | SVG stroke width
`svgStyle` | Number | `{}` | Additional styles to apply to the `<svg>` tag


## Development

* `git clone`
* `yarn install`
* `yarn start` to generate the library bundle using [Rollup](https://github.com/rollup/rollup)
* Open `localhost:3000` to see the component in action using [Storybook](https://github.com/storybooks/storybook)


## Credits

Example SVG By Fuzzypeg (Wikimedia Commons)
