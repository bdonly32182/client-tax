 export const LastDayInMoth =(month )=>{
    let Lastindex = month[month.length - 1];
    if(Lastindex === "น" ) return 30;
    if(Lastindex === "ม") return 31;
    if(Lastindex === "์") return 28
  }
 export  const BriefBills = (FinishDate,DateWarnning,DateAdd,Percent=true,totalPrice,DayPay) => {
    //daypag === วันขอชำระ ใช้กรณีแรก
    //FinishDate == ชำระภายในวันที่
    //DateWarnning === วันที่แจ้งเตือน
    //Percent === ปรับสูงสุด สี่สิบเปอร์เ
    //totalPrice ราคาที่ต้องชำระตาม ภดส.๖
    // const day = LastDayInMoth(DateAdd);
    // case 10%
    let monthFinish = FinishDate?.getMonth();
    let dateDayPay = DayPay?.getDate();
    let monthDayPay = DayPay?.getMonth();
    let monthDateAdd = DateAdd?.getMonth();
    let dateWarning = DateWarnning?.getDate();
    //แจ้งขอชำระหลังได้รับใบแจ้งเตือน
    if(monthFinish < monthDayPay && dateDayPay <= 10){
      return {
        interestString:Percent?"40":"10",
        interestTotal:Percent?totalPrice * 0.4:totalPrice * 0.1,
        interestAdd : totalPrice * ((monthDateAdd - monthFinish) / 100),
        amountMonth :monthDateAdd - monthFinish
      }
    }
       if (dateDayPay - dateWarning <=15) {
      return {
        interestString:Percent?"40":"20",
        interestTotal:Percent?totalPrice * 0.4:totalPrice * 0.2,
        interestAdd : totalPrice * ((monthDateAdd - monthFinish) / 100),
        amountMonth :monthDateAdd - monthFinish
      }
    }
   
  
  }

  export function WarningDoc() {
    const  FinishDate = new Date('August 31, 1975 23:15:30');
    const DateWarnning = new Date('September 12, 1975 23:15:30');
    const DateAdd = new Date('Sep 30, 1975 20:15:00');
    const Percent = false;
    const totalPrice = 948.86;
    const DayPay = new Date('September 20, 1975 23:15:30');
    let briefBills = BriefBills(FinishDate,DateWarnning,DateAdd,Percent,totalPrice,DateWarnning)
    //warningn use DateWarnning but Pay use DayPay at last params
    console.log(briefBills);
    
    return (
      <div >
   
        <p>{`กำหนดชำระภายในวันที่ ${FinishDate.toDateString()}`}</p>
        <p>{`DateWarnning : ${DateWarnning.toDateString()}`}</p>
        <p>{`DateAdd : ${DateAdd.toDateString()}`}</p>
        <p>{`Percent : ${Percent}`}</p>
        <p>Brief</p>
        <p>{`totalPrice : ${totalPrice}`}</p>
        <p>{`interestString : ${briefBills.interestString}`} <b>{briefBills.interestTotal}</b></p>
        <p>{`interestADd : ${briefBills.interestAdd}`}</p>
        <p>{`Brief Total = ${totalPrice + briefBills.interestTotal + briefBills.interestAdd}`}</p>
      </div>
    );
  }