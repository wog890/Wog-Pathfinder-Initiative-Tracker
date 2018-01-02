const {Page, TextInput, Button} = require('tabris');
var base64 = require('base64');
global.atob = base64.atob;

function addScreen() {
	ble.enable(() => {
		console.log('Bluetooth is enabled');
	}, () => {
		console.log('User did not enable Bluetooth');
	})
	/*ble.scan([], 60, function(device) {
		console.log(JSON.stringify(device));
	}, function(failure) {});*/
}

function campaignNameChanged(target) {
	if (target.text == '') {
		window.plugins.toast.showShortBottom('Please name the campaign');
	}
	else {
		let campaigns = localStorage.getItem('campaigns');
		if (campaigns !== null && campaigns.indexOf(target.text) !== -1) {
			window.plugins.toast.showShortBottom('Campaign name ' + target.text + ' already exists. Data will be overwritten');
		}
		else {
			campaigns = campaigns !== null ? campaigns + '|' + target.text : target.text;
			localStorage.setItem('campaigns', campaigns);
			window.plugins.toast.showShortBottom('Campaign saved');
		}
	}
}

function checkCampaignNamed(txtCampaignName, action) {
	if (txtCampaignName == 'Unnamed Campaign') {
		window.plugins.toast.showShortBottom('Please name the campaign first');
	}
	else {
		switch(action) {
			case 'Add Screen': addScreen(); break;
		}
	}
}

function deleteCampaign(page) {
	let textInput = page.find('#txtCampaignName')[0];
	let sCampaigns = localStorage.getItem('campaigns');
	let aCampaigns = sCampaigns.split('|');
	let ret = '';
	for (let i=0, j=aCampaigns.length; i<j; i++) {
		if (aCampaigns[i] !== textInput.text) {
			ret = ret == '' ? aCampaigns[i] : ret + '|' + aCampaigns[i];
		}
	}
	localStorage.setItem('campaigns', ret);
	/*ADD CODE TO DELETE THE ACTUAL CAMPAIGN WHEN THAT EXISTS*/
	window.plugins.toast.showShortBottom('Campaign Deleted');
	page.dispose();
}

module.exports = class GMPage extends Page {
	constructor(campaignTitle) {
		super({title: "Campaign"});
		let campaignName = new TextInput({
			centerX: 0, top: 20,
			autoCapitalize: 'word',
			message: 'Campaign Name',
			id: 'txtCampaignName',
			text: campaignTitle || "Unnamed Campaign"
		}).on('accept', campaignNameChanged).appendTo(this);
		new Button({
			centerX: 0, top: ['prev()', 10],
			text: "Edit Factions"
		}).on('select', () => {
			if (campaignName.text == 'Unnamed Campaign') {
				window.plugins.toast.showShortBottom('Please name the campaign first!');
			}
		}).appendTo(this);
		new Button({
			centerX: 0, top: ['prev()', 10],
			text: "Initiative Tracker"
		}).on('select', () => {
			if (campaignName.text == 'Unnamed Campaign') {
				window.plugins.toast.showShortBottom('Please name the campaign first!');
			}
		}).appendTo(this);
		new Button({
			centerX: 0, top: ['prev()', 10],
			text: "Bestiary"
		}).on('select', () => {
			if (campaignName.text == 'Unnamed Campaign') {
				window.plugins.toast.showShortBottom('Please name the campaign first!');
			}
		}).appendTo(this);
		new Button({
			centerX: 0, top: ['prev()', 10],
			text: "Add Screen"
		}).on('select', () => {checkCampaignNamed(campaignName.text, 'Add Screen')}).appendTo(this);
		new Button({
			centerX: 0, bottom: 20,
			text: 'Delete Campaign'
		}).on('select', () => {deleteCampaign(this);}).appendTo(this);
	}
};