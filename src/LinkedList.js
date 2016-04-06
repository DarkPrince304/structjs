
	var LLNode = function(data) {
		this.data = data;
		this.next = null;

		return this;
	};

	var LinkedList = function() {

		this.head = {};
		this.length = 0;

		this.add = function(data) {

			if(this.length === 0) {
				this.head = new LLNode(data);
				this.length++;
			} else {
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = new LLNode(data);
				this.length++;
			}

		}

		this.length = function() {
			return this.length;
		}

	}

	Struct.prototype.LinkedList = new LinkedList();
