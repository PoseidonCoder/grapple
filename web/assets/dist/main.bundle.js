/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkgrapple_client"] = self["webpackChunkgrapple_client"] || []).push([["main"],{

/***/ "./assets/scripts/main.js":
/*!********************************!*\
  !*** ./assets/scripts/main.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/globals */ \"./assets/scripts/util/globals.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scenes_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/game */ \"./assets/scripts/scenes/game.js\");\n/* harmony import */ var _scenes_help__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/help */ \"./assets/scripts/scenes/help.js\");\n/* harmony import */ var _scenes_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scenes/menu */ \"./assets/scripts/scenes/menu.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_scenes_game__WEBPACK_IMPORTED_MODULE_2__, _scenes_menu__WEBPACK_IMPORTED_MODULE_4__]);\n([_scenes_game__WEBPACK_IMPORTED_MODULE_2__, _scenes_menu__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);\nconsole.log(`We are ${ false ? 0 : 'not'} in production`);\n\n\n\n\n\n\n\n\nnew (phaser__WEBPACK_IMPORTED_MODULE_1___default().Game)({\n\ttype: (phaser__WEBPACK_IMPORTED_MODULE_1___default().CANVAS),\n\twidth:\n\t\twindow.innerWidth > _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth\n\t\t\t? _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth\n\t\t\t: window.innerWidth,\n\theight:\n\t\twindow.innerHeight > _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight\n\t\t\t? _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight\n\t\t\t: window.innerHeight,\n\tphysics: {\n\t\tdefault: 'arcade',\n\t\tarcade: {\n\t\t\tdebug: false,\n\t\t},\n\t},\n\tscene: [_scenes_menu__WEBPACK_IMPORTED_MODULE_4__.default, _scenes_help__WEBPACK_IMPORTED_MODULE_3__.default, _scenes_game__WEBPACK_IMPORTED_MODULE_2__.default],\n});\n\n});\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/main.js?");

/***/ }),

