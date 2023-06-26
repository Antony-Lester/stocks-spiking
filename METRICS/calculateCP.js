
export default function (high, low, close) { 
    const getPercentageChange = (x, y) => {
        
        
        
        const result = ((x - y) / x)
  const resultRounded = Math.round(result * 100) / 1000
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
    }
    const diff = high - low;
    const R3 = getPercentageChange((diff *1.1) / 4 + close, close)
    const R2 = getPercentageChange((diff * 1.1) / 6 + close, close)
    const R1 = getPercentageChange((diff * 1.1) / 12 + close, close)
    const S1 = Math.abs(getPercentageChange(close - (diff * 1.1 / 12), close))
    const S2 = Math.abs(getPercentageChange(close - (diff *1.1 /6), close))
    const S3 = Math.abs(getPercentageChange(close - (diff * 1.1 / 4), close))
    return {S3, S2, S1, R1, R2, R3}
}

