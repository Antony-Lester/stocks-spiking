export default function calculateSTOCH(close) {
    let lowestLow = Number.MAX_VALUE;
    let highestHigh = Number.MIN_VALUE;
  
    // Find the lowest low and the highest high in the period
    for (let i = 0; i < close.length; i++) {
      lowestLow = Math.min(lowestLow, close[i]);
      highestHigh = Math.max(highestHigh, close[i]);
    }
    // Calculate the STOCH
  
  

  const result = ((close[close.length - 1] - lowestLow) / (highestHigh - lowestLow))
  const resultRounded = Math.round(result * 100) / 100
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
  }