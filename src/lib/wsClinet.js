import _ from "lodash";
import io from 'socket.io-client'
import EventEmitter from 'eventemitter3'
import P from 'bluebird'

class wsClinet extends EventEmitter{
	constructor(store) {
	  	super();

		this.store = store;

    this.startUp=(url)=>{
      	if (this.client){
        	this.client.close();
        	this.store.commit('updateState',{});
      	}
      	return new P((resolve,reject)=>{
        	this.client = io(url);
			this.client.on('connect',(msg)=>{
				clearTimeout(this.timer);
				resolve();
			});
        	this.client.on('message',(msg) =>{

          		switch (msg.cmd) {
            		case 'status':
						let miner = {};
						let bzzAccount =  msg.payload.eSwarm.config.bzzaccount;
						bzzAccount = bzzAccount ? bzzAccount : '';
						miner[msg.payload.sysInfo.sUUID] = {
							bzzaccount: bzzAccount,
						};
						this.store.commit('updateAttr', {data:miner,domin:"miners"});
						
						let initState = {
							diskInfo:{},
							sysInfo:{},
							eSwarm: {},
							uuid:this.uuid
              			};
              			this.store.commit('updateState', {gateway:_.extend(initState,msg.payload)});
						this.emit('state-init',{});
              			break;
              			
            		case 'notify':
							let state = {};
							state[msg.params.iotId] = {};
							state[msg.params.iotId][msg.params.attribute] = msg.payload;
							this.store.commit('updateAttr', {data:state,domin:"gateway"});
							break;
							
					case 'rreq':
              			this.emit(msg.msgId,msg);
              			break;
          		}

        	});
          this.timer = setTimeout(() => {
            this.client.close();
            reject()
          }, 1000)
      	})

    };
    this.sendRequest=({iotId,attribute,act,value,options={}})=>{
    	let fun = (resolve, reject) => {
        	let uuid = Math.random().toString(36).substr(2, 8);

        	let to = () => {
          		this.removeAllListeners(uuid);
          		reject('timeout');
        	};

        	this.once(uuid,(result) => {
          		if(timer){
            		clearTimeout(timer);
          		}

          		this.removeAllListeners(uuid);

          		if(result.error){
            		reject(result.error)
          		}else {
            		resolve(result.payload);
          		}

        	});
        	let timer = setTimeout(to,options.timeout||5000);

        	let data = {
          		params:{iotId,attribute},
          		payload:{act,params:value},
          		cmd:"req",
          		msgId:uuid
        	};
        	if (!_.isEmpty(options)) {
          		data.options = options;
       	 	}

        	this.client.emit('message',data, (err) => {
          		if (err) {
            		reject(err);
          		}
        	});
      	}
      return new P(fun.bind(this))
    }
  }


}

export default wsClinet
