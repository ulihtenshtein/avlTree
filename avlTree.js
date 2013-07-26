// АВЛ - деревья (ABL - tree)
//http://learn.javascript.ru/play/4KcYu
function Node(key) {
	this.key = key;
	this.left = this.right = null;
	this.balance = 0;
	function deepth(node) {
          return (node) ? 1 + Math.max(deepth(node.left), deepth(node.right)) : 0;
    }
	function simpleRotation(node, to) {
		var ato = (to == 'left') ? 'right' : 'left';
		var root = node[to];
		node[to] = root[ato];
		root[ato] = node;
		//node.balance = root.balance = 0;
		node.balance = deepth(node.right) - deepth(node.left);
		root.balance = deepth(root.right) - deepth(root.left);
		return root;
	}
	function doubleRotation(node, to){
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
}
Node.prototype.simpleRotation = function( node, to ) {
	var ato = (to == 'left') ? 'right' : 'left';
		var root = node[to];
		node[to] = root[ato];
		root[ato] = node;
		//node.balance = root.balance = 0;
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
	var to, result;
	to = (this.key < node.key) ? 'right' : 'left';
	//если есть поддеревья - спускаемся, если лист - добавляем
	//if there's a trees that falling, else there's a leaf that add the node
	if( this[to] ) {
		result = this[to].insert(node);
	} else {
		this[to] = node;
		//(to == 'left') ? this.balance-- : this.balance++;
		this.balance = deepth(this.right) - deepth(this.left);
		return this;
	}
	//длина поддерева не увеличилась ( deepth of the tree wasn't increased )
	this.balance = deepth(this.right) - deepth(this.left);
	if(result.balance == 0 || this.balance == 0) {
		this[to] = result;
		return this;
	}
	// длинна поддерева увеличилась, но баллансировка не нарушилась
	// ( deepth of the tree was increased but balance didn't break
	if( Math.abs(this.balance) == 1 ) {
		this[to] = result;
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