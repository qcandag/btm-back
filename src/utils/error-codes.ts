export const ErrorCodes: Record<string, {
    errorCode: number,
    message: string
}> = {
    // Auth
    USER_IS_NOT_EXISTS: {
        errorCode: 1000,
        message: 'User is not exists'
    },
    USER_ALREADY_EXISTS: {
        errorCode: 1001,
        message: 'User already exists with this phone num'
    },
    YOU_REACHED_DAILY_OTP_LIMIT: {
        errorCode: 1002,
        message: 'You reached daily otp limit'
    },
    OTP_IS_NOT_EXISTS: {
        errorCode: 1003,
        message: 'OTP is not exists'
    },
    OTP_IS_NOT_CORRECT: {
        errorCode: 1004,
        message: 'OTP is not correct'
    },
    USER_ALREADY_VERIFIED: {
        errorCode: 1005,
        message: 'User already verified'
    },
    // Contact
    YOU_CANT_SEND_SELF_REQUEST: {
        errorCode: 2000,
        message: 'You can not send request to yourself'
    },
    REQUEST_ALREADY_SENT: {
        errorCode: 2001,
        message: 'Request already sent'
    },
    REQUEST_NOT_FOUND: {
        errorCode: 2002,
        message: 'Request not found'
    },
    USER_ALREADY_YOUR_CONTACT: {
        errorCode: 2003,
        message: 'User already your contact'
    },
    USER_NOT_IN_YOUR_LIST: {
        errorCode: 2004,
        message: 'User not in your contact'
    },
    // Payment
    RECEIPT_IS_NOT_VALID: {
        errorCode: 3004,
        message: 'Receipt is not valid'
    },
    RECEIPT_ALREADY_EXISTS: {
        errorCode: 3005,
        message: 'Receipt already exists'
    },
    REQUIRED_FIELDS_ARE_NOT_FILLED: {
        errorCode: 4000,
        message: 'Required fields are not filled'
    },
    MAIL_IS_NOT_CORRECT: {
        errorCode: 5000,
        message: 'Mail is not correct'
    },
    REACHED_COMPANY_LIMIT: {
        errorCode: 6000,
        message: 'You already created 5 company'
    },
    COMPANY_IS_NOT_EXISTS: {
        errorCode: 6001,
        message: 'Company is not exists'
    },
    OCR_ERROR : {
        errorCode: 7000,
        message: 'OCR error'
    }
}