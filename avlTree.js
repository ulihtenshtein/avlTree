// АВЛ - деревья (ABL - tree)
//http://learn.javascript.ru/play/4KcYu
function Node(key) {
	this.key = key;
	this.left = this.right = null;
	this.balance = 0;
	function deepth(node) {
          return (node) ? 1 + Math.max(deepth(node.left), deepth(node.right)) : 0;
    };
	function balance (node) {
		return deepth(node.right) - deepth(node.left);
	};
}
Node.prototype.simpleRotation = function( node, to ) {
	var ato = (to == 'left') ? 'right' : 'left';
		var root = node[to];
		node[to] = root[ato];
		root[ato] = node;
		node.balance = deepth(node.right) - deepth(node.left);
		root.balance = deepth(root.right) - deepth(root.left);
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
	
	rootTo.balance = deepth(rootTo.right) - deepth(rootTo.left);
	node.balance = deepth(node.right) - deepth(node.left);
	root.balance = deepth(root.right) - deepth(root.left);
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
		this.balance = deepth(this.right) - deepth(this.left);
		return this;
	}
	
	
	this[to] = result;
	this.balance = deepth(this.right) - deepth(this.left);
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
	function balance (node) {
		return deepth(node.right) - deepth(node.left);
	}
	if (this.key < node.key ) {
		
	if ( this.right ) {
			if ( this.right.key != node.key )  {
				this.right = this.right.remove(node);
			} else {
				var target = this.right;
				if( isLeaf(target) ) {
					this.right = getLeaf(target);
				} else {
				   //ищем лист для замены, спускаясь дальше
				  var  a = getMinNode(target.right); 
				  a.left = target.left;
				  a.balance = balance(a);
				  this.right = a;
				}
			}
		}
		
	} else if( this.key > node.key ) {
		if ( this.left ) {
			if( this.left.key != node.key ) {
				this.left = this.left.remove(node);
			} else {
				target = this.left;
				if( isLeaf(target) ) {
					this.left = getLeaf(target);
				} else {
					//ищем лист для замены, спускаясь дальше
					var   a = getMaxNode(target.left);
					a.right = target.right;
					a.balance = balance(a);
					this.left = a;
				}
			}
		}
	} else {
		//искомый елемен является корнем
		if ( isLeaf(this) ) {
			return getLeaf(this);
		} else {
			var  a = getMinNode(this.right);
			a.left = this.left;
			a.balance = balance(a);
			return a;
		}
	}
	this.balance = balance(this);
	if ( Math.abs(this.balance) == 2)  {
		var rb = (this.balance > 0 ) ? this.right.balance : this.left.balance;
	    var tb = this.balance;
	    var to = (this.balance > 0 ) ? 'right' : 'left';
	    //простое вращение ( simple rotation)
	    if( rb * tb > 0 ) {
	    	return this.simpleRotation(this, to);
	    } else {
	    //двойное вращение (double rotation)
	    	return  this.doubleRotation( this, to);
	    }	
	}
	return this;
}
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