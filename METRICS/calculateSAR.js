//https://en.wikipedia.org/wiki/Parabolic_SAR

//Uptrend: PSAR = Prior PSAR + Prior AF (Prior EP - Prior PSAR)

//Downtrend: PSAR = Prior PSAR - Prior AF (Prior PSAR - Prior EP)

//EP = Highest high for an uptrend and lowest low for a downtrend, updated each time a new EP is reached.

//AF = Default of 0.02, increasing by 0.02 each time a new EP is reached, with a maximum of 0.20.

/* 
def parabolic_sar(new):
    
    #this is common accelerating factors for forex and commodity
    #for equity, af for each step could be set to 0.01
    initial_af=0.02
    step_af=0.02
    end_af=0.2
    
    
    new['trend']=0
    new['sar']=0.0
    new['real sar']=0.0
    new['ep']=0.0
    new['af']=0.0

    #initial values for recursive calculation
    new['trend'][1]=1 if new['Close'][1]>new['Close'][0] else -1
    new['sar'][1]=new['High'][0] if new['trend'][1]>0 else new['Low'][0]
    new.at[1,'real sar']=new['sar'][1]
    new['ep'][1]=new['High'][1] if new['trend'][1]>0 else new['Low'][1]
    new['af'][1]=initial_af

    #calculation
    for i in range(2,len(new)):
        
        temp=new['sar'][i-1]+new['af'][i-1]*(new['ep'][i-1]-new['sar'][i-1])
        if new['trend'][i-1]<0:
            new.at[i,'sar']=max(temp,new['High'][i-1],new['High'][i-2])
            temp=1 if new['sar'][i]<new['High'][i] else new['trend'][i-1]-1
        else:
            new.at[i,'sar']=min(temp,new['Low'][i-1],new['Low'][i-2])
            temp=-1 if new['sar'][i]>new['Low'][i] else new['trend'][i-1]+1
        new.at[i,'trend']=temp
    
        
        if new['trend'][i]<0:
            temp=min(new['Low'][i],new['ep'][i-1]) if new['trend'][i]!=-1 else new['Low'][i]
        else:
            temp=max(new['High'][i],new['ep'][i-1]) if new['trend'][i]!=1 else new['High'][i]
        new.at[i,'ep']=temp
    
    
        if np.abs(new['trend'][i])==1:
            temp=new['ep'][i-1]
            new.at[i,'af']=initial_af
        else:
            temp=new['sar'][i]
            if new['ep'][i]==new['ep'][i-1]:
                new.at[i,'af']=new['af'][i-1]
            else:
                new.at[i,'af']=min(end_af,new['af'][i-1]+step_af)
        new.at[i,'real sar']=temp
       
        
    return new
*/

export default function (high, low, close) { 
    const initalAF = 0.01
    const stepAF = 0.01
    const endAF = 0.01

    const trend = [0]
    const sar = [0]
    const realSAR = [0]
    const ep = [0]
    const af = [0]
    //-----inital values------
        
    //new['trend'][1]=1 if new['Close'][1]>new['Close'][0] else -1
    trend.push(close[1] > close[0] ? 1 : -1)
    
    //new['sar'][1]=new['High'][0] if new['trend'][1]>0 else new['Low'][0]
    sar.push(trend[1] > 0 ? high[0] : low[0])
    
    //new.at[1,'real sar']=new['sar'][1]
    realSAR.push(sar[1])

    //new['ep'][1]=new['High'][1] if new['trend'][1]>0 else new['Low'][1]
    ep.push(trend[1] > 0 ? high[1] : low[1])
    
    //new['af'][1]=initial_af
    af.push(initalAF)  
    
    //calculation
    //for i in range(2,len(new)):
    for (let i = 2; i < close.length; i++) {
        //temp=new['sar'][i-1]+new['af'][i-1]*(new['ep'][i-1]-new['sar'][i-1])
        let temp = ( sar[ i-1 ] + af[ i-1 ] ) * ( ep[ i-1 ] - sar[ i-1 ] )
        //if new['trend'][i-1]<0:
        if (trend[i - 1] < 0) {
            //new.at[i,'sar']=max(temp,new['High'][i-1],new['High'][i-2])
            sar[i] = Math.max(temp, high[i - 1], high[i - 2])
            //temp=1 if new['sar'][i]<new['High'][i] else new['trend'][i-1]-1
            if (sar[i] < high[i]) { temp = 1 } else { temp = trend[i - 1] - 1 }
        }
        //else:
        else {
            //new.at[i,'sar']=min(temp,new['Low'][i-1],new['Low'][i-2])
            sar[i] = Math.min(temp, low[i - 1], low[i - 2 ])
            //temp=-1 if new['sar'][i]>new['Low'][i] else new['trend'][i-1]+1
            if (sar[i] > low[i]) { temp = -1 } else { temp = trend[i-1] + 1}
        }
        //new.at[i, 'trend'] = temp
        trend[i] = temp
        
        //if new['trend'][i]<0:
        if (trend[i] < 0) {
            //temp=min(new['Low'][i],new['ep'][i-1]) if new['trend'][i]!=-1 else new['Low'][i]
            if (trend[i] !== -1) { temp = Math.min(low[i], ep[i - 1]) } else { temp = low[i]}
        }
        //else:
        else {
            //temp=max(new['High'][i],new['ep'][i-1]) if new['trend'][i]!=1 else new['High'][i]
            if (trend[i] !== 1) { temp = Math.max(high[i], ep[i - 1]) } else { temp = high[i]}
        }
        //new.at[i, 'ep'] = temp
        ep[i] = temp
    
        //if np.abs(new['trend'][i])==1:
        if (Math.abs(trend[i]) === 1) {
            //temp=new['ep'][i-1]
            temp = ep[i - 1]
            //new.at[i,'af']=initial_af
            af[i] = initalAF
        }
        //else:
        else {
            //temp=new['sar'][i]
            temp = sar[i]
            //if new['ep'][i]==new['ep'][i-1]:
            if (ep[i] === ep[i - 1]) {
                //new.at[i,'af']=new['af'][i-1]
                af[i] = af[i - 1]
            }
            //else:
            else {
                //new.at[i,'af']=min(end_af,new['af'][i-1]+step_af)
                af[i] = Math.min(endAF, af[i-1] + stepAF)
            }
        }
        //new.at[i, 'real sar'] = temp
        realSAR[i] = temp
    }
    //return new
    const sum = trend.reduce((a,c) => a + c, 0);
    const avgTrend = sum / trend.length

    const result = avgTrend
  const resultRounded = (Math.round((result * 100) + 50) / 10000)
  return isFinite(resultRounded) ? resultRounded :
   resultRounded == Infinity ? 1 : 0


}