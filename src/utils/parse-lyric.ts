export interface ILyric{
    time:number
    text:string
}

const timeRegExp=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString:string){
    const lines:string[]=lyricString.split('\n')
    const lyrics:ILyric[]=[]
    for(const line of lines)
    {
        const result=timeRegExp.exec(line)
        if(!result) continue
        const time1=Number(result[1])*60*1000
        const time2=Number(result[2])*1000
        const time3=result[3].length===2?Number(result[3])*10:Number(result[3])
        const time=time1+time2+time3
        const text=line.replace(timeRegExp,'')
        lyrics.push({time,text})
    }
    
        return lyrics
}