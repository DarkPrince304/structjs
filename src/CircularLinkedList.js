
	Struct.CLLNode = function(data) {
		this.data = data;
		this.next = null;

		return this;
	};

	Struct.CircularLinkedList = function() {

		this.head = {};
		this.size = 0;
		this.tail = {};

		this.add = function(data) {

			if(this.size === 0) {
				this.head = (data instanceof Struct.CLLNode)? data: new Struct.CLLNode(data);
				this.head.next = this.head;
				this.tail = this.head;
				console.log("Head");
				this.size++;
			} else {
				var current = this.head;
				for(var i = 0; i < this.size-1; i++ ) {
					current = current.next;
				}
				current.next = (data instanceof Struct.CLLNode)? data: new Struct.CLLNode(data);
				current.next.next = this.head;
				this.tail = current.next;
				this.size++;
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

		this.getTail = function() {
			return this.tail;
		}

	}
