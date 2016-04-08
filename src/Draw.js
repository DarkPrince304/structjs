
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
