# Changelog for osjs-gui

## 4.0.28

* Updated webpack config
* Updated dependencies
* Now using @osjs/stylelint-config
* Updated dotfiles
* Added 'toggle' option to ContextMenu.

## 4.0.27

* Added DOM wrapper for global context menu (#19)

## 4.0.26

* Fix text field cursors on firefox (fixes #18)

## 4.0.25

* Added 'key' to ListView rows
* Updated eslint

## 4.0.24

* Updated dependencies
* Unregister global events on destruction in provider
* Updated eslint npm script


## 4.0.23

* Updated BoxProperties definition
* Added Label component (#17)

## 4.0.22

* Updated dependencies

## 4.0.21

* Fixed a bug for radio fields value parsing

## 4.0.20

* Added RTL support
* Updated dependencies

## 4.0.19

* Reverted a change relating to Panes

## 4.0.18

* Attempt to fix broken build

## 4.0.17

* Re-release as parcel messed up build

## 4.0.16

* Fixed unused props on Panes

## 4.0.15

* Updated ListView styles and style support

## 4.0.14

* SelectField now supports multiple form of choices

## 4.0.13

* Added zebra property to ListView
* Updated Tabs styles
* Updated ToggleField docs

## 4.0.12

* Added 'closeable' contextmenu item options (#3)

## 4.0.11

* Updated rollup config
* Added contextmenu to Tabs labels (#7)
* Support for adding components to Menu (#3)
* Updated Tabs component (#6)


## 4.0.10

* Fixed tab not showing in Tabs component (#4)
* Removed some redundant code

## 4.0.9

* Fixed an issue with contextmenu props getting unset

## 4.0.8

* Fixed some contextmenu issues
* Updated documentation

## 4.0.7

* Added 'Expander' element

## 4.0.6

* Fixed overlapping contextmenu issues

## 4.0.5

* Updated sourcemap generation

## 4.0.3

* Added esm bundle

## 4.0.0

* Now provided as a ES library and UMD

## 3.0.0-alpha.36

* Added 'created' action to *Views

## 3.0.0-alpha.35

* Updated dependencies
* Remomved unused dependencies

## 3.0.0-alpha.34

* Updated dependencies

## 3.0.0-alpha.33

* Added double-tap support in IconView
* Added double-tap support in ListView
* Added double-tap util function

## 3.0.0-alpha.32

* Updated contextmenu provider

## 3.0.0-alpha.31

* Publish in production mode
* Add shortcut of making contextmenu
* Updated babelrc

## 3.0.0-alpha.30

* Removed a gitignore file leading to missing files in npm package

## 3.0.0-alpha.29

* Prebuild npm package

## 3.0.0-alpha.28

* Added IconView component
* Updated eslintrc
* Updated npmignore

## 3.0.0-alpha.27

* Added travis-ci badge to README
* Lint pass
* Added initial travis-ci config
* Added stylelintrc
* Adjusted ListView minimum size handling

## 3.0.0-alpha.26

* Updated overflow in certain containers
* Updated the video element styles

## 3.0.0-alpha.25

* Updated image/video sizing

## 3.0.0-alpha.24

* Don't wrap text on statusbar by default
* Added 'separator' support in Menu

## 3.0.0-alpha.23

* Better Menu child rendering
* Moved .osjs-icon style from theme

## 3.0.0-alpha.22

* Added 'overflow:hidden' to Toolbar by default
* Updated some CSS className-s

## 3.0.0-alpha.21

* Remove overflow:none from elements by default
* Don't apply margin on button icon when no label present

## 3.0.0-alpha.20

* Fixed box flex basis property

## 3.0.0-alpha.19

* Replaced programatic orientation setting with CSS
* Updated some component defaults
* Added 'Icon' component (and moved old code)
* Added 'BoxStyled' component
* Fixed custom class names for components

## 3.0.0-alpha.18

* Updated docs
* Add MenubarItem component
* Better export pattern

## 3.0.0-alpha.17

* General improvements (performance, compability, abstraction)

## 3.0.0-alpha.16

* Hotfix for textarea size

## 3.0.0-alpha.15

* Updated default entry box styles
* Updated iframe style
* Some improvements to default flexing

## 3.0.0-alpha.14

* Separated Input into separate Fields
* Changed how padding/margin on flexboxes work
* Toolbar now supports both orientations
* New ListView context creation

## 3.0.0-alpha.13

* Added checkbox support for menu items

## 3.0.0-alpha.12

* Added npmignore
* Added CHANGELOG

## 3.0.0-alpha.11

* Better icon support in ListView
* Allow orientation in BoxContainer
* Prevent error on unset columns in ListView
* Prevent spitting errors when clamping menu fails
* Better Panes
* ListView improvements
* Improved tabs rendering
* Improved rendering of certain layout elements

## v3.0.0-alpha.10

* Fixed some Safari incompabilities
* Strech tabs container
* Updated Tabs stylings
* Tabs now uses local state component
* Updated Pane styles
* Updated 'osjs-gui-fill' style

## 3.0.0-alpha.9

* Updated hyperapp dependency

## v3.0.0-alpha.8

* Added icon support to button, some cleanups
* Added support for @osjs/theme defined icons
* Add custom <select> style

## v3.0.0-alpha.7

* Added esdoc config, updated docs

## v3.0.0-alpha.6

* Added 'onenter' for Input
* Added contextmenu event to listview
* Prevent duplicate clicks in Button
* Better button prop handling
* Clamp menu position if overflow the screen width
* Split up ContextMenu class
* Ensure arrow in menus have enough space
* Removed some unused CSS
* Added arrow in Menu when entry is expandable
* Update some prop exception in Input elements
* Update Input value handling
* Better handling of Input props
* Corrected URLs in package.json

## v3.0.0-alpha.5

Initial public release
