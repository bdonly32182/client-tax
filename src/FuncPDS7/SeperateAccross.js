function Percent (year,percent){
  let lastIndex = parseInt(year/3);
  for (let index = 1; index < lastIndex; index++) {
      percent += 0.003 // length = 5 is percent / 100
     
    };
    
  return percent.toFixed(5);
};
function PercentShow (year,percent){
let lastIndex = parseInt(year/3);
for (let index = 1; index < lastIndex; index++) {
    percent += 0.3
   
  };
  
return percent.toFixed(2);
}
export const SeperateAccross = (PriceOriginal = 0,type ="อื่นๆ" ,discount=0, PriceArray = [],year=0,absoluteEmpty=false) => {
    let rate = [];
    let date =new Date()
    let nowYear = date.getFullYear() + 543 ;//convert to พ.ศ.
    let LastPrice = PriceArray[PriceArray?.length -1]
    let LevelRate = PriceArray?.length    
   
        if (type === "อยู่อาศัย") {
          switch (LevelRate) {
            
            case 1:
              PriceOriginal + LastPrice?.price >=50000000&& PriceOriginal >=50000000? 
                rate.push({ PriceOriginal: 50000000-discount - LastPrice?.price, percent: 0.02 /100 ,percentShow:0.02})
              : 
                rate.push({PriceOriginal: PriceOriginal + LastPrice?.price - discount <= 0 ? 0 : PriceOriginal  - discount,
                  percent: 0.02/100 ,percentShow:0.02})

              PriceOriginal  - 50000000>=25000000?
                rate.push({PriceOriginal:25000000,percent:0.03/100 ,percentShow:0.03})
              : 
              PriceOriginal  -50000000>=0&&
                rate.push({PriceOriginal:PriceOriginal - 50000000,percent:0.03/100 ,percentShow:0.03})

              PriceOriginal  - 75000000>=25000000?
              rate.push({PriceOriginal:25000000,percent:0.05/100 ,percentShow:0.05})
              : PriceOriginal -75000000> 0&&
              rate.push({PriceOriginal:PriceOriginal - 75000000,percent:0.05/100 ,percentShow:0.05})
      
              PriceOriginal-100000000>=1&&rate.push({PriceOriginal:PriceOriginal -100000000,percent:0.1/100 ,percentShow:0.10})
              break;
            case 2:
              PriceOriginal + LastPrice?.price  - 50000000>=25000000?
              rate.push({PriceOriginal:25000000 - LastPrice?.price,percent:0.03/100 ,percentShow:0.03})
              : 
              PriceOriginal + LastPrice?.price  -50000000>0?
                  rate.push({PriceOriginal:25000000 - LastPrice?.price,percent:0.03/100 ,percentShow:0.03})
                  :
                  rate.push({PriceOriginal:PriceOriginal,percent:0.03/100 ,percentShow:0.03})

              PriceOriginal + 50000000 - 75000000>=25000000?
              rate.push({PriceOriginal:25000000,percent:0.05/100 ,percentShow:0.05})
              : PriceOriginal + 50000000 -75000000> 0&&
              rate.push({PriceOriginal:PriceOriginal+ LastPrice?.price+ + 50000000 - 75000000,percent:0.05/100 ,percentShow:0.05})
      
              PriceOriginal + 50000000 -100000000>=1&&rate.push({PriceOriginal:PriceOriginal+ LastPrice?.price+ 50000000 -100000000,percent:0.1/100 ,percentShow:0.10})
              break;
            case 3:
              PriceOriginal + LastPrice?.price  >=25000000?
                  rate.push({PriceOriginal:25000000  - LastPrice?.price,percent:0.05/100 ,percentShow:0.05})
                : 
                  rate.push({PriceOriginal:PriceOriginal ,percent:0.05/100 ,percentShow:0.05})

              PriceOriginal + 75000000 -100000000>=1&&rate.push({PriceOriginal:PriceOriginal -25000000,percent:0.1/100 ,percentShow:0.10})
              break;
            case 4:
              rate.push({PriceOriginal:PriceOriginal,percent:0.1/100 ,percentShow:0.10})

              break;
           
            default:
              break;
          }
 
  
        }
        if(type === "อื่นๆ"){
          switch (LevelRate) {
            case 1:
              PriceOriginal + LastPrice?.price >=50000000&& PriceOriginal + LastPrice?.price >=50000000?
                          rate.push({ PriceOriginal: 50000000-discount - LastPrice?.price , percent: 0.3/100 ,percentShow:0.30 })
                          : 
                          rate.push({PriceOriginal: PriceOriginal + LastPrice?.price - discount <= 0 ? 0 : PriceOriginal /*+ LastPrice?.price*/ - discount,
                                    percent: 0.3/100 ,percentShow:0.30});
 
              PriceOriginal + LastPrice?.price - 50000000>=150000000?
                          rate.push({PriceOriginal:150000000,percent:0.4/100 ,percentShow:0.40})
                        :

                         PriceOriginal + LastPrice?.price-50000000>0?
                          rate.push({PriceOriginal:PriceOriginal+ LastPrice?.price-50000000,percent:0.4/100 ,percentShow:0.40})
                          :rate.push({PriceOriginal:PriceOriginal - (50000000 + LastPrice?.price) ,percent:0.4/100 ,percentShow:0.40})
                      
              PriceOriginal + LastPrice?.price -200000000>=800000000?
                          rate.push({PriceOriginal:800000000,percent:0.5/100 ,percentShow:0.50})
                        :
                        PriceOriginal -200000000>0&&
                        rate.push({PriceOriginal:PriceOriginal -200000000,percent:0.5/100 ,percentShow:0.50})
                  
               PriceOriginal + LastPrice?.price - 1000000000 >= 4000000000?
                          rate.push({PriceOriginal:4000000000,percent:0.6/100 ,percentShow:0.60})
                        : 
                        PriceOriginal-1000000000>0&&
                        rate.push({PriceOriginal:PriceOriginal-1000000000,percent:0.6/100 ,percentShow:0.60})
                  
               PriceOriginal + LastPrice?.price - 5000000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000,percent:0.7/100 ,percentShow:0.70})
              break;
            case 2 :
                    PriceOriginal + LastPrice?.price - 50000000>=150000000?
                    //ถ้าเกิน 150ล้าน ให้ลบกับราคาเก่า
                    rate.push({PriceOriginal: 150000000 - LastPrice?.price,percent:0.4/100 ,percentShow:0.40})
                  :
                  PriceOriginal + LastPrice?.price> 150000000?
                        PriceOriginal + LastPrice?.price-50000000 +50000000>0&&
                        rate.push({PriceOriginal:150000000- LastPrice?.price ,percent:0.4/100 ,percentShow:0.40})
                    :   
                        rate.push({PriceOriginal:PriceOriginal,percent:0.4/100 ,percentShow:0.40})
                
                  PriceOriginal + LastPrice?.price -200000000  +50000000>=800000000?
                              rate.push({PriceOriginal:800000000,percent:0.5/100 ,percentShow:0.50})
                            :
                            PriceOriginal + LastPrice?.price -200000000  +50000000>0&&
                            rate.push({PriceOriginal: PriceOriginal  -  200000000 + LastPrice?.price +50000000 ,percent:0.5/100 ,percentShow:0.50})
                      //+50 ล้านเพราะมันข้ามขั้น 1 มาต้องเอาขั้นหนึ่งมาบวกด้วย
                  PriceOriginal + LastPrice?.price - 1000000000 +50000000>= 4000000000?
                              rate.push({PriceOriginal:4000000000,percent:0.6/100 ,percentShow:0.60})
                            : 
                            PriceOriginal + LastPrice?.price - 1000000000 +50000000>0&&
                            rate.push({PriceOriginal:PriceOriginal-1000000000 + LastPrice?.price +50000000 ,percent:0.6/100 ,percentShow:0.60})
                      
                  PriceOriginal + LastPrice?.price - 5000000000 +50000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000 + LastPrice?.price +50000000 ,percent:0.7/100 ,percentShow:0.70})
              break;
            case 3:
              PriceOriginal + LastPrice?.price -200000000  +200000000>=800000000?
                      rate.push({PriceOriginal:800000000 - LastPrice?.price,percent:0.5/100 ,percentShow:0.50})
                    :
                    //ราคาดั้งเดิม บวก ราคาเก่า มากกว่ามั้ย ถ้ามากกว่าให้เอามาบวกกัน ถ้าไม่ก็ให้ใส่ราคาเดิม
                    PriceOriginal + LastPrice?.price> 800000000? PriceOriginal + LastPrice?.price -200000000  +200000000>0&&
                        rate.push({PriceOriginal: PriceOriginal  -  200000000 + LastPrice?.price +200000000 ,percent:0.5/100 ,percentShow:0.50})//bug
                        :
                        rate.push({PriceOriginal: PriceOriginal ,percent:0.5/100 ,percentShow:0.50})

              PriceOriginal + LastPrice?.price - 1000000000 +200000000>= 4000000000?
                          rate.push({PriceOriginal:4000000000,percent:0.6/100 ,percentShow:0.60})
                        : 
                        PriceOriginal + LastPrice?.price - 1000000000 +200000000>0&&
                        rate.push({PriceOriginal:PriceOriginal-1000000000 + LastPrice?.price +200000000 ,percent:0.6/100 ,percentShow:0.60})
                  
              PriceOriginal + LastPrice?.price - 5000000000 +200000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000 + LastPrice?.price +200000000 ,percent:0.7/100 ,percentShow:0.70})
              break
            case 4:
                    PriceOriginal + LastPrice?.price - 1000000000 >= 4000000000?
                        rate.push({PriceOriginal:4000000000 - LastPrice?.price,percent:0.6/100 ,percentShow:0.60})
                      : 
                      LastPrice?.price >4000000000? PriceOriginal-1000000000>0&&
                        rate.push({PriceOriginal:PriceOriginal-1000000000,percent:0.6/100 ,percentShow:0.60})
                        :
                        rate.push({PriceOriginal:PriceOriginal,percent:0.6/100 ,percentShow:0.60})
                
                    PriceOriginal + LastPrice?.price - 5000000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000 + LastPrice?.price + 1000000000,percent:0.7/100 ,percentShow:0.70})
                break;
            case 5 :
                    rate.push({PriceOriginal:PriceOriginal ,percent:0.7/100 ,percentShow:0.70})

                break;
            default:
              break;
          }
        }
        if(type === "ว่างเปล่า"){
          switch (LevelRate) {
            case 1:
              PriceOriginal + LastPrice?.price >=50000000&& PriceOriginal + LastPrice?.price >=50000000?
                          rate.push({ PriceOriginal: 50000000-discount - LastPrice?.price , 
                            percent:absoluteEmpty?0.3/100:  nowYear-year>=27?3.0/100:Percent( nowYear - year,0.3/100) ,
                            percentShow:absoluteEmpty?0.3:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.3) 
                          })
                          : 
                          rate.push({PriceOriginal: PriceOriginal + LastPrice?.price - discount <= 0 ? 0 : PriceOriginal /*+ LastPrice?.price*/ - discount,
                            percent:absoluteEmpty?0.3/100:  nowYear-year>=27?3.0/100:Percent( nowYear - year,0.3/100) ,
                            percentShow:absoluteEmpty?0.3:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.3) 
                            });
 
              PriceOriginal + LastPrice?.price - 50000000>=150000000?
                          rate.push({PriceOriginal:150000000,
                            percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.4/100) ,
                            percentShow:absoluteEmpty?0.4:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.4)
                          })
                        :

                         PriceOriginal + LastPrice?.price-50000000>0?
                          rate.push({PriceOriginal:PriceOriginal+ LastPrice?.price-50000000,
                            percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.4/100) ,
                            percentShow:absoluteEmpty?0.4:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.4)
                          })
                          :
                          rate.push({PriceOriginal:PriceOriginal - (50000000 + LastPrice?.price) ,
                            percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.4/100) ,
                            percentShow:absoluteEmpty?0.4:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.4)
                          })
                      
              PriceOriginal + LastPrice?.price -200000000>=800000000?
                          rate.push({PriceOriginal:800000000,
                                percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                                percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                          })
                        :
                        PriceOriginal -200000000>0&&
                        rate.push({PriceOriginal:PriceOriginal -200000000,
                                percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                                percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                        })
                  
               PriceOriginal + LastPrice?.price - 1000000000 >= 4000000000?
                          rate.push({PriceOriginal:4000000000,
                                  percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                                  percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6) 
                          })
                        : 
                        PriceOriginal-1000000000>0&&
                        rate.push({PriceOriginal:PriceOriginal-1000000000,
                          percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                          percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6) })
                  
               PriceOriginal + LastPrice?.price - 5000000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000,
                        percent:absoluteEmpty?0.7/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.7/100),
                        percentShow:absoluteEmpty?0.7:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.7) 
              })
              break;
            case 2 :
                    PriceOriginal + LastPrice?.price - 50000000>=150000000?
                    //ถ้าเกิน 150ล้าน ให้ลบกับราคาเก่า
                    rate.push({PriceOriginal: 150000000 - LastPrice?.price,
                      percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.4/100) ,
                      percentShow:absoluteEmpty?0.4:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.4)
                    })
                  :
                  PriceOriginal + LastPrice?.price> 150000000?
                        PriceOriginal + LastPrice?.price-50000000 +50000000>0&&
                        rate.push({PriceOriginal:150000000- LastPrice?.price ,
                          percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.4/100) ,
                          percentShow:absoluteEmpty?0.4:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.4)
                        })
                    :   
                        rate.push({PriceOriginal:PriceOriginal,
                          percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.4/100) ,
                          percentShow:absoluteEmpty?0.4:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.4)
                        })
                
                  PriceOriginal + LastPrice?.price -200000000  +50000000>=800000000?
                              rate.push({PriceOriginal:800000000,
                                percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                                percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                              })
                            :
                            PriceOriginal + LastPrice?.price -200000000  +50000000>0&&
                            rate.push({PriceOriginal: PriceOriginal  -  200000000 + LastPrice?.price +50000000 ,
                                percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                                percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                            })
                      //+50 ล้านเพราะมันข้ามขั้น 1 มาต้องเอาขั้นหนึ่งมาบวกด้วย
                  PriceOriginal + LastPrice?.price - 1000000000 +50000000>= 4000000000?
                              rate.push({PriceOriginal:4000000000,
                                percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                                percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                              })
                            : 
                            PriceOriginal + LastPrice?.price - 1000000000 +50000000>0&&
                            rate.push({PriceOriginal:PriceOriginal-1000000000 + LastPrice?.price +50000000 ,
                                percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                                percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                            })
                      
                  PriceOriginal + LastPrice?.price - 5000000000 +50000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000 + LastPrice?.price +50000000 ,
                            percent:absoluteEmpty?0.7/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.7/100),
                            percentShow:absoluteEmpty?0.7:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.7) 
                  })
              break;
            case 3:
              PriceOriginal + LastPrice?.price -200000000  +200000000>=800000000?
                      rate.push({PriceOriginal:800000000 - LastPrice?.price,
                        percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                        percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                      })
                    :
                    //ราคาดั้งเดิม บวก ราคาเก่า มากกว่ามั้ย ถ้ามากกว่าให้เอามาบวกกัน ถ้าไม่ก็ให้ใส่ราคาเดิม
                    PriceOriginal + LastPrice?.price> 800000000? PriceOriginal + LastPrice?.price -200000000  +200000000>0&&
                        rate.push({PriceOriginal: PriceOriginal  -  200000000 + LastPrice?.price +200000000 ,
                          percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                          percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                        })//bug
                        :
                        rate.push({PriceOriginal: PriceOriginal ,
                          percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0/100:Percent(nowYear-year,0.5/100) ,
                          percentShow:absoluteEmpty?0.5:nowYear - year>=27?3.0:PercentShow(nowYear-year,0.5)
                        })

              PriceOriginal + LastPrice?.price - 1000000000 +200000000>= 4000000000?
                          rate.push({PriceOriginal:4000000000,
                                percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                                percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                          })
                        : 
                        PriceOriginal + LastPrice?.price - 1000000000 +200000000>0&&
                        rate.push({PriceOriginal:PriceOriginal-1000000000 + LastPrice?.price +200000000 ,
                                percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                                percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                        })
                  
              PriceOriginal + LastPrice?.price - 5000000000 +200000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000 + LastPrice?.price +200000000 ,
                            percent:absoluteEmpty?0.7/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.7/100),
                            percentShow:absoluteEmpty?0.7:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.7) 
              })
              break
            case 4:
                    PriceOriginal + LastPrice?.price - 1000000000 >= 4000000000?
                        rate.push({PriceOriginal:4000000000 - LastPrice?.price,
                           percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                           percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                        })
                      : 
                      LastPrice?.price >4000000000? PriceOriginal-1000000000>0&&
                        rate.push({PriceOriginal:PriceOriginal-1000000000,
                          percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                          percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                        })
                        :
                        rate.push({PriceOriginal:PriceOriginal,
                            percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.6/100),
                            percentShow:absoluteEmpty?0.6:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.6)
                        })
                
                    PriceOriginal + LastPrice?.price - 5000000000>0&&rate.push({PriceOriginal:PriceOriginal -5000000000 + LastPrice?.price + 1000000000,
                            percent:absoluteEmpty?0.7/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.7/100),
                            percentShow:absoluteEmpty?0.7:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.7) 
                    })
                break;
            case 5 :
                    rate.push({PriceOriginal:PriceOriginal ,
                      percent:absoluteEmpty?0.7/100:nowYear - year>=24?3.0/100:Percent(nowYear-year,0.7/100),
                      percentShow:absoluteEmpty?0.7:nowYear - year>=24?3.0:PercentShow(nowYear-year,0.7) 
                    })

                break;
            default:
              break;
          }

        }
        return rate
}