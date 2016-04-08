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


  Struct.draw = function(list) {

    var links = [ ]


    function drawBST(node) {
      if( node == null )
        return;
      var obj = {};
      obj.source = node.data;
      if(node.left != null) {
        obj.target = node.left.data;
        links.push(obj);
      }
      drawBST(node.left);
      var obj = {};
      obj.source = node.data;
      if( node.right != null) {
        obj.target = node.right.data;
        links.push(obj);
      }
      drawBST(node.right);
    }

    if (list instanceof Struct.LinkedList ) {
      var current = list.getHead();
      while( current.next ) {
        var obj = {};
        obj.source = current.data;
        obj.target = current.next.data;
        links.push(obj);
        current = current.next;
      }
    } else if (list instanceof Struct.CircularLinkedList ) {
      var current = list.getHead();
      for(var i = 0; i < list.length(); i++ ) {
        var obj = {};
        obj.source = current.data;
        obj.target = current.next.data;
        links.push(obj);
        current = current.next;
      }
    } else if (list instanceof Struct.DoublyLinkedList ) {
      var current = list.getHead();
      for(var i = 0; i < list.length()-1; i++ ) {
        var obj = {};
        obj.source = current.data;
        obj.target = current.next.data;
        links.push(obj);
        current = current.next;
      }
      var current = list.getHead().next;
      for(var i = 0; i < list.length()-1; i++ ) {
        var obj = {};
        obj.source = current.data;
        obj.target = current.prev.data;
        links.push(obj);
        current = current.next;
      }
    } else if (list instanceof Struct.BinarySearchTree ) {
      var rootNode = list.root;
      drawBST(rootNode);
    }


    console.log(links)

    var nodes = {};

    // Compute the distinct nodes from the links.
    links.forEach(function(link) {
      link.source = nodes[link.source] || 
          (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || 
          (nodes[link.target] = {name: link.target});
      link.value = +link.value;
    });

    var width = 960,
      height = 500;

    var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(160)
      .linkStrength(0.6)
      .friction(0.4)
      .theta(0)
      .gravity(0)
      .charge(-300)
      .chargeDistance(200)
      .on("tick", tick)
      .start();

    if(d3.select("svg")) {
      d3.select("svg").remove();
    }
    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    // build the arrow.
    svg.append("svg:defs").selectAll("marker")
      .data(["end"])      // Different link/path types can be defined here
      .enter().append("svg:marker")    // This section adds in the arrows
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 15)
      .attr("markerHeight", 15)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");

    // add the links and the arrows
    var path = svg.append("svg:g").selectAll("path")
      .data(force.links())
      .enter().append("svg:path")
      .attr("class", "link")
      .attr("style", "fill: none;stroke: #666;stroke-width: 1.5px;")
      .attr("marker-end", "url(#end)");

    // define the nodes
    var node = svg.selectAll(".node")
      .data(force.nodes())
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

    // add the nodes
    node.append("circle")
      .attr("r", 10)
      .attr("style", "fill: #ccc; stroke: #fff; stroke-width: 1.5px;");

    // add the text 
    node.append("text")
      .attr("x", 0)
      .attr("y", 15)
      .attr("dy", "1.35em")
      .text(function(d) { return d.name; });

    // add the curvy lines
    function tick() {
      path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
          d.source.x + "," + 
          d.source.y + "A" + 
          dr + "," + dr + " 0 0,1 " + 
          d.target.x + "," + 
          d.target.y;
      });

      node
        .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; });
    }

  }

return Struct;
}));
