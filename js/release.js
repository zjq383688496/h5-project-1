var Image = {
	// 0. 初始化
	init: function () {
		this._img = [];
	},
	// 1. 转换开始
	preview: function (file, quality) {
		this._quality = quality || 0.7;
		var _this = this;
		if (file.files && file.files[0]) {
			var file = this.filterType(file.files);
			this.base64Image(file);
		}
	},
	// 2. 过滤非图片文件
	filterType: function (file) {
		var _img = [];
		var len = file.length;
		for (var i = 0; i < len; i++) {
			var type = file[i].type;
			if (type.indexOf('image') > -1) {
				_img.push(file[i]);
			}
		}
		return _img;
	},
	// 3. 转换base64
	base64Image: function (file) {
		var _this = this;
		var _img = [];
		var _init = 0;
		var len  = file.length;
		if (len) {
			for (var i = 0; i < len; i++) {
				var reader = new FileReader();
				reader.readAsDataURL(file[i]);
				reader.onload = function (e) {
					_init++;
					_img.push(e.target.result);
					if (_init === len) {
						_this.canvas(_img);
						// 删除input节点 防止用户选择在此选择同一张图片 导致change事件不触发
						$('#insertImg').remove();
						$('.insert-img').append('<input type="file" id="insertImg" accept="image/*" onchange="Image.preview(this, 0.5);">');
					}
				}
			}
		} else {
			alert('文件格式不正确!');
		}
	},
	// 4. 图片数组传入canvas
	canvas: function (img) {
		var len = img.length;
		for (var i = 0; i < len; i++) {
			this.canvasChange(img[i]);
		}
	},
	// 图片进行canvas处理
	canvasChange: function (src) {
		var _this = this;
		var img = document.createElement('img');
		img.src = src;
		img.onload = function () {
			var w = img.width > 690? 690: img.width;
			var z = w/img.width;
			var h = img.height*z;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(img, 0, 0, w, h);
			_this.compressionImg(canvas, w, h);
		}
	},
	// 图片压缩
	compressionImg: function (canvas, w, h) {
		var _this = this;
		var ctx = canvas.getContext('2d');
		var img = document.createElement('img');
		// 质量控制
		img.src = canvas.toDataURL('image/jpeg', this._quality);
		img.onload = function () {
			_this._img.push(img.src);

			// 添加ajax请求
			_this.insertImg(img.src, w, h);
		}
	},
	// 插入图片
	insertImg: function (url, w, h) {
		$('#editor').focus();
		var range = window.getSelection().getRangeAt(0);
		if (range) {
			var img = document.createElement('img');
			img.width = w/2;
			img.height = h/2;
			img.src = url;
			range.surroundContents(img);
		} else {
			alert('请选择插入位置!');
		}
	},
	// 发送
	send: function () {
		var content = $('#editor').html();
		alert(content);
	}
}
Image.init();