const {Page, Button} = require('tabris');
var base64 = require('base64');
global.atob = base64.atob;

function searchForGM() {
	ble.scan([], 60, function(device) {
		console.log(JSON.stringify(device));
	});
	setTimeout(function() {
		ble.connect('DC:44:B6:47:0F:9A', () => {
			console.log('Connection!');
		}, () => {
			console.log('Failure to connect');
		})
	}, 241);
}

module.exports = class GMPage extends Page {
	constructor() {
		super({title: "Screen"});
		new Button({
			centerX: 0, top: 200,
			text: 'Search for available GM'
		}).on('select', searchForGM).appendTo(this);
	}
};