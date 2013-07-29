// АВЛ - деревья (ABL - tree)
//http://learn.javascript.ru/play/4KcYu
function Node(key) {
	this.key = key;
	this.left = this.right = null;
	this.balance = 0;
}
function balance (node) {
		function deepth(node) {
          return (node) ? 1 + Math.max(deepth(node.left), deepth(node.right)) : 0;
		};
		return deepth(node.right) - deepth(node.left);
	};
Node.prototype.simpleRotation = function( node, to ) {
	var ato = (to == 'left') ? 'right' : 'left';
		var root = node[to];
		node[to] = root[ato];
		root[ato] = node;
		node.balance = balance(node);
		root.balance = balance(root);
		return root;
}
Node.prototype.doubleRotation = function ( node, to ) {
	
	var ato = (to == 'left') ? 'right' : 'left';
	var rootTo = node[to];
	var root = rootTo[ato];
	
	rootTo[ato] = root[to];
	node[to] = root[ato];
	root[to] = rootTo;
	root[ato] = node;
	
	rootTo.balance = balance(rootTo);
	node.balance = balance(node);
	root.balance = balance(root);
	return root;
}
Node.prototype.insert = function (node) {
	if ( this.key == node.key) return this;
	var to, result;
	to = (this.key < node.key) ? 'right' : 'left';
	
	//если есть поддеревья - спускаемся, если лист - добавляем ему узел
	//if there're  subtrees then we go down, else it's a leaf - add its the node
	if( this[to] ) {
		result = this[to].insert(node);
	} else {
		this[to] = node;
		this.balance = balance(this);
		return this;
	}
	
	
	this[to] = result;
	this.balance = balance(this);
	//длина поддерева не увеличилась ( deepth of the tree wasn't increased )
	// или (or)
	// длинна поддерева увеличилась, но баллансировка не нарушилась
	// ( deepth of the tree was increased but balance didn't break
	if(result.balance == 0 || this.balance == 0 || Math.abs(this.balance) == 1) {
		return this;
	}
	
	var rb = result.balance;
	var tb = this.balance;
	
	//простое вращение ( simple rotation)
	if( rb * tb > 0 ) {
		return this.simpleRotation(this, to);
	} else {
	//двойное вращение (double rotation)
		return  this.doubleRotation( this, to);
	}	
}
Node.prototype.remove = function (node) {

	function isLeaf(node) {
		return (node.left == null || node.right == null);
	}
	function getLeaf(node) {
		return (node.left) ? node.left : node.right;
	}
	function getMinNode(node) {
		if ( node.left ) {
			var b = node;
			var a = b.left;
			while(a.left) { b = a; a = a.left};
			b.left = a.right;
			a.right = node;
			b.balance = balance(b);
			return a;
		} else if( node.right) {
			return node.right
			} else { return node;};
	}
	function getMaxNode(node) {
		if ( node.right ) {
			var b = node;
			var a = b.right;
			while(a.right) { b = a; a = a.right};
			b.right = a.left;
			a.left = node;
			b.balance = balance(b);
			return a;
		} else if( node.left) {
			return node.left
			} else { return node;};
	}
	var getNode = {
		left:function(node) {
			if ( node.right ) {
				var b = node;
				var a = b.right;
				while(a.right) { b = a; a = a.right};
				b.right = a.left;
				a.left = node;
				b.balance = balance(b);
				return a;
			} else if( node.left) {
				return node.left
			} else { return node;};
		},
		right:function(node) {
			if ( node.left ) {
				var b = node;
				var a = b.left;
				while(a.left) { b = a; a = a.left};
				b.left = a.right;
				a.right = node;
				b.balance = balance(b);
				return a;
			} else if( node.right) {
				return node.right
			} else { return node;};
		}
	};
	var to = (this.key < node.key) ? 'right' : 'left';
	var ato = (to == 'left') ? 'right' : 'left';
	var curNode = this;
	if (this.key < node.key || this.key > node.key) {	
		if ( this[to] ) {
				if ( this[to].key != node.key )  {
					this[to] = this[to].remove(node);
				} else {
					var target = this[to];
					if( isLeaf(target) ) {
						this[to] = getLeaf(target);
					} else {
						//ищем лист для замены, спускаясь дальше
						var  a = getNode[to](target[to]); 
						a[ato] = target[ato];
						a.balance = balance(a);
						this[to] = a;
					}
				}
		}	
	} else {
			//искомый елемен является корнем
		if ( isLeaf(this) ) {
				return getLeaf(this);
		} else {
				var  a = getNode[to](this[to]);
				a[ato] = this[ato];
				a.balance = balance(a);
				if( a.balance == 2 ) {
					
				}
				return a;
		}
	}
	
	this.balance = balance(this);
	if ( Math.abs(this.balance) == 2)  {
		var rb = (this.balance > 0 ) ? this.right.balance : this.left.balance;
	    var tb = this.balance;
	    var to = (this.balance > 0 ) ? 'right' : 'left';
	    //простое вращение ( simple rotation)
	    if( rb >= 0 * tb > 0 || rb <= 0 * tb < 0) {
	    	return this.simpleRotation(this, to);
	    } else {
	    //двойное вращение (double rotation)
	    	return  this.doubleRotation( this, to);
	    }	
	}
	return this;
}
/*
Node.prototype.showTree = function(node,color, bgcolor) {
	 var node = node || this;
	 var bgcolor = bgcolor || '#ff0';
	 var color = color || 'green';
     var style = '"color:' + color + ';background-color:' + bgcolor + ';border-bottom:1px solid black;border-left:1px solid black;border-top:1px solid black;"';
	 var stringTree = '<ul>';
        if(node) {
          stringTree +='<li style=' + style +'>' + node.key + ', b:' + node.balance;
          if( node.right ) {
            stringTree += showTree(node.right,'red', '#09f');
          }
          if( node.left ) {
            stringTree += showTree(node.left, 'blue','red');
          }
        }
        return stringTree += '</ul>';                
} 
*/                                                  
function showTree(node, color, bgcolor) {
        var stringTree = '<ul>';
        if (node) {
          stringTree += '<li style="color:' + color + ';background-color:' + bgcolor + '">' + node.key + ', b:' + node.balance;
          if (node.right) {
            stringTree += showTree(node.right, 'red', '#09f');
          }
          if (node.left) {
            stringTree += showTree(node.left, 'blue', 'red');
          }
        }
        return stringTree += '</ul>';
    }