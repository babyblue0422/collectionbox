<%@ Page Language="C#" %>
<%@ Import Namespace='System' %>
<%@ Import Namespace='System.IO' %>
<%@ Import Namespace='System.Data' %>
<%@ Import Namespace='System.Collections' %>
<%@ Import Namespace='System.Configuration' %>
<%@ Import Namespace='System.Web' %>
<%@ Import Namespace='System.Web.UI' %>
<%@ Import Namespace='System.Web.UI.WebControls' %>
<%@ Import Namespace='System.Web.UI.HtmlControls' %>
<%@ Import Namespace='System.Collections.Specialized' %>
<%@ Import Namespace='uTRUST.DBAccess' %>
<%@ Import Namespace='uTRUST.UIControl' %>
<%@ Import Namespace='uTRUST.ReturnFunction' %>
<%@ Import Namespace='utc.Web' %>
<%@ Import Namespace='Newtonsoft.Json' %>
<%@ Import Namespace='Newtonsoft.Json.Linq' %>


<SCRIPT runat="server">
private void Page_Load(object sender, System.EventArgs e)
{
	// 參數設定
	string strFileUploadPath	= "";
	string strTargetDir			= "";
	string str_func_num			= "1";
	JObject result = new JObject();

	try
	{
		if ( null != Request.Params["CKEditorFuncNum"] ) str_func_num = Request.Params["CKEditorFuncNum"].ToString();
	}
	catch{};

	try
	{
		strFileUploadPath	= System.Web.Configuration.WebConfigurationManager.AppSettings["setVirtualDir"].ToString()+"/dispUploadBox/PJ-"+System.Configuration.ConfigurationSettings.AppSettings["strRefWebID"]+"/Ckeditor/";//本單元檔案上傳目錄位置
		strTargetDir		= Server.MapPath("~/dispUploadBox/PJ-"+System.Configuration.ConfigurationSettings.AppSettings["strRefWebID"]+"/Ckeditor/");
		if ( !Directory.Exists(strTargetDir) ) Directory.CreateDirectory(strTargetDir);
	}
	catch
	{
		uTRUST.AlertWrite.JScriptWrite.Write_Alert(this, "管理網站資訊遺失，請重新整理系統後再次操作。", "B");
		Response.End();
	};

	// 如果有上傳檔案
	if ( 0 < Request.Files.Count )
	{
		System.Web.HttpPostedFile oFile=Request.Files.Get("upload") ;

		// 防呆
		try
		{
			// 如果檔案確認有存在
			if ( 0 < oFile.ContentLength )
			{
				FileInfo myFileInfo		= new FileInfo(oFile.FileName);
				string strFileType		= myFileInfo.Extension.ToLower();//檔案類型
				string strNewFileName	= DateTime.Now.ToString("yyyyMMddHHmmssfff")+ strFileType;//給新檔名

				// 上傳限制判斷
				string strAllowFileExt	= ".JPG.GIF.PNG";
				string strRtn			= "";
				if (strAllowFileExt.IndexOf(myFileInfo.Extension.ToUpper()) < 0 ) strRtn = @"上傳檔案格式僅允許" + strAllowFileExt;
				int intMaxMB			= 1;
				if ((oFile.ContentLength / 1024 ) > intMaxMB * 1024) strRtn = @"上傳檔案 " + Convert.ToString(oFile.ContentLength / 1024 ) + "K 過大 !限制大小為 " + (intMaxMB*1024).ToString() + "K";

				// 判斷結果處理
				if ( "" != strRtn )
				{
					uTRUST.AlertWrite.JScriptWrite.Write_Alert(this, strRtn+"，請重新操作。", "B");
				}
				else
				{
					//存檔
					oFile.SaveAs(strTargetDir+strNewFileName) ;

					//寫入資料庫
					if ( "Y" == ConfigurationSettings.AppSettings.Get("setPicRecord").ToString() )
					{
						string SQLStr = "INSERT INTO dispPicRec (PicRecLocation,PicRecFileName) VALUES ('" + strFileUploadPath + "','"+strNewFileName+"')";
						string strDBID = DbData.InsertDataBaseDBID(SQLStr);
					};

					result.Add(new JProperty("uploaded", str_func_num));
					result.Add(new JProperty("fileName", strNewFileName));
					result.Add(new JProperty("url", strFileUploadPath+strNewFileName));

					Response.Write(result.ToString());
				};
			};
		}
		catch{};

	};
}
</SCRIPT>