/***/ "./assets/scripts/scenes/game.js":
/*!***************************************!*\
  !*** ./assets/scripts/scenes/game.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/globals */ \"./assets/scripts/util/globals.js\");\n/* harmony import */ var _util_bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/bullet */ \"./assets/scripts/util/bullet.js\");\n/* harmony import */ var _util_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/player */ \"./assets/scripts/util/player.js\");\n/* harmony import */ var _util_loadingBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/loadingBar */ \"./assets/scripts/util/loadingBar.js\");\n/* harmony import */ var _util_oauth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/oauth */ \"./assets/scripts/util/oauth.js\");\n/* harmony import */ var _util_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/name */ \"./assets/scripts/util/name.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_6__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_util_name__WEBPACK_IMPORTED_MODULE_5__, _util_oauth__WEBPACK_IMPORTED_MODULE_4__]);\n([_util_name__WEBPACK_IMPORTED_MODULE_5__, _util_oauth__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\nclass GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_6___default().Scene) {\n\tconstructor() {\n\t\tsuper({\n\t\t\tkey: 'game',\n\t\t});\n\t}\n\n\tasync init() {\n\t\tthis.speed = 5;\n\t\tthis.score = 0;\n\t\tthis.sprintAcceleration = 3;\n\t\tthis.name = _util_oauth__WEBPACK_IMPORTED_MODULE_4__.default.isSignedIn.get()\n\t\t\t? await _util_name__WEBPACK_IMPORTED_MODULE_5__.getName()\n\t\t\t: _util_name__WEBPACK_IMPORTED_MODULE_5__.askName();\n\t}\n\n\tpreload() {\n\t\tthis.load.image('player', 'assets/images/player.png');\n\t\tthis.load.image('bullet', 'assets/images/bullet.png');\n\t\tthis.load.image('enemy', 'assets/images/enemy.png');\n\t\tthis.load.image('grass', 'assets/images/grass.png');\n\n\t\tthis.load.audio('pew', 'assets/sounds/shoot.mp3');\n\t\tthis.load.audio('music', 'assets/sounds/music.mp3');\n\n\t\t(0,_util_loadingBar__WEBPACK_IMPORTED_MODULE_3__.default)(this);\n\t}\n\n\tcreate() {\n\t\tthis.start = this.getTime();\n\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.emit('ready');\n\n\t\tconst music = this.sound.add('music', {\n\t\t\tvolume: 0.03,\n\t\t\tloop: true,\n\t\t});\n\t\tmusic.play();\n\n\t\tthis.pew = this.sound.add('pew', {\n\t\t\tvolume: 0.05,\n\t\t});\n\n\t\tthis.bg = this.add.tileSprite(\n\t\t\t0,\n\t\t\t0,\n\t\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth,\n\t\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight,\n\t\t\t'grass'\n\t\t);\n\n\t\tthis.bg.setOrigin(0);\n\n\t\tthis.scoreText = this.add.text(10, 10, 'Score: 0');\n\t\tthis.scoreText.setScrollFactor(0, 0);\n\n\t\tthis.leaderboardText = this.add.text(\n\t\t\tthis.cameras.main.centerX * 2 - 250,\n\t\t\t10,\n\t\t\t''\n\t\t);\n\t\tthis.leaderboardText.setScrollFactor(0, 0);\n\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.on('leaderboard', (leaderboard) => {\n\t\t\tlet formattedText = 'Leaderboard:';\n\t\t\tleaderboard.forEach((player) => {\n\t\t\t\tformattedText += `\\n\\t${player}`;\n\t\t\t});\n\n\t\t\tthis.leaderboardText.text = formattedText;\n\t\t});\n\n\t\tthis.players = this.physics.add.group();\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.on('newPlayer', (data) => {\n\t\t\tconst newPlayer = this.add.sprite(\n\t\t\t\tdata.player.x,\n\t\t\t\tdata.player.y,\n\t\t\t\t'enemy'\n\t\t\t);\n\n\t\t\tnewPlayer.nameText = this.add.text(\n\t\t\t\tdata.player.x - 40,\n\t\t\t\tdata.player.y - 100,\n\t\t\t\tdata.player.name\n\t\t\t);\n\n\t\t\tnewPlayer.setScale(0.5);\n\t\t\tnewPlayer.id = data.id;\n\n\t\t\tthis.players.add(newPlayer);\n\t\t});\n\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.on('players', (players) => {\n\t\t\tObject.keys(players).forEach((id) => {\n\t\t\t\tconst playerInfo = players[id];\n\t\t\t\tif (id != _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.id) {\n\t\t\t\t\tthis.players.getChildren().forEach((player) => {\n\t\t\t\t\t\tif (player.id == id) {\n\t\t\t\t\t\t\tplayer.nameText.setPosition(\n\t\t\t\t\t\t\t\tplayerInfo.x - 30,\n\t\t\t\t\t\t\t\tplayerInfo.y - 100\n\t\t\t\t\t\t\t);\n\n\t\t\t\t\t\t\tplayer.setPosition(playerInfo.x, playerInfo.y);\n\t\t\t\t\t\t\tplayer.setAngle(playerInfo.angle);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\tthis.score = playerInfo.score;\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.on('playerLeft', (id) => {\n\t\t\tthis.players.getChildren().forEach((player) => {\n\t\t\t\tif (player.id == id) {\n\t\t\t\t\tplayer.destroy();\n\t\t\t\t\tplayer.nameText.destroy();\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\n\t\tthis.physics.world.setBounds(0, 0, _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth, _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight);\n\t\tthis.cameras.main.setBounds(0, 0, _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth, _util_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight);\n\n\t\tthis.player = new _util_player__WEBPACK_IMPORTED_MODULE_2__.default(this);\n\n\t\tthis.myBullets = new _util_bullet__WEBPACK_IMPORTED_MODULE_1__.default(this);\n\t\tthis.theirBullets = this.physics.add.group();\n\t\tthis.physics.add.overlap(\n\t\t\tthis.theirBullets,\n\t\t\tthis.player,\n\t\t\t(player, bullet) => {\n\t\t\t\tthis.player.resetPos();\n\t\t\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.emit('shot', bullet.id);\n\t\t\t}\n\t\t);\n\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.on('newBullet', (bullet) => {\n\t\t\tconst newBullet = this.physics.add.sprite(\n\t\t\t\tbullet.pos.initial.x,\n\t\t\t\tbullet.pos.initial.y,\n\t\t\t\t'bullet'\n\t\t\t);\n\n\t\t\tnewBullet.id = bullet.id;\n\t\t\tnewBullet.setScale(0.07);\n\t\t\tnewBullet.setAngle(bullet.pos.angle);\n\n\t\t\tthis.theirBullets.add(newBullet);\n\t\t\tthis.physics.moveTo(\n\t\t\t\tnewBullet,\n\t\t\t\tbullet.pos.end.x,\n\t\t\t\tbullet.pos.end.y,\n\t\t\t\t300\n\t\t\t);\n\t\t});\n\n\t\tthis.keys = this.input.keyboard.addKeys('W,A,S,D');\n\t\tthis.shiftKey = this.input.keyboard.addKey(16);\n\n\t\tthis.input.on('pointermove', (event) => {\n\t\t\tconst angle =\n\t\t\t\t(phaser__WEBPACK_IMPORTED_MODULE_6___default().Math.RAD_TO_DEG) * // converts the radians to degress\n\t\t\t\tphaser__WEBPACK_IMPORTED_MODULE_6___default().Math.Angle.Between(\n\t\t\t\t\t// calculates the angle in radians\n\t\t\t\t\tthis.player.x,\n\t\t\t\t\tthis.player.y,\n\t\t\t\t\tthis.game.input.activePointer.worldX,\n\t\t\t\t\tthis.game.input.activePointer.worldY\n\t\t\t\t);\n\t\t\tthis.player.setAngle(angle);\n\t\t});\n\t}\n\n\tupdate() {\n\t\tlet playerSpeed = this.speed;\n\t\tif (this.shiftKey.isDown) {\n\t\t\tplayerSpeed += this.sprintAcceleration;\n\t\t}\n\n\t\tif (this.keys.W.isDown) {\n\t\t\tthis.player.y -= playerSpeed;\n\t\t\tthis.cameras.main.scrollY -= playerSpeed;\n\t\t\tthis.player.resetNameText();\n\t\t}\n\n\t\tif (this.keys.S.isDown) {\n\t\t\tthis.player.y += playerSpeed;\n\t\t\tthis.cameras.main.scrollY += playerSpeed;\n\t\t\tthis.player.resetNameText();\n\t\t}\n\n\t\tif (this.keys.A.isDown) {\n\t\t\tthis.player.x -= playerSpeed;\n\t\t\tthis.cameras.main.scrollX -= playerSpeed;\n\t\t\tthis.player.resetNameText();\n\t\t}\n\n\t\tif (this.keys.D.isDown) {\n\t\t\tthis.player.x += playerSpeed;\n\t\t\tthis.cameras.main.scrollX += playerSpeed;\n\t\t\tthis.player.resetNameText();\n\t\t}\n\n\t\tif (this.input.activePointer.isDown && this.showDelta() > 100) {\n\t\t\tthis.pew.play();\n\t\t\tthis.myBullets.fire(this.player.x, this.player.y - 20);\n\t\t\tthis.start = this.getTime();\n\t\t}\n\n\t\tthis.scoreText.text = 'Score: ' + this.score;\n\n\t\t_util_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.emit('player', {\n\t\t\tx: this.player.x,\n\t\t\ty: this.player.y,\n\t\t\tangle: this.player.angle,\n\t\t});\n\t}\n\n\tgetTime() {\n\t\treturn new Date().getTime();\n\t}\n\n\tshowDelta() {\n\t\treturn this.getTime() - this.start;\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameScene);\n\n});\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/scenes/game.js?");

