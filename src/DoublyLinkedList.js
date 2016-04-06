
	var DLLNode = function(data) {
		this.data = data;
		this.next = null;
		this.previous = null;

		return this;
	};

	var DoublyLinkedList = function() {

		this.head = {};
		this.length = 0;

		this.add = function(data) {

			if(this.length === 0) {
				this.head = new DLLNode(data);
				this.length++;
			} else {
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = new DLLNode(data);
				this.length++;
			}

		}

		this.length = function() {
			return this.length;
		}

	}

	Struct.prototype.DoublyLinkedList = new DoublyLinkedList();
