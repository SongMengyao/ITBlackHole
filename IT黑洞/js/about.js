var Oz, Ov;
var obj = [];
var K = 0;
var img, scr, W, H;
var SP = 40; /* speed */
var dz = false;

/* html positioning */
position = function(obj, x, y, w, h)
{
	with(obj.style){
		left = Math.round(x) + "px";
		top = Math.round(y) + "px";
		width = Math.round(w) + "px";
		height = Math.round(h) + "px";
	}
}

/* create object instances */
function Cobj(parent, N, x, y, w, h)
{
	this.zoomed = (parent ? 0 : 1);
	obj[K] = this;
	this.K = K ++;
	this.parent = parent;
	this.children = [];
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.vx = 0;
	this.vy = 0;
	this.vw = 0;
	this.vh = 0;
	this.xi = 0;
	this.yi = 0;
	this.wi = 0;
	this.hi = 0;
	this.x1 = 0;
	this.y1 = 0;
	this.w1 = 0;
	this.h1 = 0;
	this.x0 = 0;
	this.y0 = 0;
	this.w0 = 0;
	this.h0 = 0;
	this.imgsrc = img[N];

	/* create HTML elements */
	this.img = document.createElement("img");
	this.img.src = this.imgsrc.src;
	this.img.obj = this;
	scr.appendChild(this.img);
	this.spa = document.createElement("span");
	this.spa.style.cursor = "pointer";
	this.spa.obj = this;
	scr.appendChild(this.spa);
	if (parent) parent.children.push(this);

	/* Flickr */
	this.blink = function()
	{
		with(this)
		{
			position(spa, x0, y0, w0, h0);
			spa.style.visibility = "visible";
			img.style.cursor = "pointer";
			setTimeout("obj[" + K + "].spa.style.visibility='hidden'", 128);
		}
	}

	/* display image & children */
	this.display = function(zoomed)
	{
		with(this)
		{
			position(img, x0, y0, w0, h0);
			img.style.visibility = "visible";
			if (parent &&  ! zoomed)
			{
				blink();
				Ov = img;
			}
		}
	}

	/* init zoom */
	this.init_zoom = function(d)
	{
		with(this)
		{
			w1 = imgsrc.width;
			h1 = imgsrc.height;
			x1 = (W - w1) / 2;
			y1 = (H - h1) / 2;
			x0 = (parent ? x + parent.x1 : (W - w1) / 2);
			y0 = (parent ? y + parent.y1 : (H - h1) / 2);
			w0 = (parent ? w : w1);
			h0 = (parent ? h : h1);
			xi = d > 0 ? x0 : x1;
			yi = d > 0 ? y0 : y1;
			wi = d > 0 ? w0 : w1;
			hi = d > 0 ? h0 : h1;
			vx = d * (x1 - x0) / SP;
			vy = d * (y1 - y0) / SP;
			vw = d * (w1 - w0) / SP;
			vh = d * (h1 - h0) / SP;
			parent.vx = d * ((x1 - (x * w1 / w0)) - parent.x1) / SP;
			parent.vy = d * ((y1 - (y * h1 / h0)) - parent.y1) / SP;
			parent.vw = vw * (parent ? (parent.w1 / w) : 0);
			parent.vh = vh * (parent ? (parent.h1 / h) : 0);
		}
	}

	/* animate zoom in - out */
	this.zoom = function()
	{
		with(this)
		{
			xi += vx;
			yi += vy;
			wi += vw;
			hi += vh;

			parent.xi += parent.vx;
			parent.yi += parent.vy;
			parent.wi += parent.vw;
			parent.hi += parent.vh;

			position(img, xi, yi, wi, hi);
			position(parent.img, parent.xi, parent.yi, parent.wi, parent.hi);

			if ((zoomed == 0 && wi > w0 - vw) || (zoomed == 1 && wi < w1 - vw))
			{
				setTimeout("obj[" + K + "].zoom()", 16);
			}
			else
			{
				dz = false;
				for (var i in Oz.children)
				{
					Oz.children[i].init_zoom();
					Oz.children[i].display(false, false);
				}
			}
		}
	}

	/* mouse events */
	this.img.onmouseover = function()
	{
		if (this != Ov) with(this.obj) if (parent &&  ! zoomed &&  ! dz) blink();
		Ov = this;
		return false;
	}

	this.img.onclick = function()
	{
		with(this.obj)
		{
			if (parent && !dz && imgsrc.complete)
			{
				if (zoomed == 1)
				{
					/* zoom out */
					Oz = this.obj.parent;
					zoomed = 0;
					init_zoom( -1);
					for (var i in children) children[i].img.style.visibility = "hidden";
					parent.zoomed = 1;
					dz = true;
					zoom();
				}
				else if (zoomed == 0)
				{
					/* zoom in */
					Oz = this.obj;
					img.style.cursor = "crosshair";
					zoomed = 1;
					init_zoom(1);
					for (var i in parent.children)
					{
						if (this.obj != parent.children[i])
							parent.children[i].img.style.visibility = "hidden";
					}
					parent.zoomed =  -1;
					dz = true;
					zoom();
				}
			}
		}
		return false;
	}

	this.spa.onmousedown = function()
	{
		this.style.visibility="hidden";
		this.obj.img.onclick();
		return false;
	}
}

/* initialization */
/* must start after the first image is loaded */
function starter()
{
	scr = document.getElementById("screen");
	img = document.getElementById("images").getElementsByTagName("img");
	W = parseInt(scr.style.width);
	H = parseInt(scr.style.height);

	/* ==== tree-zoom ==== */
	//  new Cobj(parent, image, x, y, w, h)
	O = new Cobj(0, 0, 0, 0, 0, 0);
		O0 = new Cobj(O, 1, 127, 98, 181, 134);
			O1 = new Cobj(O0, 2, 158, 150, 85, 155);
				O11 = new Cobj(O1, 4, 136, 98, 80, 196);
					O111 = new Cobj(O11, 5, 20, 154, 70, 57);
						O1111 = new Cobj(O111, 6, 161, 137, 154, 76);
					O112 = new Cobj(O11, 11, 155, 154, 70, 57);
						O1121 = new Cobj(O112, 12, 273, 116, 49, 72);
			O2 = new Cobj(O0, 3, 281, 150, 90, 154);
				O21 = new Cobj(O2, 7, 35, 295, 133, 82);
					O211 = new Cobj(O21, 15, 316, 183, 20, 36);
				O22 = new Cobj(O2, 8, 179, 295, 127, 79);
					O221 = new Cobj(O22, 13, 132, 84, 54, 102);
						O2211 = new Cobj(O221, 14, 6, 234, 69, 50);
							O22111 = new Cobj(O2211, 14, 267, 90, 135, 98);
				O23 = new Cobj(O2, 9, 92, 148, 138, 76);
					O231 = new Cobj(O23, 10, 249, 106, 83, 65);
						O2311 = new Cobj(O231, 0, 120, 87, 57, 59);

	/* display */
	O.init_zoom(1);
	O.display(true);
	for (var i in O.children)
	{
		O.children[i].init_zoom(1);
		O.children[i].display(true);
	}
}
