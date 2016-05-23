
	Struct.QueueNode = function(data) {
		this.data = (JSON && JSON.stringify ? JSON.stringify(data, null, 2) : String(data));
		this.next = null;

		return this;
	};

	Struct.Queue = function() {

		this.head = {};
		this.size = 0;

		this.push = function(data) {

			if(this.size === 0) {
				this.head = (data instanceof Struct.LLNode)? data: new Struct.QueueNode(data);
				console.log("Head");
				this.size++;
			} else {
				console.log("Not head");
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = (data instanceof Struct.LLNode)? data: new Struct.QueueNode(data);
				this.size++;
			}

		}

		this.pop = function() {
			this.head = this.head.next;
			this.size--;
		}

		this.splitList = function(index) {
			var current = this.head;
			var lists = [];
			for( var i = 0; i < this.size-1; i++ ) {
				if( (i+1) == index) {
					var newList = new Struct.Queue();
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