/***/ }),

/***/ "./assets/scripts/scenes/help.js":
/*!***************************************!*\
  !*** ./assets/scripts/scenes/help.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass HelpScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {\n\tconstructor() {\n\t\tsuper({\n\t\t\tkey: 'help',\n\t\t});\n\t}\n\n\tpreload() {\n\t\tthis.load.image('grass', 'assets/images/grass.png');\n\t}\n\n\tcreate() {\n\t\tconst bg = this.add.tileSprite(\n\t\t\t0,\n\t\t\t0,\n\t\t\twindow.innerWidth,\n\t\t\twindow.innerHeight,\n\t\t\t'grass'\n\t\t);\n\n\t\tbg.setOrigin(0);\n\n\t\tthis.backButton = this.add.text(0, 0, 'BACK', {\n\t\t\tfill: '#fc6b03',\n\t\t});\n\t\tthis.backButton.setInteractive();\n\n\t\tthis.backButton.on('pointerdown', () => {\n\t\t\tthis.scene.switch('menu');\n\t\t});\n\n\t\tthis.add.text(\n\t\t\tthis.cameras.main.centerX - 300,\n\t\t\tthis.cameras.main.centerY - 100,\n\t\t\t`\n\t\t\tHow to play:\n                Use wasd keys to move\n                Hold down the cursor to shoot\n                Shoot the other players in order to earn points\n\t\t\tTip:\n\t\t\t\tHold shift to sprint\n            `\n\t\t);\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpScene);\n\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/scenes/help.js?");

/***/ }),

