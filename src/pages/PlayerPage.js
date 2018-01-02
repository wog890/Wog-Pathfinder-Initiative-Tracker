const {Page, TextView} = require('tabris');
module.exports = class GMPage extends Page {
	constructor() {
		super({title: "Player"});
		new TextView({
			centerX: 0, centerY: 0,
			text: "Hello Player"
		}).appendTo(this);
	}
};