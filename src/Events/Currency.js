const Canvas = require('canvas')
const { CurrencyFormat } = require('../Utils/Utils.js')

class Currency {
    /**
     * @hideconstructor
     */
    constructor() {
        this.data = {
            user: {
                profile: null,
                username: null,
                usernameColor: '#FFFFFF',
                discriminator: null,
                discriminatorColor: '#ACAEB2',
                discriminatorPlace: true
            },
            background: '#202225',
            cover: {
                type: 'color',
                value: '#FF5F56'
            },
            seperator: {
                width: 1,
                color: '#959595'
            },
            regular: {
                value: 0,
                text_color: '#ACAEB2',
                value_color: '#FFFFFF'
            },
            fake: {
                value: 0,
                text_color: '#ACAEB2',
                value_color: '#FFFFFF'
            },
            leave: {
                value: 0,
                text_color: '#ACAEB2',
                value_color: '#FFFFFF'
            },
            currency: ''
        }
    }

    /**
     * 
     * @param {String} username Username
     * @param {String} color Text Color
     */
    setUsername(username, color = '#FFFFFF') {
        if (typeof username !== 'string') throw new TypeError('Username needs to be string!')
        if (typeof color !== 'string') throw new TypeError('Username Color needs to be string!')

        this.data.user.username = username
        this.data.user.usernameColor = color
        return this;
    }

    /**
     * 
     * @param {String} discriminator User's Discriminator
     * @param {String} color Discriminator Color
     * @param {Boolean} enable Enable discriminator or not
     */
    setDiscriminator(discriminator, color = '#ACAEB2', display = true) {
        if (typeof discriminator !== 'string') throw new TypeError('Discriminator needs to be string!')
        if (typeof color !== 'string') throw new TypeError('Discriminator Color needs to be string!')
        if (typeof display !== 'boolean') throw new TypeError('Discriminator display needs to be boolean')

        this.data.user.discriminator = discriminator;
        this.data.user.discriminatorColor = color;
        this.data.user.discriminatorPlace = display
        return this;
    }

    /**
     * 
     * @param {String} profile User's Profile
     */
    setProfile(profile) {
        if (typeof profile !== 'string') throw new TypeError('Profile needs to be string!')

        this.data.user.profile = profile
        return this;
    }

    /**
     * 
     * @param {String} color Background color of the image
     */
    setBackground(color = '#202225') {
        if (typeof color !== 'string') throw new TypeError('Background color needs to be string!')

        this.data.background = color;
        return this;
    }

    /**
     * 
     * @param {"COLOR"|"IMAGE"} type Cover type
     * @param {String} value Color | Image Path
     */
    setCover(type, value = '#FF5F56') {
        if (!value) throw new TypeError('Missing Value!')

        switch(type) {
            case 'COLOR':
                this.data.cover.type = 'color';
                this.data.cover.value = value;
                break;
            case 'IMAGE':
                this.data.cover.type = 'image';
                this.data.cover.value = value;
                break;
            default:
                throw new TypeError('Unsupported cover type')
        }
        return this;
    }

    /**
     * 
     * @param {String} color Seperators Color
     * @param {Number} width Width value
     */
    setSeperator(color = '#959595', width = 1) {
        if (typeof color !== 'string') throw new TypeError('Seperator color needs to be string!')
        if (typeof width !== 'number') throw new TypeError('Seperator width needs to be number!')

        this.data.seperator.color = color;
        this.data.seperator.width = width;
        return this;
    }

    /**
     * 
     * @param {Number} value User's wallet balance
     * @param {String} textColor Text Color
     * @param {String} valueColor Value Color
     */
    setRegular(value = 0, textColor = '#ACAEB2', valueColor = '#FFFFFF') {
        if (typeof value !== 'number') throw new TypeError('regular value needs to be number!')
        if (typeof textColor !== 'string') throw new TypeError('regular text color needs to be string!')
        if (typeof valueColor !== 'string') throw new TypeError('regular value color needs to be string!')

        this.data.regular.value = value;
        this.data.regular.text_color = textColor
        this.data.regular.value_color = valueColor;
        return this;
    }

    /**
     * 
     * @param {Number} value User's leaderboard fake
     * @param {String} textColor Text Color
     * @param {String} valueColor Value Color
     */
    setFake(value = 0, textColor = '#ACAEB2', valueColor = '#FFFFFF') {
        if (typeof value !== 'number') throw new TypeError('fake value needs to be number!')
        if (typeof textColor !== 'string') throw new TypeError('fake text color needs to be string!')
        if (typeof valueColor !== 'string') throw new TypeError('fake value color needs to be string!')

        this.data.fake.value = value;
        this.data.fake.text_color = textColor
        this.data.fake.value_color = valueColor;
        return this;
    }