/***/ "./assets/scripts/scenes/menu.js":
/*!***************************************!*\
  !*** ./assets/scripts/scenes/menu.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_oauth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/oauth */ \"./assets/scripts/util/oauth.js\");\n/* harmony import */ var _util_loadingBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/loadingBar */ \"./assets/scripts/util/loadingBar.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_util_oauth__WEBPACK_IMPORTED_MODULE_1__]);\n_util_oauth__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\n\n\nclass MenuScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {\n\tconstructor() {\n\t\tsuper({\n\t\t\tkey: 'menu',\n\t\t});\n\t}\n\n\tpreload() {\n\t\tthis.load.image('grass', 'assets/images/grass.png');\n\n\t\t(0,_util_loadingBar__WEBPACK_IMPORTED_MODULE_2__.default)(this);\n\t}\n\n\tcreate() {\n\t\tconst bg = this.add.tileSprite(\n\t\t\t0,\n\t\t\t0,\n\t\t\twindow.innerWidth,\n\t\t\twindow.innerHeight,\n\t\t\t'grass'\n\t\t);\n\n\t\tbg.setOrigin(0);\n\n\t\tconst textSettings = {\n\t\t\tfill: '#fc6b03',\n\t\t\tfontSize: '150px',\n\t\t\tbackgroundColor: '#a83232',\n\t\t};\n\n\t\tthis.playButton = this.add.text(\n\t\t\tthis.cameras.main.centerX - 200,\n\t\t\tthis.cameras.main.centerY - 170,\n\t\t\t'PLAY',\n\t\t\ttextSettings\n\t\t);\n\n\t\tthis.playButton.setInteractive();\n\n\t\tthis.playButton.on('pointerdown', () => {\n\t\t\tthis.scene.switch('game');\n\t\t});\n\n\t\tthis.helpButton = this.add.text(\n\t\t\tthis.cameras.main.centerX - 200,\n\t\t\tthis.cameras.main.centerY + 5,\n\t\t\t'HELP',\n\t\t\ttextSettings\n\t\t);\n\n\t\tthis.helpButton.setInteractive();\n\n\t\tthis.helpButton.on('pointerdown', () => {\n\t\t\tthis.scene.switch('help');\n\t\t});\n\n\t\tthis.signInButton = this.add.text(\n\t\t\tthis.cameras.main.centerX - 340,\n\t\t\tthis.cameras.main.centerY + 180,\n\t\t\t_util_oauth__WEBPACK_IMPORTED_MODULE_1__.default.isSignedIn.get() ? 'SIGN OUT' : 'SIGN IN',\n\t\t\ttextSettings\n\t\t);\n\n\t\tthis.signInButton.setInteractive();\n\n\t\tthis.signInButton.on('pointerdown', () => {\n\t\t\tif (_util_oauth__WEBPACK_IMPORTED_MODULE_1__.default.isSignedIn.get()) {\n\t\t\t\t_util_oauth__WEBPACK_IMPORTED_MODULE_1__.default.signOut();\n\t\t\t\tthis.signInButton.text = 'SIGN IN';\n\t\t\t} else {\n\t\t\t\t_util_oauth__WEBPACK_IMPORTED_MODULE_1__.default.signIn();\n\t\t\t\tthis.signInButton.text = 'SIGN OUT';\n\t\t\t}\n\t\t});\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuScene);\n\n});\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/scenes/menu.js?");

