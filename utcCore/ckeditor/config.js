/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
  // Define changes to default configuration here.
  // For complete reference see:
  // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

  // The toolbar groups arrangement, optimized for two toolbar rows.
  config.toolbarGroups = [
    { name: "tools", groups: ["tools"] },
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["undo", "clipboard"] },
    {
      name: "editing",
      groups: ["find", "selection", "spellchecker", "editing"],
    },
    { name: "forms", groups: ["forms"] },
    { name: "links", groups: ["links"] },
    "/",
    { name: "insert", groups: ["insert"] },
    { name: "others", groups: ["others"] },
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
    },
    { name: "styles", groups: ["styles"] },
    { name: "colors", groups: ["colors"] },
    { name: "about", groups: ["about"] },
  ];

  // 隱藏工具列項目
  //Styles樣式功能若開放，相關設定位於style.js
  config.removeButtons = "Underline,Subscript,Superscript,About,SpecialChar,Scayt,Outdent,Indent,Styles";

  // Set the most common block elements. 2019/10/16 提供客戶下拉標籤
  config.format_tags = "p;h2;h3;h4";

  // Simplify the dialog windows.
  config.removeDialogTabs = "image:advanced;link:advanced";

  // size
  config.height = "250";

  // 2019/10/16 擴充套件
  // config.extraPlugins = 'videodetector,templates,bootstrapTabs,bt_table,btgrid';
  // config.extraPlugins = "videodetector,templates,justify,colorbutton,panelbutton,floatpanel,panel,button,dialogui,dialog,colordialog";
  // videodetector影片嵌入/templates樣板/justify對齊/colorbutton,panelbutton,floatpanel,panel,button,dialogui,dialog,colordialog顏色選擇面板

  // 2019/10/16 切換原始碼會濾掉一些不允許的標籤，需要加入如 figure 圖說標籤
  config.allowedContent = {
    $1: {
      // Use the ability to specify elements as an object.
      elements: CKEDITOR.dtd,
      attributes: true,
      styles: true,
      classes: true,
    },
  };
  config.disallowedContent = "script; *[on*]";
  config.extraAllowedContent =
    "iframe; figure; figcaption; caption; div(*); p(*); span(*); blockquote(*);";

  // 2019/10/16 預設插入範本 取消勾選取代內容
  config.templates_replaceContent = false;

  // 2019/10/16 上傳圖片的程式檔

  //指定上傳的程式位址 (開啟圖片及超連結檔案上傳)
  config.filebrowserUploadUrl = "/dispProject/js/ckeditor/upload.aspx";
  config.filebrowserImageUploadUrl = "/dispProject/js/ckeditor/upload.aspx";

  // 2019/10/16 可自定義 class 加入下拉樣式選單，須同步更動 ckeditor.js
  // config.format_urlList = { element: 'div', attributes: { 'class': 'url-list' }, styles: { 'color': '#0071ba' } };
  // config.format_listDisc = { element: 'div', attributes: { 'class': 'list-disc' }, styles: { 'color': '#0071ba' } };
  // config.format_listUpper = { element: 'div', attributes: { 'class': 'list-upper' }, styles: { 'color': '#ff7546' } };
  // config.format_listNum = { element: 'div', attributes: { 'class': 'list-num' }, styles: { 'color': '#8c2912' } };
  // config.format_pDataform = { element: 'p', attributes: { 'class': 'datafrom' }, styles: { 'background-color': 'Gray' } };
  // config.format_pNodata = { element: 'p', attributes: { 'class': 'nodata' }, styles: { 'border': '#5dddd3 dashed 3px' } }
};
