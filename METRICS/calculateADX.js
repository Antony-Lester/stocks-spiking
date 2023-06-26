import  plusDI  from "./calculateDI+.js";
import  minusDI  from "./calculateDI-.js";

export default function ADX(high, low, close, period) {
    let plusDIholder = plusDI(high, low, close, period)*100;
    let minusDIholder = minusDI(high, low, close, period)*100;
  let ADX = (Math.abs(plusDIholder - minusDIholder) / (plusDIholder + minusDIholder))
  
  const result = ADX
  const resultRounded = Math.round(result * 100) / 100
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
  }