/***/ }),

/***/ "./assets/scripts/util/bullet.js":
/*!***************************************!*\
  !*** ./assets/scripts/util/bullet.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./assets/scripts/util/globals.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Bullet extends (phaser__WEBPACK_IMPORTED_MODULE_1___default().Physics.Arcade.Sprite) {\n\tconstructor(scene, x, y) {\n\t\tsuper(scene, x, y, 'bullet');\n\n\t\tthis.scene = scene;\n\t}\n\n\tfire(x, y) {\n\t\t_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.emit('newBullet', {\n\t\t\tangle: this.scene.player.angle,\n\t\t\tinitial: {\n\t\t\t\tx,\n\t\t\t\ty,\n\t\t\t},\n\t\t\tend: {\n\t\t\t\tx: this.scene.game.input.activePointer.worldX,\n\t\t\t\ty: this.scene.game.input.activePointer.worldY,\n\t\t\t},\n\t\t});\n\t\tthis.body.reset(x, y);\n\n\t\tthis.angle = this.scene.player.angle;\n\n\t\tthis.scene.physics.moveTo(\n\t\t\tthis,\n\t\t\tthis.scene.game.input.activePointer.worldX,\n\t\t\tthis.scene.game.input.activePointer.worldY,\n\t\t\t300\n\t\t);\n\n\t\tthis.setActive(true);\n\t\tthis.setVisible(true);\n\t}\n\n\tpreUpdate(time, delta) {\n\t\tsuper.preUpdate(time, delta);\n\n\t\tif (\n\t\t\tthis.y <= 0 ||\n\t\t\tthis.y >= _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight ||\n\t\t\tthis.x <= 0 ||\n\t\t\tthis.x >= _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth\n\t\t) {\n\t\t\tthis.setActive(false);\n\t\t\tthis.setVisible(false);\n\t\t}\n\t}\n}\n\nclass BulletGroup extends (phaser__WEBPACK_IMPORTED_MODULE_1___default().Physics.Arcade.Group) {\n\tconstructor(scene) {\n\t\tsuper(scene.physics.world, scene);\n\n\t\tthis.createMultiple({\n\t\t\tframeQuantity: 40,\n\t\t\tkey: 'bullet',\n\t\t\tsetScale: {\n\t\t\t\tx: 0.07,\n\t\t\t\ty: 0.07,\n\t\t\t},\n\t\t\tactive: false,\n\t\t\tvisible: false,\n\t\t\tclassType: Bullet,\n\t\t});\n\t}\n\n\tfire(x, y) {\n\t\tconst bullet = this.getFirstDead(false);\n\t\tif (bullet) bullet.fire(x, y);\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BulletGroup);\n\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/util/bullet.js?");

/***/ }),

/***/ "./assets/scripts/util/globals.js":
/*!****************************************!*\
  !*** ./assets/scripts/util/globals.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst io = __webpack_require__(/*! socket.io-client */ \"./node_modules/socket.io-client/build/index.js\");\nconst endpoint =  false\n\t? 0\n\t: 'http://localhost:8080/';\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n\tsocket: io(endpoint),\n\tmapHeight: 1000,\n\tmapWidth: 2000,\n\tendpoint,\n});\n\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/util/globals.js?");

