;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Struct = factory();
  }
}(this, function() {

	'use strict'

	var Struct = function() {

	}

	
	Struct.mergeList = function(list1, list2) {
		var current = list1.head;
		while(current.next) {
			current = current.next;
		}
		current.next = list2.head;
		if(list1 instanceof Struct.DoublyLinkedList)
			current.next.prev = current;
		return list1;
	}

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


	Struct.BSTNode = function(data) {
		this.data = data;
		this.left = null;
		this.right = null;
		this.parent = null;;

		return this;
	}

	Struct.BinarySearchTree = function() {
		this.root = {}
		this.nodes = 0;
		this.height = 0;

		function addNode(node, data) {
			if( node == null ) {
				node = (data instanceof Struct.BSTNode)? data: new Struct.BSTNode(data);
				return node;
			}
			if( data < node.data ) {
				var newNode = {};
				newNode = addNode(node.left, data);
				if(newNode) {
					newNode.parent = node;
					node.left = newNode;
				}
			} else {
				var newNode = {};
				newNode = addNode(node.right, data);
				if(newNode) {
					newNode.parent = node;
					node.right = newNode;
				}
			}
		}

		this.add = function(data) {
			if(this.height == 0 ) {
				this.root = (data instanceof Struct.BSTNode)? data: new Struct.BSTNode(data);
				this.height++;
			} else {
				var root = this.root;
				addNode(root, data);
			}
		}

	}


	Struct.StackNode = function(data) {
		this.data = (JSON && JSON.stringify ? JSON.stringify(data, null, 2) : String(data));
		this.next = null;

		return this;
	};

	Struct.Stack = function() {

		this.head = {};
		this.size = 0;

		this.push = function(data) {

			if(this.size === 0) {
				this.head = (data instanceof Struct.StackNode)? data: new Struct.StackNode(data);
				this.size++;
			} else {
				var current = (data instanceof Struct.StackNode)? data: new Struct.StackNode(data);
				current.next = this.head;
				this.head = current;
				this.size++;
			}

		}

		this.pop = function() {
			this.head = this.head.next;
			this.size--;
		}

		this.splitStack = function(index) {
			var current = this.head;
			var lists = [];
			for( var i = 0; i < this.size-1; i++ ) {
				if( (i+1) == index) {
					var newList = new Struct.Stack();
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

	Struct.SuffixTree = function(passedWord) {
		this.head = {};

		this.validate = function(word) {
			if((word === undefined) || (word === null)) { throw new Error('The given word is invalid.'); }
			if (typeof word !== 'string') { throw new Error('The given word is not a string'); }
		};

		this.add = function(word) {
			this.validate(word);

			var current = this.head;

			for (var i = 0; i < word.length; i++) {
				if(!(word[i] in current)) {
					current[word[i]] = {};
				}

				current = current[word[i]];
			}

			current.$ = 1;	//word end marker
		};

		this.hasWord = function(word) {
			this.validate(word);

			var current = this.head;

			for (var i = 0; i < word.length; i++) {
				if(!(word[i] in current)) {
					return false;
				}

				current = current[word[i]];
			}

			return current.$ === 1;	//word end marker
		};

		this.remove = function(word) {
			this.validate(word);

		  var noKids = function (node) {
		    return Object.keys(node).length === 0;
		  };

			var canDelete = function (word, index, node){
				if (word === undefined ) { throw new Error('Bad Word'); }
				if (index >= word.length) { throw new Error('Bad index to check for deletion.'); }
				if (node === undefined ) { throw new Error('Bad Node at ' + index + ' for ' + word); }

				if (index === word.length - 1) {
					//last letter
					//always delete word marker (as we are deleting word)
					return (delete node.$) && noKids(node); //if last letter of word, should be empty.
				} else {
					//any other letter in word
					//check child, and after child check, I am now empty
					if (canDelete(word, index + 1, node[word[index + 1]])) {
						//delete me
						return (delete node[word[index + 1]]) && noKids(node);
					}
				}
				return false;
			};

		  canDelete(word, -1, this.head);
		};

		this.sort = function() {
			var word = '';
			var sorted = [];

		  var sortTrie = function (node, word, sorted) {
		    for(var letter in node) {
		      if (letter === '$') { sorted.push(word); }
		      else {
		        sortTrie(node[letter], word + letter, sorted);
		      }
		    }
		  };

			sortTrie(this.head, word, sorted);

			return sorted;
		};

		this.send = passedWord;

		for( var i = 0 ; i < passedWord.length; i++ ) {
			this.add(this.send);
			this.send = this.send.substr(1);
		}


	};

	Struct.Trie = function() {
		this.head = {};

		this.validate = function(word) {
			if((word === undefined) || (word === null)) { throw new Error('The given word is invalid.'); }
			if (typeof word !== 'string') { throw new Error('The given word is not a string'); }
		};

		this.add = function(word) {
			this.validate(word);

			var current = this.head;

			for (var i = 0; i < word.length; i++) {
				if(!(word[i] in current)) {
					current[word[i]] = {};
				}

				current = current[word[i]];
			}

			current.$ = 1;	//word end marker
		};

		this.hasWord = function(word) {
			this.validate(word);

			var current = this.head;

			for (var i = 0; i < word.length; i++) {
				if(!(word[i] in current)) {
					return false;
				}

				current = current[word[i]];
			}

			return current.$ === 1;	//word end marker
		};

		this.remove = function(word) {
			this.validate(word);

		  var noKids = function (node) {
		    return Object.keys(node).length === 0;
		  };

			var canDelete = function (word, index, node){
				if (word === undefined ) { throw new Error('Bad Word'); }
				if (index >= word.length) { throw new Error('Bad index to check for deletion.'); }
				if (node === undefined ) { throw new Error('Bad Node at ' + index + ' for ' + word); }

				if (index === word.length - 1) {
					//last letter
					//always delete word marker (as we are deleting word)
					return (delete node.$) && noKids(node); //if last letter of word, should be empty.
				} else {
					//any other letter in word
					//check child, and after child check, I am now empty
					if (canDelete(word, index + 1, node[word[index + 1]])) {
						//delete me
						return (delete node[word[index + 1]]) && noKids(node);
					}
				}
				return false;
			};

		  canDelete(word, -1, this.head);
		};

		this.sort = function() {
			var word = '';
			var sorted = [];

		  var sortTrie = function (node, word, sorted) {
		    for(var letter in node) {
		      if (letter === '$') { sorted.push(word); }
		      else {
		        sortTrie(node[letter], word + letter, sorted);
		      }
		    }
		  };

			sortTrie(this.head, word, sorted);

			return sorted;
		};

	};

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

	Struct.MinHeap = function(data) {
		this.array  = [];

		this.shouldSwap = function(childData, parentData) {
			return childData < parentData;
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


  Struct.draw = function(list) {

    var data = [];
    function drawBST(node) {
      if( node == null )
        return;
      var obj = {};
      obj.parent = node.data;
      if(node.left != null) {
        obj.name = node.left.data;
        data.push(obj);
      }
      drawBST(node.left);
      var obj = {};
      obj.parent = node.data;
      if( node.right != null) {
        obj.name = node.right.data;
        data.push(obj);
      }
      drawBST(node.right);
    }

    if (list instanceof Struct.LinkedList ) {
      var current = list.getHead();
      var obj = {};
      obj.parent = "null";
      obj.name = current.data;
      data.push(obj);
      while( current.next ) {
        var obj = {};
        obj.parent = current.data;
        obj.name = current.next.data;
        data.push(obj);
        current = current.next;
      }
    } else if (list instanceof Struct.CircularLinkedList ) {
      var current = list.getHead();
      var obj = {};
      obj.parent = "null";
      obj.name = current.data;
      data.push(obj);
      for(var i = 0; i < list.length(); i++ ) {
        var obj = {};
        obj.parent = current.data;
        obj.name = current.next.data;
        data.push(obj);
        current = current.next;
      }
    } else if (list instanceof Struct.DoublyLinkedList ) {
      var current = list.getHead();
      var obj = {};
      obj.parent = "null";
      obj.name = current.data;
      data.push(obj);
      for(var i = 0; i < list.length()-1; i++ ) {
        var obj = {};
        obj.parent = current.data;
        obj.name = current.next.data;
        data.push(obj);
        current = current.next;
      }
      var current = list.getHead().next;
      for(var i = 0; i < list.length()-1; i++ ) {
        var obj = {};
        obj.parent = current.data;
        obj.name = current.prev.data;
        data.push(obj);
        current = current.next;
      }
    } else if (list instanceof Struct.BinarySearchTree ) {
      var rootNode = list.root;
      var obj = {};
      obj.parent = "null";
      obj.name = rootNode.data;
      data.push(obj);
      drawBST(rootNode);
    } else if (list instanceof Struct.MaxHeap || list instanceof Struct.MinHeap) {
      var length = list.array.length/2;
      console.log(list.array);
      var obj = {};
      obj.parent = "null";
      obj.name = list.array[0].toString();
      data.push(obj);
      for(var i = 0; i < length-1; i++ ) {
        var obj = {};
        obj.parent = list.array[i].toString();
        obj.name = list.array[i*2+1].toString();
        data.push(obj);
        var obj = {};
        obj.parent = list.array[i].toString();
        obj.name = list.array[i*2+2].toString();
        data.push(obj);
      }
    }

    console.log(data);

    // *********** Convert flat data into a nice tree ***************
    // create a name: node map
    var dataMap = data.reduce(function(map, node) {
      map[node.name] = node;
      return map;
    }, {});

    // create the tree array
    var treeData = [];
    data.forEach(function(node) {
      // add to parent
      var parent = dataMap[node.parent];
      if (parent) {
        // create child array if it doesn't exist
        (parent.children || (parent.children = []))
          // add node to child array
          .push(node);
      } else {
        // parent is null or missing
        treeData.push(node);
      }
    });

    // ************** Generate the tree diagram  *****************
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
      width = 960,
      height = 500;
      
    var i = 0;

    var tree = d3.layout.tree()
      .size([height, width]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    if(d3.select("svg")) {
      d3.select("svg").remove();
    }

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var root = treeData[0];
      
    update(root);

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Declare the nodes…
      var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
          return "translate(" + d.y + "," + d.x + ")"; });

      nodeEnter.append("circle")
        .attr("r", 10)
        .style("fill", "#fff");

      nodeEnter.append("text")
        .attr("x", function(d) { 
          return d.children || d._children ? -13 : 13; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { 
          return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1);

      // Declare the links…
      var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

      // Enter the links.
      link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);

    }

  }

return Struct;
}));
