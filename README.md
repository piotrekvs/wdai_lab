# wdai_lab

Repozytorium na laboratoria z przedmiotu Wstęp Do Aplikacji Internetowych

## Flexbox tutorial

https://www.youtube.com/watch?v=yFHgP0MF3V4

## CSS selektory i jednostki

https://www.w3schools.com/cssref/css_selectors.asp
https://www.w3schools.com/cssref/css_units.asp

## CSS szablony i przykłady

https://freefrontend.com/css-image-effects/
https://www.csscodelab.com/

## Unicode symbols

https://unicode-table.com/pl/sets/

## Img resize online

https://www.iloveimg.com/resize-image#resize-options,pixels
https://promo.com/tools/image-resizer/

## Html snippets

```html
<link rel="stylesheet" media="screen" type="text/css" href="style.css" />
<script type="text/javascript" src="script.js" defer></script>
```

## Google material icons

Katalog ikon: https://fonts.google.com/icons

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+ICON_TYPE" rel="stylesheet" />
```

## Create custom context menu:

https://itnext.io/how-to-create-a-custom-right-click-menu-with-javascript-9c368bb58724

## ESLint Typescript

https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba

##

## ESLint Typescript Rules

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "max-len": ["error", 100],
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "prefer-arrow-callback": "error",
        "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
        "react/state-in-constructor": [1, "never"],
        "indent": ["error", 4],
        "jsx-a11y/click-events-have-key-events": 0,
        "react/destructuring-assignment": 0,
        "no-unused-vars": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "react/jsx-props-no-spreading": 0,
        "no-plusplus": 0,
        "react/button-has-type": 0,
        "react/function-component-definition": ["error", { // airbnb config bug
            "namedComponents": "arrow-function",
            "unnamedComponents": "arrow-function"
        }],
        "@typescript-eslint/ban-types": ["error", { // empty props
                "extendDefaults": true,
                "types": { "{}": false }
        }]
    }
}
```

## ES7 react snippets
rce - nowy komponent klasowy
rfce - nowy komponent funkcyjny
rafce - nowy komponent funkcyjny strzałkowy
