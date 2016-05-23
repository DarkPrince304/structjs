
	Struct.LLNode = function(data) {
		this.data = data;
		this.next = null;

		return this;
	};

	Struct.LinkedList = function() {

		this.head = {};
		this.size = 0;

		this.add = function(data) {

			if(this.size === 0) {
				this.head = (data instanceof Struct.LLNode)? data: new Struct.LLNode(data);
				console.log("Head");
				this.size++;
			} else {
				console.log("Not head");
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = (data instanceof Struct.LLNode)? data: new Struct.LLNode(data);
				this.size++;
			}

		}

		this.insert = function(data, index) {
			var current = this.head;
			if( index >= this.size ) {
				while(current.next) {
					current = current.next;
				}
				current.next = (data instanceof Struct.LLNode)? data: new Struct.LLNode(data);
				this.size++;
			} else if( index == 0 ) {
				var obj = (data instanceof Struct.LLNode)? data: new Struct.LLNode(data);
				obj.next = this.head;
				this.head = obj;
				this.size++;
			} else {
				var ind = 0;
				while(current) {
					if( (ind+1) == index ) {
						var obj = (data instanceof Struct.LLNode)? data: new Struct.LLNode(data);
						obj.next = current.next;
						current.next = obj;
						this.size++;
						break;
					}
					ind++;
					current = current.next;
				}
			}
		}

		this.delete = function(data) {
			var current = this.head;
			if( data == this.head.data ) {
				var head = this.head;
				this.head = this.head.next;
				this.size--;
				return;
			}
			for( var i = 0; i < this.size; i++ ) {
				if(current.next.data == data) {
					current.next = current.next.next;
					this.size--;
					return;
				}
				current = current.next;
			}
		}

		this.deleteIndex = function(index) {
			var current = this.head;
			if( index == 0 ) {
				var head = this.head;
				this.head = this.head.next;
				this.size--;
				return;
			}
			for( var i = 0; i < this.size; i++ ) {
				if( (i+1) == index) {
					current.next = current.next.next;
					this.size--;
					return;
				}
				current = current.next;
			}
		}

		this.splitList = function(index) {
			var current = this.head;
			var lists = [];
			for( var i = 0; i < this.size-1; i++ ) {
				if( (i+1) == index) {
					var newList = new Struct.LinkedList();
					newList.head = current.next;
					newList.size = this.size - (i+1);
					current.next = null;
					this.size = i+1;
					lists.push(this, newList);
					return lists;
				}
				current = current.next;
			}
		} 

		this.contains = function(data) {
			var current = this.head;
			for( var i = 0; i < this.size; i++ ) {
				if(current.data == data) {
					return true;
				}
				current = current.next;
			}
			return false;
		}

		this.find = function(data) {
			var current = this.head;
			for( var i = 0; i < this.size; i++ ) {
				if(current.data == data) {
					return current;
				}
				current = current.next;
			}
		}

		this.length = function() {
			return this.size;
		}

		this.getHead = function() {
			return this.head;
		}

	}
