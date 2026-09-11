import crypto from 'crypto';
export function generateSession(){
    return crypto.randomBytes(32).toString('hex');
}
export function hashedSession(sessionId){
    return crypto.createHash('sha256').update(sessionId).digest('hex');
}