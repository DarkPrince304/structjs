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


	var DLLNode = function(data) {
		this.data = data;
		this.next = null;
		this.previous = null;

		return this;
	};

	var DoublyLinkedList = function() {

		this.head = {};
		this.length = 0;

		this.add = function(data) {

			if(this.length === 0) {
				this.head = new DLLNode(data);
				this.length++;
			} else {
				var current = this.head;
				while(current.next) {
					current = current.next;
				}
				current.next = new DLLNode(data);
				this.length++;
			}

		}

		this.length = function() {
			return this.length;
		}

	}

	Struct.prototype.DoublyLinkedList = new DoublyLinkedList();


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

return Struct;
}));
