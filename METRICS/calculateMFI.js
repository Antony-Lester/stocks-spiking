
export default function (high, low, close, volume, period) { 
    const typicalPrice = [...close].map((close, index) => (high[index] + low[index] + close) / 3)
    const moneyFlow = [...typicalPrice].map((typical, index) => typical * volume[index])
    const positiveFlow = []
    const negativeFlow = []
    for (let i = 1; i < typicalPrice.length; i++) {
        if (typicalPrice[i] > typicalPrice[i - 1]) {
            positiveFlow.push(moneyFlow[i - 1])
            negativeFlow.push(0)
        } else if (typicalPrice[i] < typicalPrice[i-1]) {
            positiveFlow.push(0)
            negativeFlow.push(moneyFlow[i-1])
        } else { 
            positiveFlow.push(0)
            negativeFlow.push(0)
        }
      }
    let positiveMoneyFlow = []
    let negativeMoneyFlow = []
    for (let i = 0; i < positiveFlow.length; i++) {
        positiveMoneyFlow.push(...positiveFlow.slice(i + 1 - period, i + 1))
        negativeMoneyFlow.push(...negativeFlow.slice(i + 1 - period, i + 1))
    }
    positiveMoneyFlow = positiveMoneyFlow.reduce((x, y) => x + y, 0) / period
    negativeMoneyFlow = negativeMoneyFlow.reduce((x, y) => x + y, 0) / period

const result = 100 - ((positiveMoneyFlow / negativeMoneyFlow) + 1) / 100
  const resultRounded = Math.round(result) / 1000
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0
}
