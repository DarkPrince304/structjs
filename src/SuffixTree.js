
	Struct.SuffixNode = function(char) {
		this.data = char;
		this.children = [];

		return this;
	}

	Struct.SuffixTree = function(word) {

		this.root = new Struct.SuffixNode("");

		this.makeNodes = function(node, index, letters) {
			// console.log(node)
			if(!node.children.length) {

				var current = node;
				var hey = current;
				for(var i = 0; i < letters.length; i++ ) {
					// console.log(current)
					current.children[0] = new Struct.SuffixNode(letters[i]);
					// console.log(current.children[0])
					current = current.children[0];
				}
				console.log(hey)
				return;
			} else {
				for(var i = 0; i < node.children.length; i++ ) {
					console.log("hello");
					if ( node.children[i].data !== letters[index] ) {
						node.children.push(new Struct.SuffixNode(letters[index]));
						for(var i = index; i < letters.length; i++ ) {
							node.children[0] = new Struct.SuffixNode(letters[i]);
							node = node.children[0];
						}
						console.log("yo");
						return;
					} else {
						this.makeNodes(node.children[i], index + 1, letters );
						console.log("yo1");
					}

				}
			}
		}

		this.add = function(word) {

			var letters = word.split("");
/*			if(!this.root.children.length) {

				var current = this.root;
				var hey = current;
				for(var i = 0; i < letters.length; i++ ) {
					// console.log(current)
					current.children[0] = new Struct.SuffixNode(letters[i]);
					// console.log(current.children[0])
					current = current.children[0];
				}
				console.log(hey);
				return;
			} else {*/

				var now = this.root;
				console.log(now)
				

				this.makeNodes(now, 0, letters);

			// }

		}

		this.send = word+"#";

		for( var i = 0 ; i < word.length+1; i++ ) {
			console.log(this.send);
			this.add(this.send);
			this.send = this.send.substr(1);
		}
		console.log(this.root);

	}