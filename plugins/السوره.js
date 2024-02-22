import fetch from 'node-fetch';

const fetchQuranData = async (surahNumber) => {
  try {
    const response = await fetch(`https://quran-wudy.vercel.app/surah/${surahNumber}`);
    const data = await response.json();
    return data.data.verses;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = async (m, { conn }) => {
conn.qurannData = conn.qurannData ? conn.qurannData : {};

  const surahNumber = parseInt(m.text.split(' ')[1]);
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    m.reply("❌ خطأ يرجى كتابة رقم السورة .بعد الامر بين 1 و 114.\n مثال : \n .السوره 114");
    return;
  }

  const ayahs = await fetchQuranData(surahNumber);
  if (!ayahs) {
    m.reply("حدث خطأ أعد المحاولة.");
    return;
  }

  const formattedList = Object.values(ayahs).map(v => (
    `*${v.number.inSurah}.* ${v.text.arab}`
  )).join('\n');

  const instructions = "*‏﴿───═┅─📖─┅═───﴾* \n قم بالرد على هذه الرسالة برقم الآية المطلوبة وسارسلها لك صوت. \n يمكنك زيارة أنستغرام صاحب البوت لمعرفة المزيد عن هذه الميزة \n instagram.com/ali_quteenah";

  let { key } = await m.reply(`📖قائمة الآيات في السوره رقم${surahNumber}:\n *‏﴿───═┅─📖─┅═───﴾* \n ${formattedList}\n\n${instructions} \n *‏﴿───═┅─📖─┅═───﴾*`);
  // Store the Quran data in conn.qurannData variable for later use
  conn.qurannData[m.chat] = { list: Object.values(ayahs), key };
};

handler.before = async (m, { conn }) => {
conn.qurannData = conn.qurannData ? conn.qurannData : {};

if (m.isBaileys || !(m.chat in conn.qurannData)) return;
  const input = m.text.trim();
  if (!/^\d+$/.test(input)) return; // If the input is not a number, do nothing

  const { list, key } = conn.qurannData[m.chat];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  const index = parseInt(input);

  if (isNaN(index) || index < 1 || index > list.length) {
    m.reply("❌ رقم السوره غير صحيح. يرجى تقديم رقم آية صالح من القائمة.\nمثال :\n .السوره 112");
  } else {
  const selectedObj = list[index - 1];

  // Check if the message is a reply and the quoted message id matches the key.id from the list
    await conn.sendMessage(m.chat, {
      audio: {
        url: selectedObj.audio.primary,
      },
      mimetype: "audio/mpeg",
      filename: "quran_audio.mp3",
      ptt: true,
    }, { quoted: m });

    clearTimeout(conn.qurannData[m.chat].timeout);
    //delete conn.qurannData[m.chat];
  }
};

handler.help = ["ayati"];
handler.tags = ["islam"];
handler.command = /^السوره$/i;

export default handler;
