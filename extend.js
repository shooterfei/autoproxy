console.time("ex")


function convert_addr(ip) {
    let bytes = ip.split(".")
    let target = ((bytes[0] & 0xff) << 24) |
        ((bytes[1] & 0xff) << 16) |
        ((bytes[2] & 0xff) << 8) |
        ((bytes[3] & 0xff))
    return target
}


function BinarySearch(arr, target) {
    if (arr.length <= 1) return -1
    // 低位下标
    let lowIndex = 0
    // 高位下标
    let highIndex = arr.length - 1

    while (lowIndex <= highIndex) {
        // 中间下标
        const midIndex = Math.floor((lowIndex + highIndex) / 2)
        if (target < arr[midIndex][0]) {
            highIndex = midIndex - 1
        } else if (target > arr[midIndex][1]) {
            lowIndex = midIndex + 1
        } else {
            // target === arr[midIndex]
            return midIndex
        }
    }
    return -1
}

function getIpRange(ipAddr) {
    let [minIpAddr, maxIpAddr] = [0, 0]

    let [ip, mask] = ipAddr.split("/")
    let a, b, c, d
    [a, b, c, d] = ip.split(".")
    let am, bm, cm, dm
    let maskArr = [0, 0, 0, 0]
    for (let i = 0; i < 4; i++) {
        if (mask >= 8) {
            maskArr[i] = 0xff >> 8
            mask -= 8
        } else {
            maskArr[i] = 0xff >> mask
            mask = 0
        }
        maskArr[i] ^= 0xff
    }

    [am, bm, cm, dm] = maskArr

    minIpAddr = (((a & am) << 24) |
        ((b & bm) << 16) |
        ((c & cm) << 8) |
        (d & dm)) >>> 0


    maxIpAddr = (((a | (am ^ 0xff)) << 24) |
        ((b | (bm ^ 0xff)) << 16) |
        ((c | (cm ^ 0xff)) << 8) |
        (d | (dm ^ 0xff))) >>> 0

    return [minIpAddr, maxIpAddr]
}


const fs = require('fs')

const data = fs.readFileSync('./china_ip_list.txt', 'utf8')
const lines = data.split("\r\n")


let range = new Array(lines.length)




let content = "const range = [\r\n";
for (let i = 0; i < lines.length; i++) {
    range[i] = getIpRange(lines[i])
    content += ` [${range[i][0]}, ${range[i][1]}],`

    if (i > 0 && (i % 9) == 0) {
        content += "\r\n"
    }
}

content = content.substring(0, content.length - 1);
content += "\r\n];\r\n";



fs.writeFile("./test.txt", content, err => {
    if (err) {
        console.error(err)
    }
})



console.log(BinarySearch(range, (convert_addr("110.242.68.66") >>> 0)))


// for (let i = 0; i < range.length; i++) {
//     // console.log(range[i])
//     if (i > 0) {
//         if (range[i][1] < range[i-1][0]) {
//             console.log(range[i], range[i-1], i, range[i+1])
//         }
//     }
//     if (range[i][1] < range[i][0]) {
//         console.log(false, range[i])
//     }

// }

console.timeEnd("ex")
