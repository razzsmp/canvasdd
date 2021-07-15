<br />
<div align="center">
    <h1> Discord-Canvas </h1>
    <p>
        A lightweight and easy to use canvas template!<br />
        This package can be use in discord or other app.<br /><br />
    </p>
    <p>
        <a href="https://www.npmjs.com/package/@kuroxi/discord-canvas"><img src="https://img.shields.io/npm/v/@kuroxi/discord-canvas?style=for-the-badge" /></a>
        <a href="https://www.npmjs.com/package/@kuroxi/discord-canvas"><img src="https://img.shields.io/github/repo-size/KuroXI/discord-canvas?style=for-the-badge" /></a>
        <a href="https://www.npmjs.com/package/@kuroxi/discord-canvas"><img src="https://img.shields.io/npm/l/@kuroxi/discord-canvas?style=for-the-badge" /></a>
        <a href="https://www.npmjs.com/package/@kuroxi/discord-canvas"><img src="https://img.shields.io/npm/dt/@kuroxi/discord-canvas?style=for-the-badge" /></a>
    </p>
</div>

- This package is similar to [canvacord](https://www.npmjs.com/package/canvacord) but different design
- I will be adding more design in the future and will keep updating this package. Hope u like it!
- If you have a request that u want to be put in the package just DM me in discord [Kurooo#5157](https://www.npmjs.com/~kuroxi)

## Example
```js
const DiscordCanvas = require('@kuroxi/discord-canvas')
const template = new DiscordCanvas.Currency()
    .setBackground('#353535')
    .setProfile(message.author.displayAvatarURL({ format: 'png' }))
    .setUsername(message.author.username)
    .setDiscriminator(message.author.discriminator)
    .setRank(55121)
    .setWallet(125131231)
    .setBank(123137819317)
    .setSeperator('#FFFFFF', 1)

template.build().then((data) => {
    const attachment = new Discord.MessageAttachment(data, 'image-name.png')
    return message.channel.send(attachment)
})
```
## Output
![img](https://i.imgur.com/dVh94g2.jpg)

<br />