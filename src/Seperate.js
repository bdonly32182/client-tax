
function Seperate(price=0,type="",discount=0){
    let rate = [];
    if(type === "เกษตร"){
        price > 75000000
        ? rate.push({ price: 75000000 - discount, percent: 0.01 })
        : rate.push({ price: price - discount >0?price - discount:0, percent: 0.01});

        price - 75000000 >= 25000000
            ? rate.push({ price: 25000000, percent: 0.03 })
            : price -75000000> 0 &&
            rate.push({ price: price - 75000000, percent: 0.3 });

        price - 100000000 >= 500000000
            ? rate.push({ price: 500000000, percent: 0.05 })
            : price -100000000 > 0 &&
            rate.push({ price: price - 100000000, percent: 0.5 });

        price - 600000000 >= 1000000000
            ? rate.push({ price: 1000000000, percent: 0.07 })
            : price - 600000000 >0 &&
            rate.push({ price: price  - 600000000, percent: 0.7 });
        price-1600000000>0&&rate.push({price:price-1600000000,percent:0.1})
      }
    if (type === "อยู่อาศัย") {
        price >=50000000&& price >=50000000? rate.push({ price: 50000000-discount , percent: 0.02 })
              : rate.push({price: price - discount <= 0 ? 0 : price - discount,
                  percent: 0.02
                })
           price - 50000000>=25000000?rate.push({price:25000000,percent:0.03})
          : price -50000000>0&&
          rate.push({price:price - 50000000,percent:0.03})

          price - 75000000>=25000000?rate.push({price:25000000,percent:0.05})
          : price -75000000> 0&&
          rate.push({price:price - 75000000,percent:0.05})

          price-100000000>=1&&rate.push({price:price -100000000,percent:0.1})
  
      }
    if(type === "อื่นๆ"||type === "ว่างเปล่า"){
        price >=50000000&& price >=50000000? rate.push({ price: 50000000-discount , percent: 0.3 })
                : rate.push({price: price - discount <= 0 ? 0 : price - discount,
                    percent: 0.3
                  })
                  price - 50000000>=150000000?rate.push({price:150000000,percent:0.4})
                  :
                  price-50000000>0&&
                  rate.push({price:price-50000000,percent:0.4})
            
                  price -200000000>=800000000?rate.push({price:800000000,percent:0.5})
                  :
                  price -200000000>0&&
                  rate.push({price:price -200000000,percent:0.5})
            
                  price - 1250000000 >= 4000000000?rate.push({price:5000000000,percent:0.6})
                  : 
                  price-1250000000>0&&
                  rate.push({price:price-1250000000,percent:0.6})
            
                  price - 5000000000>=6250000000?rate.push({price:price -6250000000,percent:0.7})
                  :price - 6250000000>0&&rate.push({price:price - 6250000000,percent:0.7})         
        // price - 100000000>=150000000?rate.push({price:200000000,percent:0.4})
        // :
        // price-50000000>0&&
        // rate.push({price:price-50000000,percent:0.4})
  
        // price -400000000>=800000000?rate.push({price:1000000000,percent:0.5})
        // :
        // price -250000000>0&&
        // rate.push({price:price -250000000,percent:0.05})
  
        // price - 2000000000 >= 4000000000?rate.push({price:5000000000,percent:0.6})
        // : 
        // price-1250000000>0&&
        // rate.push({price:price-1250000000,percent:0.6})
  
        // price - 5000000000>=6250000000?rate.push({price:price -6250000000,percent:0.7})
        // :price - 6250000000>0&&rate.push({price:price - 6250000000,percent:0.7})
      }
     return rate
     };
    


export default Seperate
