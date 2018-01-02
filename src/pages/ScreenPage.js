const {Page, Button} = require('tabris');
module.exports = class GMPage extends Page {
	constructor() {
		super({title: "Screen"});
		new Button({
			centerX: 0, top: 200,
			text: 'Search for available GM'
		}).on('select', () => {
			
		}).appendTo(this);
	}
};