
function convert_addr(ip) {
  let bytes = ip.split(".")
  let target = ((bytes[0] & 0xff) << 24) |
    ((bytes[1] & 0xff) << 16) |
    ((bytes[2] & 0xff) << 8) |
    ((bytes[3] & 0xff))
  return target
}


// const ipdr = [
//     "1.0.1.0/24",
//     "1.0.2.0/23",
//     "1.0.8.0/21",
//     "1.0.32.0/19",
//     "1.1.0.0/24",
//     "1.1.2.0/23"
// ]

const ipdr = [
  "10.0.0.0/8",
  "172.16.0.0/12",
  "192.168.0.0/16"
]
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

  minIpAddr = ((a & am) << 24) |
    ((b & bm) << 16) |
    ((c & cm) << 8) |
    (d & dm)


  maxIpAddr = ((a | (am ^ 0xff)) << 24) |
    ((b | (bm ^ 0xff)) << 16) |
    ((c | (cm ^ 0xff)) << 8) |
    (d | (dm ^ 0xff))

  return [minIpAddr, maxIpAddr]
  // a &= am
  // b &= bm
  // c &= cm
  // d &= dm
  //
  // cip = `${a}.${b}.${c}.${d}`
  // console.log(minIpAddr, cip, convert_addr(cip))
  // a |= (am ^ 0xff)
  // b |= (bm ^ 0xff)
  // c |= (cm ^ 0xff)
  // d |= (dm ^ 0xff)
  //
  //
  // cip = `${a}.${b}.${c}.${d}`
  // console.log(maxIpAddr, cip, convert_addr(cip))

  // ipBytes.forEach(byte => {
  //     byte != (~mask)
  //     console.log(byte)
  // })
}


ipdr.forEach(ipAddr => {
  [min, max] = getIpRange(ipAddr)
  console.log(min, max)
})
