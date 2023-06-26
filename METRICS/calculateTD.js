
export default function (high, low, close, open) {
    const getPercentageChange = (x, y) =>
    
    {
        const result = (x - y) / x
  const resultRounded = Math.round(result * 1000) / 2000
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
    }
    let x = 0
    if (close < open) {x = high + (2 * (low) + close)}
    if (close > open) {x = (2 * high) +  low + close}
    if (close === open) { x = high + low + (2 * close) }
    const R = getPercentageChange((x / 2) - low, close)
    const S = Math.abs(getPercentageChange((x / 2) - high, close))
    return { R, S }
    }