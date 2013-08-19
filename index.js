/*

  forked from https://github.com/randallb/angular-hammer

  wrapped up as a component
  
*/

/*
 * Angular Hammer v2
 *
 * Forked from https://github.com/randallb/angular-hammer
 * Updated to support https://github.com/EightMedia/hammer.js
 *
 * Within an Angular.js application, allows you to specify custom behaviour on Hammer.js touch events.
 *
 * Usage, currently as attribute only:
 *
 *    hm-tap="{expression}"
 *
 * You can change the default settings for the instance by adding a second attribute with options:
 *
 *    hm-options="{drag: false, transform: false}"
 *
 * Include this file, and add `hmTouchevents` to your app's dependencies.
 *
 * Requires Hammer.js, tested with `v1.0.1 - 2013-02-26`.
 *
 */

var Hammer = require('hammer');

var hmTouchevents = angular.module('hmTouchevents', []),
    hmGestures = ['hmHold:hold',
                  'hmTap:tap',
                  'hmDoubletap:doubletap',
                  'hmDrag:drag',
                  'hmDragstart:dragstart',
                  'hmDragend:dragend',
                  'hmSwipe:swipe',
                  'hmRelease:release'];

angular.forEach(hmGestures, function(name){
  var directive = name.split(':'),
  directiveName = directive[0],
  eventName = directive[1];
  hmTouchevents.directive(directiveName, ["$parse", function($parse) {
    return {
      scope: true,
      link: function(scope, element, attr) {
        var fn, opts;
        fn = $parse(attr[directiveName]);
        opts = $parse(attr["hmOptions"])(scope, {});
        if(opts && opts.group) {
          scope.hammer = scope.hammer || new Hammer(element[0], opts);
        } else {
          scope.hammer = new Hammer(element[0], opts);
        }
        
        scope.hammer['on' + eventName] = function(event){
          return scope.$apply(function(){
            return fn(scope,{
              $event: event
            });
          });
        }
      }
    };
    }
  ]);
});