# Changelog for osjs-gui

## 4.1.0 - 2021-08-19

* Add 'scroll' action for ListView (#38)
* Updated dependencies

## 4.0.36 - 2021-07-23

* Fixed progress bar progress value

## 4.0.35 - 2020-11-26

* Updated dependencies

## 4.0.34 - 2020-06-22

* Fixed listview column staggering in FF (#31)

## 4.0.33 - 2020-04-13

* Correct overflow in Tabs (#28) (#29)

## 4.0.31 - 2020-03-01

* Updated README.md
* Prevent raising error when contextmenu not found
* Updated files section in package.json
* Added timestamps to CHANGELOG.md

## 4.0.30 - 2020-02-16

* Now using @osjs/dev-meta

## 4.0.29 - 2020-02-13

* Updated dependencies
* Don't re-adjust depending on viewport size (#23) (#24)
* Updated package.json scripts
* Updated copyright notices in preambles

## 4.0.28 - 2020-01-15

* Updated webpack config
* Updated dependencies
* Now using @osjs/stylelint-config
* Updated dotfiles
* Added 'toggle' option to ContextMenu.

## 4.0.27 - 2020-01-03

* Added DOM wrapper for global context menu (#19)

## 4.0.26 - 2019-10-17

* Fix text field cursors on firefox (fixes #18)

## 4.0.25 - 2019-06-17

* Added 'key' to ListView rows
* Updated eslint

## 4.0.24 - 2019-06-12

* Updated dependencies
* Unregister global events on destruction in provider
* Updated eslint npm script


## 4.0.23 - 2019-04-01

* Updated BoxProperties definition
* Added Label component (#17)

## 4.0.22 - 2019-02-16

* Updated dependencies

## 4.0.21 - 2019-02-14

* Fixed a bug for radio fields value parsing

## 4.0.20 - 2019-01-01

* Added RTL support
* Updated dependencies

## 4.0.19 - 2018-12-29

* Reverted a change relating to Panes

## 4.0.18 - 2018-12-29

* Attempt to fix broken build

## 4.0.17 - 2018-12-29

* Re-release as parcel messed up build

## 4.0.16 - 2018-12-29

* Fixed unused props on Panes

## 4.0.15 - 2018-12-28

* Updated ListView styles and style support

## 4.0.14 - 2018-12-22

* SelectField now supports multiple form of choices

## 4.0.13 - 2018-12-21

* Added zebra property to ListView
* Updated Tabs styles
* Updated ToggleField docs

## 4.0.12 - 2018-12-13

* Added 'closeable' contextmenu item options (#3)

## 4.0.11 - 2018-12-05

* Updated rollup config
* Added contextmenu to Tabs labels (#7)
* Support for adding components to Menu (#3)
* Updated Tabs component (#6)


## 4.0.10 - 2018-12-04

* Fixed tab not showing in Tabs component (#4)
* Removed some redundant code

## 4.0.9 - 2018-11-29

* Fixed an issue with contextmenu props getting unset

## 4.0.8 - 2018-11-25

* Fixed some contextmenu issues
* Updated documentation

## 4.0.7 - 2018-11-11

* Added 'Expander' element

## 4.0.6 - 2018-11-09

* Fixed overlapping contextmenu issues

## 4.0.5 - 2018-10-27

* Updated sourcemap generation

## 4.0.3 - 2018-10-27

* Added esm bundle

## 4.0.0 - 2018-10-27

* Now provided as a ES library and UMD

## 3.0.0-alpha.36 - 2018-10-25

* Added 'created' action to *Views

## 3.0.0-alpha.35 - 2018-09-29

* Updated dependencies
* Remomved unused dependencies

## 3.0.0-alpha.34 - 2018-09-27

* Updated dependencies

## 3.0.0-alpha.33 - 2018-08-17

* Added double-tap support in IconView
* Added double-tap support in ListView
* Added double-tap util function

## 3.0.0-alpha.32 - 2018-07-28

* Updated contextmenu provider

## 3.0.0-alpha.31 - 2018-07-27

* Publish in production mode
* Add shortcut of making contextmenu
* Updated babelrc

## 3.0.0-alpha.30 - 2018-07-24

* Removed a gitignore file leading to missing files in npm package

## 3.0.0-alpha.29 - 2018-07-24

* Prebuild npm package

## 3.0.0-alpha.28 - 2018-07-20

* Added IconView component
* Updated eslintrc
* Updated npmignore

## 3.0.0-alpha.27 - 2018-07-18

* Added travis-ci badge to README
* Lint pass
* Added initial travis-ci config
* Added stylelintrc
* Adjusted ListView minimum size handling

## 3.0.0-alpha.26 - 2018-07-16

* Updated overflow in certain containers
* Updated the video element styles

## 3.0.0-alpha.25 - 2018-07-16

* Updated image/video sizing

## 3.0.0-alpha.24 - 2018-07-16

* Don't wrap text on statusbar by default
* Added 'separator' support in Menu

## 3.0.0-alpha.23 - 2018-07-14

* Better Menu child rendering
* Moved .osjs-icon style from theme

## 3.0.0-alpha.22 - 2018-07-13

* Added 'overflow:hidden' to Toolbar by default
* Updated some CSS className-s

## 3.0.0-alpha.21 - 2018-07-10

* Remove overflow:none from elements by default
* Don't apply margin on button icon when no label present

## 3.0.0-alpha.20 - 2018-07-08

* Fixed box flex basis property

## 3.0.0-alpha.19 - 2018-07-04

* Replaced programatic orientation setting with CSS
* Updated some component defaults
* Added 'Icon' component (and moved old code)
* Added 'BoxStyled' component
* Fixed custom class names for components

## 3.0.0-alpha.18 - 2018-07-03

* Updated docs
* Add MenubarItem component
* Better export pattern

## 3.0.0-alpha.17 - 2018-07-03

* General improvements (performance, compability, abstraction)

## 3.0.0-alpha.16 - 2018-07-01

* Hotfix for textarea size

## 3.0.0-alpha.15 - 2018-07-01

* Updated default entry box styles
* Updated iframe style
* Some improvements to default flexing

## 3.0.0-alpha.14 - 2018-06-30

* Separated Input into separate Fields
* Changed how padding/margin on flexboxes work
* Toolbar now supports both orientations
* New ListView context creation

## 3.0.0-alpha.13 - 2018-05-10

* Added checkbox support for menu items

## 3.0.0-alpha.12 - 2018-05-06

* Added npmignore
* Added CHANGELOG

## 3.0.0-alpha.11 - 2018-05-05

* Better icon support in ListView
* Allow orientation in BoxContainer
* Prevent error on unset columns in ListView
* Prevent spitting errors when clamping menu fails
* Better Panes
* ListView improvements
* Improved tabs rendering
* Improved rendering of certain layout elements

## 3.0.0-alpha.10 - 2018-04-27

* Fixed some Safari incompabilities
* Strech tabs container
* Updated Tabs stylings
* Tabs now uses local state component
* Updated Pane styles
* Updated 'osjs-gui-fill' style

## 3.0.0-alpha.9 - 2018-04-22

* Updated hyperapp dependency

## 3.0.0-alpha.8 - 2018-04-07

* Added icon support to button, some cleanups
* Added support for @osjs/theme defined icons
* Add custom <select> style

## 3.0.0-alpha.7 - 2018-03-31

* Added esdoc config, updated docs

## 3.0.0-alpha.6 - 2018-03-25

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

## 3.0.0-alpha.5 - 2018-03-19

Initial public release
