export default function plusDI(high, low, close, period) {
    let sumPositiveDM = 0;
    let sumTrueRange = 0;
    for (let i = 1; i < period; i++) {
      let positiveDM = high[i] - high[i - 1];
      if (positiveDM < 0) {
        positiveDM = 0;
      }
      sumPositiveDM += positiveDM;
  
      let trueRange = Math.max(high[i] - low[i], Math.abs(high[i] - close[i - 1]), Math.abs(low[i] - close[i - 1]));
      sumTrueRange += trueRange;
    }
  
  const result = (sumPositiveDM / sumTrueRange)
  const resultRounded = Math.round(result * 100) / 100
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
}