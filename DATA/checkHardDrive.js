import { statfs } from 'fs';
import { opendir } from 'node:fs/promises';
import { HDD1, HDD2, HDD3 } from './_locations.js';

export default function () { 
    const HDDToCheck = [HDD1, HDD2, HDD3]
    HDDToCheck.forEach((HDD) => { 
        try {const dir = opendir(HDD)
            const space = statfs(HDD, (e, stats) => {
                if (Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024) < 200) {
                    console.error(HDD.slice(5), '*** Free Space LOW ***',
                    Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                } else {console.log(HDD.slice(5), 'Free Space',Math.floor(stats.bsize*stats.bavail/1024/1024/1024), ' GB')}})
        } catch (error) {console.error('Check Free Space Error:', error)}})
}

export function RAW() { 
    try {
        const dir = opendir(HDD1)
        const space = statfs(HDD1, (e, stats) => {
            if (Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024) < 50) {
                console.error(HDD1.slice(5), '*** Free Space LOW ***',
                    Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                return false
            } else {
                //console.log(HDD1.slice(5), 'Free Space', Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                return true
            }
        })
    } catch (error) { console.error('Check Free Space Error:', error); return true }
    finally { return true}
}
export function PROCESSED() { 
    try {const dir = opendir(HDD2)
        const space = statfs(HDD2, (e, stats) => {
            if (Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024) < 100) {
                console.error(HDD2.slice(5), '*** Free Space LOW ***',
                Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                return false
            } else {
                console.log(HDD2.slice(5), 'Free Space', Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                return true
            }
        })
    } catch (error) {console.error('Check Free Space Error:', error)}
}
export function RESULTS() { 
    try {const dir = opendir(HDD3)
        const space = statfs(HDD3, (e, stats) => {
            if (Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024) < 100) {
                console.error(HDD3.slice(5), '*** Free Space LOW ***',
                Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                return false
            } else {
                console.log(HDD3.slice(5), 'Free Space', Math.floor(stats.bsize * stats.bavail / 1024 / 1024 / 1024), ' GB')
                return true
            }
        })
    } catch (error) {console.error('Check Free Space Error:', error)}
}