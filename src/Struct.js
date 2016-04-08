
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