/***/ }),

/***/ "./assets/scripts/util/loadingBar.js":
/*!*******************************************!*\
  !*** ./assets/scripts/util/loadingBar.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./assets/scripts/util/globals.js\");\n\n\nfunction loadingBar(scene) {\n\tconst bg = scene.add.graphics();\n\tbg.fillStyle(0x6f9c3b);\n\tbg.fillRect(0, 0, _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth, _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight);\n\n\tconst loadingText = scene.make.text({\n\t\tx: _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth / 2,\n\t\ty: _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight / 2 - 15,\n\t\ttext: 'Loading...',\n\t});\n\tloadingText.setOrigin(0.5, 0.5);\n\n\tconst progressBox = scene.add.graphics();\n\tprogressBox.fillStyle(0x384e1c, 0.8);\n\tprogressBox.fillRect(\n\t\t_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth / 2 - 165,\n\t\t_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight / 2,\n\t\t320,\n\t\t50\n\t);\n\n\tconst progressBar = scene.add.graphics();\n\n\tconst percentText = scene.make.text({\n\t\tx: _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth / 2 - 20,\n\t\ty: _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight / 2 + 20,\n\t});\n\tpercentText.setOrigin(0.5, 0.5);\n\n\tscene.load.on('progress', (value) => {\n\t\t// console.log(value);\n\t\tprogressBar.clear();\n\t\tprogressBar.fillStyle(0x587c2f);\n\t\tprogressBar.fillRect(\n\t\t\t_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth / 2 + 10 - 165,\n\t\t\t_globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight / 2 + 10,\n\t\t\t300 * value,\n\t\t\t30\n\t\t);\n\n\t\tpercentText.setText(value * 100 + '%');\n\t\t// console.log(value * 100 + '%');\n\t});\n\n\tscene.load.on('fileprogress', (file) => {\n\t\t// console.log(file.src);\n\t});\n\n\tscene.load.on('complete', () => {\n\t\t// console.log('complete');\n\t\tbg.destroy();\n\t\tprogressBar.destroy();\n\t\tprogressBox.destroy();\n\t\tpercentText.destroy();\n\t});\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadingBar);\n\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/util/loadingBar.js?");

/***/ }),

/***/ "./assets/scripts/util/name.js":
/*!*************************************!*\
  !*** ./assets/scripts/util/name.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"askName\": () => (/* binding */ askName),\n/* harmony export */   \"setName\": () => (/* binding */ setName),\n/* harmony export */   \"getName\": () => (/* binding */ getName)\n/* harmony export */ });\n/* harmony import */ var _oauth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oauth */ \"./assets/scripts/util/oauth.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_oauth__WEBPACK_IMPORTED_MODULE_0__]);\n_oauth__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\nconst askName = () => prompt('What would you like to be called?');\n\nconst setName = () => {\n\treturn new Promise((resolve, reject) => {\n\t\tconst name = askName();\n\t\tfetch('api/setName', {\n\t\t\tmethod: 'POST',\n\t\t\theaders: {\n\t\t\t\t'content-type': 'application/json',\n\t\t\t},\n\t\t\tbody: JSON.stringify({\n\t\t\t\tid: _oauth__WEBPACK_IMPORTED_MODULE_0__.default.currentUser.get().Qs.zt,\n\t\t\t\tname,\n\t\t\t}),\n\t\t});\n\n\t\tresolve(name);\n\t});\n};\n\nconst getName = () => {\n\treturn new Promise((resolve, reject) => {\n\t\tfetch('api/getName', {\n\t\t\tmethod: 'POST',\n\t\t\theaders: {\n\t\t\t\t'content-type': 'application/json',\n\t\t\t},\n\t\t\tbody: JSON.stringify({\n\t\t\t\tid: _oauth__WEBPACK_IMPORTED_MODULE_0__.default.currentUser.get().Qs.zt,\n\t\t\t}),\n\t\t})\n\t\t\t.then((res) => res.json())\n\t\t\t.then(async ({ name }) => {\n\t\t\t\tresolve(name != '' ? name : await undefined.setName());\n\t\t\t});\n\t});\n};\n\n});\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/util/name.js?");

