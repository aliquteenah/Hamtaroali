import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, command}) => {
  const res = await fetch('https://api.waifu.pics/sfw/waifu');
  if (!res.ok) throw await res.text();
  const json = await res.json();
  if (!json.url) throw 'Error!';
  conn.sendFile(m.chat, json.url, 'error.jpg', `╮ ───═┅─┅─┅═─── ╭
 •🇾🇪_ الجنہـــــرال_بــوت
╯ ───═┅─┅─┅═─── ╰`, m);
// conn.sendButton(m.chat, `𝙰-🌸💕💕💕💕~~`, author, json.url, [['🔄 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 🔄', `/${command}`]], m)
};
handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = /^(كيوت)$/i;
export default handler;
