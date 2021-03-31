export const readNumber =(number)=>{
    let numberThai = ["ศูนย์","หนึ่ง","สอง","สาม","สี่","ห้า","หก","เจ็ด","แปด","เก้า"];
    let position = ["หน่วย","สิบ","ร้อย","พัน","หมื่น","แสน","ล้าน"];
    let read = ""
    let seperateSatang = number.split('.')
    for(let i = 0 ; i< seperateSatang[0].length;i++){
      if (seperateSatang[0][i] !== "0") {
          read += numberThai[+seperateSatang[0][i]];
         read += position[seperateSatang[0].length -(i+1)] === undefined?position[seperateSatang[0].length -(i+7)]:position[seperateSatang[0].length -(i+1)]
         
      }  
    }
    read += "บาท"
    for(let i = 0 ; i< seperateSatang[1].length;i++){
      if (seperateSatang[1][i] !== "0") {
          read += numberThai[+seperateSatang[1][i]];
         read += position[seperateSatang[1].length -(i+1)] === undefined?position[seperateSatang[1].length -(i+7)]:position[seperateSatang[1].length -(i+1)] ; 
      }
      
    }
  
    read += seperateSatang[1][0]==="0"?"สตางค์":seperateSatang[1][1]?"สตางค์":"สิบสตางค์"
    read = read.replace("หนึ่งสิบ","สิบ");
    read = read.replace("ศูนย์หน่วย","");
    read = read.replace("สองสิบ","ยี่สิบ");
    read = read.replace("หนึ่งหน่วย","เอ็ด");
    read = read.replace("หน่วย","");
    read = read.replace("สิบหนึ่งล้าน","สิบเอ็ดล้าน");
    read = read.replace("เอ็ดสิบสตางค์","สิบสตางค์");
    //edit
    read = read.replace("สิบสิบสตางค์","สิบเอ็ดสตางค์");
    read = read.replace("หน่วยสิบสตางค์","สิบสตางค์");
    read = read.replace("หน่วยสตางค์","สตางค์");
    read = read.replace("เอ็ดสตางค์","หนึ่งสตางค์");
    read = read.replace("สิบหนึ่ง","สิบเอ็ด");
    read = read.replace("สองสิบเอ็ดสตางค์","ยี่สิบเอ็ดสตางค์");
    read = read.replace("หนึ่งสิบเอ็ดสตางค์","สิบเอ็ดสตางค์");
    read = read.replace("บาทสตางค์","ศูนย์บาท");
    if (read ==="เอ็ด") {
       read = "หนึ่ง"
    }
    return read
  }
  