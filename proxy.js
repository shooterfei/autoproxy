function isChianIp(){
}
function isIntervalIp(ip) {
    var ipNum = convert_addr(ip)
    var aBegin = convert_addr("10.0.0.0");
    var aEnd = convert_addr("10.255.255.255");
    var bBegin = convert_addr("172.16.0.0");
    var bEnd = convert_addr("172.31.255.255");
    var cBegin = convert_addr("192.168.0.0");
    var cEnd = convert_addr("192.168.255.255");
    var dBegin = convert_addr("127.0.0.0");
    var dEnd = convert_addr("127.255.255.255");

    if ((ipNum >= aBegin && ipNum <= aEnd) || (ipNum >= bBegin && ipNum <= bEnd) || (ipNum >= cBegin && ipNum <= cEnd) || (ipNum >= dBegin && ipNum <= dEnd))
        return true;
    else 
        return false;
}
function FindProxyForURL(url, host) {
    var proxy_addr = "SOCKS5 127.0.0.1:7890; PROXY 127.0.0.1:7890"
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)\$/;
    var ipNum;

    if (re.test(host)) {
        ipNum = host;
    } else {
        ipNum = dnsResolve(host);
    }
    if (isIntervalIp(ipNum))
        return "DIRECT";
    if (dnsDomainIs(host, "iflytek.com"))
        return "DIRECT";
    else
        return proxy_addr;
}