    /**
     * 
     * @param {Number} value User's bank balance
     * @param {String} textColor Text Color
     * @param {String} valueColor Value Color
     */
    setLeave(value = 0, textColor = '#ACAEB2', valueColor = '#FFFFFF') {
        if (typeof value !== 'number') throw new TypeError('Leave value needs to be number!')
        if (typeof textColor !== 'string') throw new TypeError('Leave text color needs to be string!')
        if (typeof valueColor !== 'string') throw new TypeError('Leave value color needs to be string!')

        this.data.leave.value = value;
        this.data.leave.text_color = textColor
        this.data.leave.value_color = valueColor;
        return this;
    }

    /**
     * 
     * @param {String} currency Default: $
     */
    setCurrency(currency = '$') {
        if (typeof currency === 'string') throw new TypeError('Currency needs to be string!')

        this.data.currency = currency
        return this;
    }

    async build() {
        if (!this.data.user.username) throw new TypeError('Missing Username!')
        if (!this.data.user.profile) throw new TypeError('Missing Profile')
        Canvas.registerFont(`${__dirname}/../Fonts/Montserrat-Bold.ttf`, { family: 'Montserrat-Bold' })
        Canvas.registerFont(`${__dirname}/../Fonts/Montserrat-SemiBold.ttf`, { family: 'Montserrat-SemiBold' })
        Canvas.registerFont(`${__dirname}/../Fonts/Montserrat-Medium.ttf`, { family: 'Montserrat-Medium' })

        const canvas = Canvas.createCanvas(750, 900);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = this.data.background;
        ctx.fillRect(0, 0, 750, 900);
        
        let cover = null;
        if (this.data.cover.type === 'image') cover = await Canvas.loadImage(this.data.cover.value)
        
        if (!!cover) {
            ctx.drawImage(cover, 0, 0, 750, 298)
        } else {
            ctx.fillStyle = this.data.cover.value;
            ctx.fillRect(0, 0, 750, 298)
        }

        ctx.fillStyle = this.data.background;
        ctx.beginPath()
        ctx.arc(375, 298, 155, 0, Math.PI * 2, true)
        ctx.fill()

        ctx.textAlign = 'center'

        if (!!this.data.user.discriminatorPlace) {
            ctx.fillStyle = this.data.user.usernameColor
            ctx.font = '65px Montserrat-Bold'
            ctx.fillText(this.data.user.username, 375, 513, 700)
            ctx.fillStyle = this.data.user.discriminatorColor
            ctx.font = '55px Montserrat-Bold'
            ctx.fillText('#' + this.data.user.discriminator, 375, 577, 700)
        } else {
            ctx.fillStyle = this.data.user.usernameColor
            ctx.font = '65px Montserrat-Bold'
            ctx.fillText(this.data.user.username, 375, 583, 700)
        }
        ctx.font = '50px Montserrat-SemiBold'
        ctx.fillStyle = this.data.regular.text_color
        ctx.fillText('Regular', 153, 717)
        ctx.fillStyle = this.data.fake.text_color
        ctx.fillText('Fake', 375, 717)
        ctx.fillStyle = this.data.leave.text_color
        ctx.fillText('Leave', 599, 717)

        
        ctx.font = '41px Montserrat-Medium'
        ctx.fillStyle = this.data.regular.value_color
        ctx.fillText(this.data.currency + CurrencyFormat(this.data.wallet.value), 153, 782)
        ctx.fillStyle = this.data.fake.value_color
        ctx.fillText(CurrencyFormat(this.data.rank.value), 375, 782)
        ctx.fillStyle = this.data.leave.value_color
        ctx.fillText(this.data.currency + CurrencyFormat(this.data.bank.value), 599, 782)

        ctx.fillStyle= this.data.seperator.color
        ctx.fillRect(50, 648, 650, this.data.seperator.width)
        ctx.fillRect(255, 681, this.data.seperator.width, 140)
        ctx.fillRect(496, 681, this.data.seperator.width, 140)

        ctx.beginPath();
        ctx.arc(375, 298, 145, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(this.data.user.profile)
        ctx.drawImage(avatar, 220, 150, 300, 300)

        return canvas.toBuffer();
    }
}

module.exports = Currency
