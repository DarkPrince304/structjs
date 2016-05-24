	Struct.MaxHeap = function(data) {
		this.array  = [];

		this.shouldSwap = function(childData, parentData) {
			return childData > parentData;
		}

		this.getParentIndex = function (childIndex) {
			return Math.floor((childIndex - 1) / 2);
		};

		this.getLeftChild = function (parentIndex){
			return parentIndex * 2 + 1;
		};

		this.getRightChild = function (parentIndex){
			return parentIndex * 2 + 2;
		};

		this.add = function(data) {
			if (data === undefined) { throw 'data must be valid to add'; }

			this.array.push(data);
			this.bubbleUp(this.array.length - 1, data);
		};


		this.bubbleUp = function(childIndex, childData) {
			if (childIndex > 0) {
				var parentIndex = this.getParentIndex(childIndex);
				var parentData = this.array[parentIndex];

				if (this.shouldSwap(childData, parentData)) {
					this.array[parentIndex] = childData;
					this.array[childIndex] = parentData;
					this.bubbleUp(parentIndex, childData);
				}
			}
		};

		this.bubbleDown = function(parentIndex, parentData) {
			if (parentIndex < this.array.length) {
				var targetIndex = parentIndex;
				var targetData = parentData;

				var leftChildIndex = this.getLeftChild(parentIndex);
				var rightChildIndex = this.getRightChild(parentIndex);

				var trySwap = function (index, array, shouldSwap) {
					if (index < array.length) {
						var data = array[index];

						if (shouldSwap(data, targetData)) {
							targetIndex = index;
							targetData = data;
						}
					}
				};

				trySwap(leftChildIndex, this.array, this.shouldSwap);
				trySwap(rightChildIndex, this.array, this.shouldSwap);

				if (targetIndex !== parentIndex) {
					this.array[parentIndex] = targetData;
					this.array[targetIndex] = parentData;
					this.bubbleDown(targetIndex, parentData);
				}
			}
		};

		this.removeHead = function() {

			var headNode = this.array[0];
			var tailNode = this.array.pop();

			this.array[0] = tailNode;
			this.bubbleDown(0, tailNode);

			return headNode;
		};

		if (data && (data instanceof Array)) {
			this.array = data;
			var length = this.array.length;
			for (var i = Math.floor((length - 1)/2); i >= 0; i--) {
				this.bubbleDown(i, this.array[i]);
			}
		}

		return this;
	};
