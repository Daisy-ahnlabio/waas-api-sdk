declare const sendVerificationCode: (email: string, lang?: string, template?: string) => Promise<void>;
export default sendVerificationCode;
