const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default class MEmail {
    to: string
    from: string
    subject: string
    htmlContent: string
    constructor(
        to: string,
        from: string,
        subject: string,
        htmlContent: string
    ) {
        this.to = to
        this.from = from
        this.subject = subject
        this.htmlContent = htmlContent
    }

    send() {
        const msg = {
            to: this.to,
            from: this.from,
            subject: this.subject,
            html: this.htmlContent
        }
        sgMail.send(msg)
    }
}

export class ResetPasswordMail extends MEmail {
    constructor(
        to: string,
        code: string
    ) {
        const html = `Your OTP code ${code} expired in 5 minutes.`
        super(to, "nguyentruongky33@gmail.com", "Reset your password", html)
    }
}