/***/ }),

/***/ "./assets/scripts/util/oauth.js":
/*!**************************************!*\
  !*** ./assets/scripts/util/oauth.js ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst loadOauth = new Promise((resolve, reject) => {\n\tconst initGapi = new Promise((resolve, reject) => {\n\t\tgapi.load('client', () => {\n\t\t\tgapi.client\n\t\t\t\t.init({\n\t\t\t\t\tapiKey: 'L30fdoj3Mz1RL8KEGEQx8kGR',\n\t\t\t\t\tclientId:\n\t\t\t\t\t\t'874102344684-gu4p8e3or2skov57s17tra58v2blvc75.apps.googleusercontent.com',\n\t\t\t\t\tscope: 'https://www.googleapis.com/auth/userinfo.email',\n\t\t\t\t})\n\t\t\t\t.then(resolve)\n\t\t\t\t.catch(reject);\n\t\t});\n\t});\n\n\tinitGapi.then(() => {\n\t\tconst oauth = gapi.auth2.getAuthInstance();\n\n\t\toauth.isSignedIn.listen((status) => {\n\t\t\tif (!status) return;\n\n\t\t\tconsole.log(oauth.currentUser.get());\n\t\t\tfetch('api/createUser', {\n\t\t\t\tmethod: 'POST',\n\t\t\t\theaders: {\n\t\t\t\t\t'content-type': 'application/json',\n\t\t\t\t},\n\t\t\t\tbody: JSON.stringify({\n\t\t\t\t\tid: oauth.currentUser.get().Qs.zt,\n\t\t\t\t}),\n\t\t\t}).catch(console.error);\n\t\t});\n\n\t\tresolve(oauth);\n\t});\n\n\tinitGapi.catch(reject);\n});\n\nloadOauth.catch((error) => {\n\tconsole.log('Error loading oauth!');\n\tconsole.log(error);\n});\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (await loadOauth);\n\n__webpack_handle_async_dependencies__();\n}, 1);\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/util/oauth.js?");

/***/ }),

/***/ "./assets/scripts/util/player.js":
/*!***************************************!*\
  !*** ./assets/scripts/util/player.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ \"./assets/scripts/util/globals.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Player extends (phaser__WEBPACK_IMPORTED_MODULE_1___default().Physics.Arcade.Sprite) {\n\tconstructor(scene) {\n\t\tsuper(\n\t\t\tscene,\n\t\t\tMath.random() * _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth,\n\t\t\tMath.random() * _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight,\n\t\t\t'player'\n\t\t);\n\n\t\tthis.nameText = scene.add.text(this.x - 40, this.y - 100, scene.name);\n\n\t\tscene.add.existing(this);\n\t\tscene.physics.add.existing(this);\n\n\t\tthis.setScale(0.5);\n\n\t\tscene.cameras.main.startFollow(this, true);\n\t\tthis.setCollideWorldBounds(true);\n\n\t\t_globals__WEBPACK_IMPORTED_MODULE_0__.default.socket.emit('newPlayer', {\n\t\t\tx: this.x,\n\t\t\ty: this.y,\n\t\t\tname: this.scene.name,\n\t\t});\n\t}\n\n\tresetPos() {\n\t\tthis.setPosition(\n\t\t\tMath.random() * _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapWidth,\n\t\t\tMath.random() * _globals__WEBPACK_IMPORTED_MODULE_0__.default.mapHeight\n\t\t);\n\t\tthis.resetNameText();\n\t}\n\n\tresetNameText() {\n\t\tthis.nameText.setPosition(this.x - 40, this.y - 100);\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://grapple_client/./assets/scripts/util/player.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./assets/scripts/main.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);