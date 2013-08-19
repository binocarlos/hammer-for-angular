hammer-for-angular
==================

Component build for hammer directives in angular.js

## installation

	$ component install binocarlos/hammer-for-angular

## usage

```js
// we must register the component with angular
require('hammer-for-angular');

angular
	.module("myModule", [
		"hmTouchevents"
	])
```

We can now use the hammer directives in our app

```html
<div ng-tap="anexpression()">hello</div>
```

You can change the default settings for the instance by adding a second attribute with options:

    hm-options="{drag: false, transform: false}"


Totally [stolen](https://github.com/randallb/angular-hammer) and wrapped up as component.

## Licence

MIT