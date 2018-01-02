const {Button, NavigationView, Page, ui, TextView} = require('tabris');
const GMPage = require('./pages/GMPage');
const PlayerPage = require('./pages/PlayerPage');
const ScreenPage = require('./pages/ScreenPage');

let navigationView = new NavigationView({
	left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

let mainPage = new Page({
	title: 'Home'
}).appendTo(navigationView);

new TextView({
	centerX: 0, top: 200,
	markupEnabled: true,
	text: '<b><big>Which is this device for?</big></b>'
}).appendTo(mainPage);

new Button({
	centerX: 0, top: ['prev()', 20],
	text: 'GM'
}).on('select', () => {
	new GMPage(navigationView).appendTo(navigationView);
}).appendTo(mainPage);

new Button({
	centerX: 0, top: ['prev()', 20],
	text: 'Player'
}).on('select', () => {
	new PlayerPage().appendTo(navigationView);
}).appendTo(mainPage);

new Button({
	centerX: 0, top: ['prev()', 20],
	text: 'Screen'
}).on('select', () => {
	new ScreenPage().appendTo(navigationView);
}).appendTo(mainPage);

module.exports = navigationView;
