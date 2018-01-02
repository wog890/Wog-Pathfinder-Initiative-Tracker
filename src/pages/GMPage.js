const {Page, TextView, Button} = require('tabris');
const CampaignPage = require('./CampaignPage');

module.exports = class GMPage extends Page {
	constructor(navigationView) {
		let sCampaigns = localStorage.getItem('campaigns');
		let aCampaigns = null;
		if (sCampaigns !== null) {
			aCampaigns = sCampaigns.split('|');
		}
		super({title: "GM"});
		new TextView({
			centerX: 0, top: 20,
			alignment: 'center',
			markupEnabled: true,
			text: "<b><big>Campaign</big></b>"
		}).appendTo(this);
		if (aCampaigns !== null) {
			for (let i=0, j=aCampaigns.length; i<j; i++) {
				new Button({
					centerX: 0, top: ['prev()', 10],
					text: aCampaigns[i]
				}).on('select', () => {
					new CampaignPage(aCampaigns[i]).appendTo(navigationView);
				}).appendTo(this);
			}
		}
		new Button({
			centerX: 0, top: ['prev()', 10],
			text: "New Campaign"
		}).on('select', () => {
			new CampaignPage().appendTo(navigationView);
		}).appendTo(this);
	}
};