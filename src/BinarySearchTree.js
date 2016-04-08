
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
