
const verifyEmailTemplate = ({name,url})=>{
    return`

    <p>Dear ${name},</p>
    <p> thank you for registering on this ecommerce website</p>

    <a href=${url} style="color:white;background:blue;margin-top:10px">
        Verify Email
    </a>
    `
}

export default verifyEmailTemplate