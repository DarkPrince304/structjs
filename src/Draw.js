
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
