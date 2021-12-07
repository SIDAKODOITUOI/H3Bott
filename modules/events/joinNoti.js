module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.4",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event, Users }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`▂▃▅▆𝐋𝐨𝐚𝐝𝐢𝐧𝐠...𝟏𝟎𝟎%▆▅▃▂\n
⫸ 𝑲𝒆̂́𝒕 𝒏𝒐̂́𝒊 𝒕𝒉𝒂̀𝒏𝒉 𝒄𝒐̂𝒏𝒈 ⫷\n
●▬▬▬▬▬๑⇩⇩๑▬▬▬▬▬●\n
▷ 𝑅𝑈𝐿𝐸 𝐵𝑜𝑡 ◁\n
⏩ 𝐾ℎ𝑜̂𝑛𝑔 𝑠𝑝𝑎𝑚\n
⏩ 𝐾ℎ𝑜̂𝑛𝑔 𝑐ℎ𝑢̛̉𝑖 𝑏𝑜𝑡\n
⏩ 𝐾ℎ𝑜̂𝑛𝑔 𝑘𝑖𝑐𝑘 𝑏𝑜𝑡\n
⏩ 𝐻𝑎̣𝑛 𝑐ℎ𝑒̂́ 𝑠𝑝𝑎𝑚 🔞+.....\n
●▬▬▬▬▬๑⇧⇧๑▬▬▬▬▬●\n
❛━━･❪ 𝑷𝒓𝒆𝒇𝒊𝒙[ ${global.config.PREFIX} ]❫･━━❜\n
📲Mọi Thắc Mắc Về Bot :\n 𝒂𝒅𝒎𝒊𝒏:https://www.fb.me/lyhoanganh.htbot\n
📲Mọi Thắc Mắc Về Dịch Vụ Facebook - Tiktok - Ig:\n 𝒂𝒅𝒎𝒊𝒏:https://www.fb.me/lyhoanganh.htfb
${global.config.PREFIX}menu để hiện tất cả các lệnh\n
© 𝐆𝐫𝐚𝐯𝐢𝐭𝐲 𝐅𝐚𝐥𝐥𝐬 𝟐𝟎𝟐𝟏\n
⚠️ 𝐃𝐨 𝐧𝐨𝐭 𝐫𝐞𝐮𝐩 ❗`, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinMp4");
			const pathGif = join(path, `hi.mp4`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);

				if (!global.data.allUserID.includes(id)) {
					await Users.createData(id, { name: userName, data: {} });
					global.data.userName.set(id, userName);
					global.data.allUserID.push(id);
				}
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "Welcome aboard {name}.\nChào mừng đã đến với {threadName}.\n{type} là thành viên thứ {soThanhVien} của nhóm hãy tương tác để không bị kick đây là bot của group xin hãy sử dụng một cách văn minh và hợp lý xin cảm ơn 🥳" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}
