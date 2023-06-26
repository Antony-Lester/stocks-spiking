
export default function minusDI(high, low, close, period) {
    let sumNegativeDM = 0;
    let sumTrueRange = 0;
    for (let i = 1; i < period; i++) {
      let negativeDM = low[i - 1] - low[i];
      if (negativeDM < 0) {
        negativeDM = 0;
      }
      sumNegativeDM += negativeDM;
  
      let trueRange = Math.max(high[i] - low[i], Math.abs(high[i] - close[i - 1]), Math.abs(low[i] - close[i - 1]));
      sumTrueRange += trueRange;
    }
  
  
  
  const result = (sumNegativeDM / sumTrueRange)
  const resultRounded = Math.round(result * 100) / 100
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
  }