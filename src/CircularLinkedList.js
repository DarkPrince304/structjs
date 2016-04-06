
	var CLLNode = function(data) {
		this.data = data;
		this.next = null;

		return this;
	};

	var CircularLinkedList = function() {

		this.head = {};
		this.length = 0;

		this.add = function(data) {

			if(this.length === 0) {
				this.head = new CLLNode(data);
				this.length++;
			} else {
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = new CLLNode(data);
				this.length++;
			}

		}

		this.length = function() {
			return this.length;
		}

	}

	Struct.prototype.CircularLinkedList = new CircularLinkedList();
