import P from 'bluebird';
const addr = '255.255.255.255';
const mutilAddr = '224.0.0.110';
// const port = '50001';
const stringToArrayBuffer = (string) => {
  // UTF-16LE
  let buf = new ArrayBuffer(string.length);
  let bufView = new Uint8Array(buf);
  for (let i = 0, strLen = string.length; i <= strLen; i++) {
    bufView[i] = string.charCodeAt(i);
  }
  return buf;
};
export default  {
    findMine: (data, port, timeout) => {

        let udp = chrome && chrome.sockets && chrome.sockets.udp;
        if (udp) {
            return new P((resolve, reject) => {
                let receSocketId = '';
                let sendSocketId = '';
                let results = {};
                let complete_handler = setTimeout(function(){
                    clearTimeout(complete_handler);
                    complete_handler = null;
                    udp.onReceive.listeners = [];
                    udp.onReceiveError.listeners = [];
                    udp.close(sendSocketId);
                    udp.close(receSocketId);
                    resolve(results);
                },timeout || 5000);

                udp.onReceive.addListener(function (info) {
                    let data = new TextDecoder("utf-8").decode(new Uint8Array(info.data));
                    let mine = {};
                    try {
                        mine = JSON.parse(data);
                        results[mine.sUUID]= {
                          ...mine,
                          ip: info.remoteAddress,
                          ws: "http://" + info.remoteAddress + ":8080"
                        };
                    }
                    catch(e) {
                      console.log(e);
                    }
                });

                udp.onReceiveError.addListener(function (info) {
                    console.log(info);
                    clearTimeout(complete_handler);
                    complete_handler = null;
                    udp.close(sendSocketId);
                    udp.close(receSocketId);
                    reject('receive error');
                });

                new P((resolve1, reject) => {
                    udp.create(function(createInfo) {
                        udp.bind(createInfo.socketId, '0.0.0.0', 60010, function(result) {
                            udp.joinGroup(createInfo.socketId, mutilAddr, function (result) {
                              udp.setMulticastTimeToLive(createInfo.socketId, 64, function (result) {
                                console.log("result ttl:", result)
                                resolve1(createInfo.socketId);
                              })

                            });
                        });
                    });
                }).then((socketId) => {
                    receSocketId = socketId;

                    // udp.create(function(createInfo) {
                    //     udp.bind(createInfo.socketId, '0.0.0.0', 0, function(result) {
                    //         udp.setBroadcast(createInfo.socketId, true, function(result){
                    //             udp.send(createInfo.socketId, data, addr, port, function(result) {
                    //                 udp.close(createInfo.socketId);
                    //                 if (result < 0) {
                    //                     console.log('send fail: ' + result);
                    //                     clearTimeout(complete_handler);
                    //                     complete_handler = null;
                    //                     reject('send failed');
                    //                 }
                    //             });
                    //         });
                    //     });
                    // });

                    udp.create(function (createInfo) {
                        udp.bind(createInfo.socketId, "0.0.0.0", 0, function (result) {
                            udp.joinGroup(createInfo.socketId, mutilAddr, function (result) {
                                data = stringToArrayBuffer(JSON.stringify(data))
                                udp.send(createInfo.socketId, data, mutilAddr, port, function (result) {
                                    sendSocketId = createInfo.socketId;
                                    if (result < 0) {
                                        console.log('send fail: ' + result);
                                        clearTimeout(complete_handler);
                                        complete_handler = null;
                                        udp.close(sendSocketId);
                                        udp.close(receSocketId);
                                        reject('send failed');
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }

        return P.reject('no udpsocket plugin');
    },
    setIp: (data, port, timeout) => {
        let udp = chrome && chrome.sockets && chrome.sockets.udp;
        if (udp) {
            return new P((resolve, reject) => {
                let receSocketId = '';
                let sendSocketId = '';
                let complete_handler = setTimeout(function(){
                    clearTimeout(complete_handler);
                    complete_handler = null;
                    udp.onReceive.listeners = [];
                    udp.onReceiveError.listeners = [];
                    udp.close(receSocketId);
                    udp.close(sendSocketId);
                    reject(new Error('timeout'));
                },timeout || 10000);

                udp.onReceive.addListener(function (info) {
                    let data = new TextDecoder("utf-8").decode(new Uint8Array(info.data));
                    try {
                        clearTimeout(complete_handler);
                        complete_handler = null;
                        udp.close(receSocketId);
                        udp.close(sendSocketId);
                        resolve(JSON.parse(data));
                    }
                    catch(e) {

                    }
                });

                udp.onReceiveError.addListener(function (info) {
                    console.log(info);
                    clearTimeout(complete_handler);
                    complete_handler = null;
                    udp.close(receSocketId);
                    udp.close(sendSocketId);
                    reject(new Error('setIp receive error'));
                });

                new P((resolve1, reject) => {
                    udp.create(function(createInfo) {
                        udp.bind(createInfo.socketId, '0.0.0.0', 50010, function(result) {
                            udp.joinGroup(createInfo.socketId, mutilAddr, function (result) {
                                resolve1(createInfo.socketId);
                            });
                        });
                    });
                }).then((socketId) => {
                    receSocketId = socketId;

                    udp.create(function (createInfo) {
                        udp.bind(createInfo.socketId, "0.0.0.0", 0, function (result) {
                            udp.joinGroup(createInfo.socketId, mutilAddr, function (result) {
                                udp.send(createInfo.socketId, data, mutilAddr, port, function (result) {
                                    sendSocketId = createInfo.socketId;
                                    if (result < 0) {
                                        console.log('send fail: ' + result);
                                        clearTimeout(complete_handler);
                                        complete_handler = null;
                                        udp.close(sendSocketId);
                                        udp.close(receSocketId);
                                        reject('send failed');
                                    }
                                });
                            });
                        });
                    });
                });
            });
        }

        return P.reject(new Error('no udpsocket plugin'));
    }
};
