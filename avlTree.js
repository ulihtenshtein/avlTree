// АВЛ - деревья (ABL - tree)
//http://learn.javascript.ru/play/4KcYu
function Node(key) {
	this.key = key;
	this.left = this.right = null;
	this.balance = 0;
}
Node.prototype.insert = function (node) {
	function deepth(node) {
          if( node ) {
            return 1 + Math.max(deepth(node.left), deepth(node.right));
          }
          return 0;
        }
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
	if(result.balance == 0) {
		this[to] = result;
		return this;
	}
	//(to == 'left') ? this.balance-- : this.balance++;
	this.balance = deepth(this.right) - deepth(this.left);
	// длинна поддерева увеличилась, но баллансировка не нарушилась
	// ( deepth of the tree was increased but balance didn't break
	if( Math.abs(this.balance) == 1 ) {
		this[to] = result;
		return this;
	}
	var rb = result.balance;
	var tb = this.balance;
	
	//простое вращение ( simple rotation)
	if( rb * tb) {
		var ato = (to == 'left') ? 'right' : 'left';
		var root = this[to];
		this[to] = root[ato];
		root[ato] = this;
		this.balance = root.balance = 0;
		return root;
	} else {
	//двойное вращение (double rotation)
		var ato = (to == 'left') ? 'right' : 'left';
		var rootTo = this[to];
		var root = rootTo[ato];
		
		rootTo[ato] = root[to];
		this[to] = root[ato];
		root[to] = rootTo;
		root[ato] = this;
		if(root.balance < 0 ) {
			rootTo.balance = (to == 'left')? 0:1;
			this.balance = (to == 'left')? 1:0;
		} else {
			rootTo.balance = (to == 'left')? -1:0;
			this.balance = (to == 'left')? 0:-1;
		}
		root.balance = 0;
		return root;
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