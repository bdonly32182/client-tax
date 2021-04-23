function Percent (year,percent){
    let lastIndex = parseInt(year/3);
    for (let index = 1; index < lastIndex; index++) {
        percent += 0.3
        
      };
    return percent.toFixed(2);
  };
function Seperate(price=0,type="",discount=0,year=0,absoluteEmpty=false){
    let rate = [];
    let date =new Date()
    let nowYear = date.getFullYear() + 543 ;//convert to พ.ศ.
        if(type === "เกษตร"){
        price > 75000000
        ? rate.push({ price: 75000000 - discount, percent: 0.01/100 })
        : rate.push({ price: price - discount >0?price - discount:0, percent: 0.01/100});
  
        price - 75000000 >= 25000000
            ? rate.push({ price: 25000000, percent: 0.03 /100})
            : price -75000000> 0 &&
            rate.push({ price: price - 75000000, percent: 0.3/100 });
  
        price - 100000000 >= 400000000
            ? rate.push({ price: 400000000, percent: 0.05 /100})
            : price -100000000 > 0 &&
            rate.push({ price: price - 100000000, percent: 0.5 /100});
  
        price - 500000000 >= 500000000
            ? rate.push({ price: 500000000, percent: 0.07/100 })
            : price - 500000000 >0 &&
            rate.push({ price: price  - 500000000, percent: 0.7 /100});
        price-1000000000>0&&rate.push({price:price-1000000000,percent:0.1/100})
        }
        if (type === "อยู่อาศัย") {
        price >=50000000&& price >=50000000? rate.push({ price: 50000000-discount , percent: 0.02 /100})
              : rate.push({price: price - discount <= 0 ? 0 : price - discount,
                  percent: 0.02/100
                })
           price - 50000000>=25000000?rate.push({price:25000000,percent:0.03/100})
          : price -50000000>0&&
          rate.push({price:price - 50000000,percent:0.03/100})
  
          price - 75000000>=25000000?rate.push({price:25000000,percent:0.05/100})
          : price -75000000> 0&&
          rate.push({price:price - 75000000,percent:0.05/100})
  
          price-100000000>=1&&rate.push({price:price -100000000,percent:0.1/100})
  
        }
        if(type === "อื่นๆ"){
        price >=50000000&& price >=50000000? rate.push({ price: 50000000-discount , percent: 0.3/100 })
                : rate.push({price: price - discount <= 0 ? 0 : price - discount,
                    percent: 0.3/100
                  })
                  price - 50000000>=150000000?rate.push({price:150000000,percent:0.4/100})
                  :
                  price-50000000>0&&
                  rate.push({price:price-50000000,percent:0.4/100})
            
                  price -200000000>=800000000?rate.push({price:800000000,percent:0.5/100})
                  :
                  price -200000000>0&&
                  rate.push({price:price -200000000,percent:0.5/100})
            
                  price - 1000000000 >= 4000000000?rate.push({price:4000000000,percent:0.6/100})
                  : 
                  price-1000000000>0&&
                  rate.push({price:price-1000000000,percent:0.6/100})
            
                  price - 5000000000>0&&rate.push({price:price -5000000000,percent:0.7/100})
        }
        if(type === "ว่างเปล่า"){
          
        price >=50000000&& price >=50000000?
           rate.push({ price: 50000000-discount , 
          percent:absoluteEmpty?0.3/100:  nowYear-year>=27?3.0:Percent( nowYear - year,0.3/100) })
        : rate.push({price: price - discount <= 0 ? 0 : price - discount,
            percent: absoluteEmpty?0.3/100: nowYear - year>=27?3.0:Percent(nowYear-year,0.3/100)
          })
          price - 50000000>=150000000?rate.push({price:150000000,
            percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0:Percent(nowYear-year,0.4/100)})
          :
          price-50000000>0&&
          rate.push({price:price-50000000,
            percent:absoluteEmpty?0.4/100:nowYear - year>=27?3.0:Percent(nowYear-year,0.4/100)})
    
          price -200000000>=800000000?rate.push({price:800000000,
            percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0:Percent(nowYear-year,0.5/100)})
          :
          price -200000000>0&&
          rate.push({price:price -200000000,
            percent:absoluteEmpty?0.5/100:nowYear - year>=27?3.0:Percent(nowYear-year,0.5/100)})
    
          price - 1000000000 >= 4000000000?rate.push({price:4000000000,
            percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0:Percent(nowYear-year,0.6/100)})
          : 
          price-1000000000>0&&
          rate.push({price:price-1000000000,
            percent:absoluteEmpty?0.6/100:nowYear - year>=24?3.0:Percent(nowYear-year,0.6/100)})
    
          price - 5000000000>0&&rate.push({price:price -5000000000,
            percent:absoluteEmpty?0.7/100:nowYear - year>=24?3.0:Percent(nowYear-year,0.7/100)})
        }
     return rate
     };
export default Seperate
