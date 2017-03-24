var FancyWebSocket = function(url,username)
{
	var callbacks = {};
	var ws_url = url;
	var conn;

	this.bind = function(event_name, callback){
		callbacks[event_name] = callbacks[event_name] || [];
		callbacks[event_name].push(callback);
		return this;// chainable
	};

	this.send = function(event_name, event_data){
		//alert(event_name);
		this.conn.send( event_data );
		return this;
	};

	this.connect = function() {
		alert(username);
		if ( typeof(MozWebSocket) == 'function' )
			this.conn = new MozWebSocket(url);
		else
			this.conn = new WebSocket(url);

		// dispatch to the right handlers
		this.conn.onmessage = function(evt){
			//dispatch('message', evt.data);
			dispatch('message', evt.data);
		};

		this.conn.onclose = function(){
			dispatch('close',null);
		}
		this.conn.onopen = function(){
			dispatch('open',null);
		}
	};

	this.disconnect = function() {
		this.conn.close();
	};

	var dispatch = function(event_name, message){
		var chain = callbacks[event_name];
		if(typeof chain == 'undefined') return; // no callbacks for this event
		for(var i = 0; i < chain.length; i++){
			chain[i]( message )
		}
	}
};