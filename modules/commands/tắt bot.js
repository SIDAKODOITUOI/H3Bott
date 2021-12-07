module.exports.config = {
	name: "tắt bot",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "hoàng",
	description: "dùng đi",
	commandCategory: "Admin",
	cooldowns: 0
}
module.exports.run = ({event, api}) =>
 api.sendMessage("ok tắt",event.threadID, () =>process.exit(0))