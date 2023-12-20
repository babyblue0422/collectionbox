/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// Register a templates definition set named "default".
CKEDITOR.addTemplates( 'default', {
	// The name of sub folder which hold the shortcut preview images of the
	// templates.
	imagesPath: CKEDITOR.getUrl( CKEDITOR.plugins.getPath( 'templates' ) + 'templates/images/' ),

	// The templates definitions.
	
	templates: [ 
	// 插入圖片圖說
	{
		title: "插入圖片圖說",
	    image: "utc-tem02.jpg",
		description: "上傳圖片寬度請>870px",
		html: 
		'<figure>' +
			'<img src="https://dummyimage.com/800X300/000/fff.jpg?text=width 大於 870px 時，請清除編輯器 影響資訊的 width, height 數字" alt="圖片">' +
			'<figcaption>圖片說明文字</figcaption>' +
		'</figure>'
    },
	// 引言/金句
	{
		title: "引言/金句",
	   	image: "utc-blockquote.png",
		description: "引經據典使用",
		html: 
		'<blockquote>' +
			'引言內容' + 
			'<span class="from">'+
			'- 出處' +
			'</span>' +
		'</blockquote>'
   },
	// 前言
	{
		title: "前言",
	   	image: "utc-foreword.png",
		description: "起個頭可以用",
		html: 
		'<p class="foreword">' +
		'前言內容' +
		'</p>'
   },
	// 參考資料
	{
		title: "參考資料",
			image: "utc-tips.png",
		description: "參考甚麼可以用",
		html: 
		'<p class="tip">參考資料</p>'
	},
	// 行內用圖片
	{
		title: "行內圖片",
		image: "utc-inlineimg.png",
		description: "插入行內圖片",
		html: 
		'<img class="img-icon" src="https://dummyimage.com/40X40/000/fff.jpg">'
	},

	
 ]
} );
