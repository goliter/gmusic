import type { IRootState } from '@/store'
import { ILyric, parseLyric } from "@/utils/parse-lyric";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSongDetail, getSongLyric } from "../service/player";

interface IThunkState{
    state:IRootState
}

export const fetchCurrentSongAction = createAsyncThunk<void, number, { state: IRootState }>('currentSong',
    (id:number, { dispatch, getState }) => {
        const playSongList = getState().player.playSongList
        const findIndex=playSongList.findIndex((item)=>item.id===id)
        if(findIndex===-1){
            getSongDetail(id).then((res) => {
                if (!res.songs.length) return
                const song = res.songs[0]
                const newPlaySongList=[...playSongList]
                newPlaySongList.push(song)
                dispatch(changeCurrentSongAction(song))
                dispatch(changePlaySongListAction(newPlaySongList))
                dispatch(changePlaySongIndexAction(newPlaySongList.length-1))
            })
        }
        else{
            const song=playSongList[findIndex]
            dispatch(changeCurrentSongAction(song))
            dispatch(changePlaySongIndexAction(findIndex))
        }
        //获取歌曲信息
        
        getSongLyric(id).then((res) => {
            const lyricString = res.lrc.lyric
            const lyrics = parseLyric(lyricString)
            dispatch(changeLyricsAction(lyrics))
        })
    })

export const  changeMusicAction=createAsyncThunk<void,boolean,IThunkState>(
    'changeMusic',
    (isNext,{dispatch,getState})=>{
        const player=getState().player
        const playMode=player.playMode
        const songIndex=player.playSongIndex
        const songList=player.playSongList

        let newIndex=songIndex
        if(playMode===1)
        {
            newIndex=Math.floor(Math.random()*songList.length)
        }else{
            newIndex=isNext?songIndex+1:songIndex-1
            if(newIndex>songList.length-1) newIndex=0
            if(newIndex<0) newIndex=songList.length-1
        }

        const song= songList[newIndex]
        dispatch(changeCurrentSongAction(song))
        dispatch(changePlaySongIndexAction(newIndex))

        getSongLyric(song.id).then((res) => {
            const lyricString = res.lrc.lyric
            const lyrics = parseLyric(lyricString)
            dispatch(changeLyricsAction(lyrics))
        })
    }
)

interface IPlayerState {
    currentSong: any   //当前歌曲
    lyrics: ILyric[]   //歌词
    lyricIndex: number  //歌词索引
    playSongList: any[]    //歌曲列表
    playSongIndex: number     //歌曲索引
    playMode:number     //播放模式
}

const initialState: IPlayerState = {
    currentSong: {},
    lyrics: [],
    lyricIndex: -1,
    playSongList: [
        {
            "name": "春风十里报新年",
            "id": 1413464902,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 12085016,
                    "name": "接个吻，开一枪",
                    "tns": [],
                    "alias": []
                },
                {
                    "id": 28862362,
                    "name": "火鸡",
                    "tns": [],
                    "alias": []
                },
                {
                    "id": 28304831,
                    "name": "吕口口",
                    "tns": [],
                    "alias": []
                },
                {
                    "id": 31668975,
                    "name": "Lambert",
                    "tns": [],
                    "alias": []
                },
                {
                    "id": 31051426,
                    "name": "杨胖雨",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [
                "2020集五福主题曲"
            ],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 11,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 84652174,
                "name": "春风十里报新年",
                "picUrl": "https://p1.music.126.net/A157zQR5rR66LMatjYAucQ==/109951164595606537.jpg",
                "tns": [],
                "pic_str": "109951164595606537",
                "pic": 109951164595606540
            },
            "dt": 209622,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 8387565,
                "vd": -38130,
                "sr": 48000
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 5032557,
                "vd": -35604,
                "sr": 48000
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 3355053,
                "vd": -33984,
                "sr": 48000
            },
            "sq": {
                "br": 1010894,
                "fid": 0,
                "size": 26488278,
                "vd": -38251,
                "sr": 48000
            },
            "hr": {
                "br": 1781569,
                "fid": 0,
                "size": 46682136,
                "vd": -38109,
                "sr": 48000
            },
            "a": null,
            "cd": "01",
            "no": 0,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 0,
            "s_id": 0,
            "mark": 536870912,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 11,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "cp": 0,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "mv": 0,
            "publishTime": 1577808000000
        },
        {
            "name": "好运来",
            "id": 333750,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 10607,
                    "name": "祖海",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 54,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 154515442,
                "name": "好运来",
                "picUrl": "https://p1.music.126.net/Ysf-zfpVA6Gyz7tNAIutkQ==/109951168039338696.jpg",
                "tns": [],
                "pic_str": "109951168039338696",
                "pic": 109951168039338690
            },
            "dt": 213080,
            "h": {
                "br": 320002,
                "fid": 0,
                "size": 8525366,
                "vd": -45199,
                "sr": 44100
            },
            "m": {
                "br": 192002,
                "fid": 0,
                "size": 5115237,
                "vd": -42614,
                "sr": 44100
            },
            "l": {
                "br": 128002,
                "fid": 0,
                "size": 3410173,
                "vd": -41046,
                "sr": 44100
            },
            "sq": {
                "br": 1722328,
                "fid": 0,
                "size": 45874214,
                "vd": -45184,
                "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 2,
            "s_id": 0,
            "mark": 0,
            "originCoverType": 0,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 54,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "mv": 5336700,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 22019,
            "publishTime": 1236614400000
        },
        {
            "name": "又到天黑",
            "id": 2015647807,
            "pst": 0,
            "t": 0,
            "ar": [
                {
                    "id": 12676697,
                    "name": "告五人",
                    "tns": [],
                    "alias": []
                }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "",
            "fee": 8,
            "v": 3,
            "crbt": null,
            "cf": "",
            "al": {
                "id": 158479793,
                "name": "又到天黑",
                "picUrl": "https://p2.music.126.net/POvc5YLqLHIwJ9jw1Hqizw==/109951168245195477.jpg",
                "tns": [],
                "pic_str": "109951168245195477",
                "pic": 109951168245195470
            },
            "dt": 290664,
            "h": {
                "br": 320000,
                "fid": 0,
                "size": 11627565,
                "vd": -53311,
                "sr": 48000
            },
            "m": {
                "br": 192000,
                "fid": 0,
                "size": 6976557,
                "vd": -50700,
                "sr": 48000
            },
            "l": {
                "br": 128000,
                "fid": 0,
                "size": 4651053,
                "vd": -48980,
                "sr": 48000
            },
            "sq": null,
            "hr": null,
            "a": null,
            "cd": "01",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 0,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 3,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "awardTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 22036,
            "mv": 0,
            "publishTime": 1674230400000
        }],
    playSongIndex: -1,
    playMode:0  //1.顺序 2.随机 3.单曲
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        changeCurrentSongAction(state, { payload }) {
            state.currentSong = payload
        },
        changeLyricsAction(state, { payload }) {
            state.lyrics = payload
        },
        changeLyricsIndexAction(state, { payload }) {
            state.lyricIndex = payload
        },
        changePlaySongIndexAction(state,{payload}){
            state.playSongIndex=payload
        },
        changePlaySongListAction(state,{payload}){
            state.playSongList=payload
        },
        changePlayModeAction(state,{payload}){
            state.playMode=payload
        }
    }
})

export const { changeCurrentSongAction, changeLyricsAction, changeLyricsIndexAction,changePlaySongIndexAction,changePlaySongListAction,changePlayModeAction } = playerSlice.actions
export default playerSlice.reducer