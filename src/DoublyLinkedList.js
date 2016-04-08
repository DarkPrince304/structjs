
	Struct.DLLNode = function(data) {
		this.data = data;
		this.next = null;
		this.prev = null;

		return this;
	};

	Struct.DoublyLinkedList = function() {

		this.head = {};
		this.size = 0;

		this.add = function(data) {

			if(this.size === 0) {
				this.head = (data instanceof Struct.DLLNode)? data: new Struct.DLLNode(data);
				console.log("Head");
				this.size++;
			} else {
				console.log("No head");
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = (data instanceof Struct.DLLNode)? data: new Struct.DLLNode(data);
				current.next.prev = current;
				this.size++;
			}

		}

		this.delete = function(data) {
			var current = this.head;
			if( data == this.head.data ) {
				var head = this.head;
				this.head = this.head.next;
				this.head.prev = null;
				this.size--;
				return;
			}
			for( var i = 0; i < this.size; i++ ) {
				if(current.next.data == data) {
					current.next = current.next.next;
					current.next.prev = current;
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
				this.head.prev = null;
				this.size--;
				return;
			}
			for( var i = 0; i < this.size; i++ ) {
				if( (i+1) == index) {
					current.next = current.next.next;
					current.next.prev = current;
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
					newList.head.prev = null;
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
