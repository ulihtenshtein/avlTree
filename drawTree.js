var canvas; 
var ctx;
var opt = {};
var radius = 16;
var pxOnNode = 6*radius;
var delta = radius * 2.5;
	
function drawTree( node ) {
	if( canvas ) {
	    canvas.parentNode.removeChild(canvas);
	}
	canvas = document.createElement('canvas');
	ctx  = canvas.getContext('2d');
	
	var deepth = getDeepth( node ) + 1;
	
	var nodes = Math.pow( 2, deepth);

	
	var width = nodes * pxOnNode;
		//alert("deepth: " + deepth + ", nodes:" + nodes + ", width: " + width);
	canvas.width = width;
	canvas.height = width;
	
	document.body.appendChild(canvas);
	
	//ctx.beginPath();
	//ctx.moveTo(2 * radius, width - 2 * radius);
	
	
	opt.key = node.key;
	opt.x = width/2
	opt.y = 2 * radius;
	opt.radius = radius;
	draw(node);
		- Math.cos(Math.PI/3) * opt.radius
}

function getDeepth(node){
 return node.left ? 1 + getDeepth(node.left) : 0;
}

function drawNode(opt) {
	ctx.moveTo(opt.x, opt.y);
	ctx.font = 'normal bold ' + (2*opt.radius - 6) + 'px Arial';
	ctx.fillStyle = 'blue';
	ctx.textBaseline = 'middle';
	ctx.fillText(opt.key, opt.x - opt.radius/1.4, opt.y + 2);
	//opt.fillStyle = 'red';//'rgba(255,0,0,0.5)';
	ctx.moveTo(opt.x + opt.radius, opt.y);
	ctx.strokeStyle = 'red';
	ctx.arc(opt.x, opt.y, opt.radius, 0, Math.PI*2,false);
	ctx.stroke();
}
function drawLine(opt){
	ctx.moveTo(opt.x1, opt.y1);
	ctx.lineTo(opt.x2, opt.y2);
	ctx.stroke();
}
function draw( node ){

	if( node.left) {
	  opt.x = opt.x - pxOnNode/2;
	  opt.y = opt.y + pxOnNode;	  		
	  draw(node.left);	
	  //do some after
	  ctx.moveTo(opt.x - Math.cos(Math.PI/3) * opt.radius, opt.y - Math.sin(Math.PI/3) * opt.radius);
	  opt.x = opt.x + pxOnNode/2 + delta;
	  opt.y = opt.y - pxOnNode;
	  
	  ctx.lineTo(opt.x - Math.cos(Math.PI/3) * opt.radius , opt.y + Math.sin(Math.PI/3) * opt.radius);
	  ctx.stroke();
	}
		opt.key = node.key;
		drawNode(opt);

	//some for node
	
	if(node.right) {
		opt.x = opt.x + pxOnNode/2;
   	    opt.y = opt.y + pxOnNode;	
		draw(node.right);
		//doosmoam
		ctx.moveTo(opt.x + Math.cos(Math.PI/3) * opt.radius, opt.y - Math.sin(Math.PI/3) * opt.radius);
		opt.x = opt.x - pxOnNode/2;
	    opt.y = opt.y - pxOnNode;
	    ctx.lineTo(opt.x + Math.cos(Math.PI/3) * opt.radius , opt.y + Math.sin(Math.PI/3) * opt.radius);
	    ctx.stroke();
	}
}
