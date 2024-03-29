# Preparation



1\. Execute command in command line:

```
npm adduser --registry=https://nexus.solit-clouds.ru/repository/libs-npm-ehr-local/ --scope=@ehr-forms
```

2\. Execute command in command line:

```
npm adduser --registry=https://nexus.solit-clouds.ru/repository/libs-npm-ehr-local/ --scope=@solit
```

Login and password should be requested from the product owner

3\. In your `package.json` file add following dependencies:

```
"dependencies": {
    ....
    "@ehr-forms/default-library": "^2.0.0",
    "@ehr-forms/default-library-angular": "^2.0.0",
    "@ehr-forms/navigation-library-angular": "^2.0.0",
    "@ehr-forms/open-ehr-library": "^2.0.0",
    "@ehr-forms/renderer": "^2.0.0",
    "@ehr-forms/renderer-angular": "^2.0.0",
    "@solit/lucidus": "^9.6.0",
...
```

4\. Copy UI Kit assets to your build folder, change your `angular.json` this way:

```
"build": {
...
    "options": {
        ...
        "assets": [
            ...
            {
                "glob": "**/*",
                "input": "./node_modules/@solit/lucidus/assets",
                "output": "./assets"
            },
            ...
        ],
        ...
    },
...
},
```

5\. Add import to ypur global `scss` styles

```
@import '~@solit/lucidus/assets/styles/index';
```
