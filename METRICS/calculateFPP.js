
export default function (high, low, close) {
	const getPercentageChange = (x, y) => {
		
		const result = ((x - y) / x)
  const resultRounded = Math.round(result * 100) / 1000
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
	}
	
	
	
	const pivot = ((high + low + close) / 3)
	const R3 = getPercentageChange((2 * (high - low)) + pivot, close)
	const R2 = getPercentageChange((high - low) + pivot,close, close)
    const R1 = getPercentageChange((pivot * 2) - low, close, close)
	const S1 = getPercentageChange(close,(pivot * 2) - high)
	const S2 = getPercentageChange(close, pivot - (high - low))
	const S3 = getPercentageChange(close,pivot - (2 * (high - low)))
    return { S3, S2, S1, R1, R2, R3 }
}