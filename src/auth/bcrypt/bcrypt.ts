import * as bcrypt from 'bcrypt';

export function encodePassword(password: string) {
  try {
    // ตรวจสอบว่า password ไม่ใช่ undefined และไม่เป็นค่าว่าง
    if (!password) {
      throw new Error('Password is required.');
    }

    const salt = bcrypt.genSaltSync();
    console.log(password, salt);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    console.error(
      'Error occurred while generating salt or hashing password:',
      error,
    );
    throw error;
  }
}

export function compearPassword(password: string, hashpassword: string) {
  return bcrypt.compareSync(password, hashpassword);
}
