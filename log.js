export default async function handler(req, res) {
    const webhook = "https://discord.com/api/webhooks/1528371477706047568/8NbAY5xarTHJyYyhFV_Hss87_8fXNUECdfHZS1wxe48-fDzQ7MDiJt6jISoo49-if4Wc";

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const country = req.headers['x-vercel-ip-country'] || '알 수 없음';
    const region = req.headers['x-vercel-ip-country-region'] || '';
    const city = req.headers['x-vercel-ip-city'] || '';

    const os = /iPhone|iPad|iPod/.test(userAgent) ? "iOS" :
               /Android/.test(userAgent) ? "Android" : "Desktop";

    const payload = {
        content: "🔍 Vercel 방문 로그",
        embeds: [{
            title: "새 방문자",
            color: 0x00ff00,
            fields: [
                { name: "IP", value: ip || "unknown", inline: true },
                { name: "국가", value: country, inline: true },
                { name: "지역", value: `${region} ${city}`, inline: true },
                { name: "OS", value: os, inline: true },
                { name: "시간", value: new Date().toLocaleString('ko-KR'), inline: false },
                { name: "User-Agent", value: userAgent?.substring(0, 500) || "없음", inline: false }
            ]
        }]
    };

    try {
        await fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error("Webhook error", e);
    }

    res.status(200).send("ok");
}
