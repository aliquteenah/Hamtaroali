let handler = async (m, { conn, command, text }) => {
let love = `

*1_قروب دعـم البـ،ـوت 🖥️ لمعرفه تحديث الاوامر.↯↯*
*https://chat.whatsapp.com/EUTnmpaCDpYLECkgYibs4h*
 
*ارقام المشرفين فقط ظاهره في المجتمع*
`.trim()
m.reply(love, null, { mentions: conn.parseMention(love) })}
handler.help = ['estupidez']
handler.tags = ['fun']
handler.command = /^(الدعم|القروب)$/i
export default handler
