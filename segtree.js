Struct.SegTreeNode = function() {
	this.sum = 0;
	this.left = 0;
	this.right = 0;
}

Struct.SegTree = function() {

	var tree = []

	function build(data , tree , node , left , right) {
		if (left > right)
			return;

		tree[node].left = left;
		tree[node].right = right;

		if (left == right) {
			tree[node].sum = data[left];
			return;
		}
		var mid = (left + right) / 2;
		build(data , 2 * node , left , mid);
		build(data , 2 * node + 1 , mid + 1 , right);
	}

	function create(data) {
		var n = data.length;
		//create a tree of length NlogN
		for(var i = 0;i < 10 * n;i++) {
			var node = new Struct.SegTreeNode();
			tree.push(node);
		}
		build(data , tree , 1 , 0 , n - 1);
	}

	
}

