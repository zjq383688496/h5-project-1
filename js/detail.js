var Detail = {
	init: function () {
		this.$attention = $('#attention');
		this.$collect = $('#collect');
		this.$comment = $('#commentContent');
		this._cls = 's-active';

		this.bindEvent();
	},
	bindEvent: function () {
		var _this = this;

		// 关注
		this.$attention.bind('click', function () {
			_this.attentionFn($(this));
		});

		// 收藏
		this.$collect.bind('click', function () {
			_this.collectFn($(this));
		});

		// 评论提交
		this.$comment.bind('keydown', function (e) {
			_this.commentSumit(e, $(this));
		});
	},
	// 关注交互
	attentionFn:function (o) {
		var cls = this._cls;
		if (o.hasClass(cls)) {
			o.removeClass(cls);
		} else {
			o.addClass(cls);
		}
	},
	// 收藏交互
	collectFn:function (o) {
		var cls = this._cls;
		if (o.hasClass(cls)) {
			o.removeClass(cls);
		} else {
			o.addClass(cls);
		}
	},
	// 评论提交
	commentSumit: function (e, o) {
		if (e.keyCode === 13) {
			var val = o.val().trim();
			e.preventDefault();
			if (val) {
				// ajax 提交评论
				alert(val);
			} else {
				alert('评论不能为空!');
			}
		}
	}
}
$(function() {
	FastClick.attach(document.body);
	Detail.init();
});