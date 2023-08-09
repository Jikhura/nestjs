<h3 align="center"> Test NestJS  Mongo</h3>

## Stack
- NestJS [Link to Doc](https://docs.nestjs.com)
- MongoDB [Link to Doc](https://www.mongodb.com/docs/)
- Docker (Optional) [Link to Doc](https://docs.docker.com)
- Golang (Optional) [Link to Doc](https://go.dev/doc/)
- Microservices (Optional) [Link to Doc](https://microservices.io/patterns/index.html)


## API


1. ออกแบบระบบร้านขายหนังสือ โดยมี Feature ดังนี้

    [ ] เพิ่ม/ลบ/แก้ไขข้อมูลสมาชิก

    [ ] แสดงรายการสมาชิก (สามารถ filter จาก ชื่อผู้ใช้งาน, ชื่อ-นามสกุล)

    [ ] สามารถระงับการใช้งานของสมาชิกได้

    [ ] รายงานสมาชิกใหม่

    [ ] สมาชิกสามารถ login ได้ด้วย ชื่อผู้ใช้งาน (login ผิดพลาด 3 ครั้งจะถูกระงับ 30 วินาที)

    [ ] สมาชิกสามารถซื้อหนังสือได้

    [ ] ประวัติการซื้อหนังสือของสมาชิก

    [ ] รายงานการขายหนังสือที่ถูกขายในแต่หมวดหมู่, หมวดหมู่ละกี่เล่ม มีเรื่องออะไรบ้าง ราคาเท่าไหร่

    [ ] เพิ่ม/ลบ/แก้ไขข้อมูลหนังสือ (default: จำนวนหนังสือที่เพิ่มใหม่ 10 เล่ม)

    [ ] แสดงรายการหนังสือ 
        (สามารถ filter จาก ชื่อหนังสือ, เรียงลำดับจากจำนวนหนังสือ, ราคา)

    [ ] สมาชิกที่ถูกระงับจะไม่สามารถซื้อหนังสือ
