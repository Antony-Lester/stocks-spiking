export default function calculateRSI(close) {
    // Calculate the average of the upward price changes
    let avgUpwardChange = 0;
    for (let i = 1; i < close.length; i++) {
      avgUpwardChange += Math.max(0, close[i] - close[i - 1]);
    }
    avgUpwardChange /= close.length;
  
    // Calculate the average of the downward price changes
    let avgDownwardChange = 0;
    for (let i = 1; i < close.length; i++) {
      avgDownwardChange += Math.max(0, close[i - 1] - close[i]);
    }
    avgDownwardChange /= close.length;
  
    // Calculate the RSI
    const rsi = 100 - (100 / (1 + (avgUpwardChange / avgDownwardChange)))
  
  const result = rsi
  const resultRounded = Math.round(result * 100) / 10000
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
  }