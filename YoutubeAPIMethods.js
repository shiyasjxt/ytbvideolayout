// This method first matches shortcode structure of the defined template
// Afterwards the shortcode stricture is matched, matching shortcodes will be populated with valid content from the AJAX response
// Once shortcodes are replaced with valid content, it will return a generated HTML markup that can be assigned to a DOM element 
function GenerateHtmlContent(htmlTemplate, modelItems, htmlTemplate1) {
    
        console.log("GenerateHtmlContent() Initiated!");
    
        var htmlString = "";
        var finalHtmlString = "";
    
        var pattern = /\{\{[a-z_A-z]+\}\}/g;
    
        var MatchedResults = htmlTemplate.match(pattern);
    
        for (var i = 0; i < modelItems.length; i++) {
    
            for (var j = 0; j < MatchedResults.length; j++) {
    
                if (j == 0) {
                    htmlString = htmlTemplate;
                } ;

                if (j == 0 && i > 0) {
                    htmlString = htmlTemplate1;
                } ;

    
                switch (MatchedResults[j].trim()) {
    
                    case '{{Yt_Listitem_Id}}':
                        htmlString = htmlString.replace("{{Yt_Listitem_Id}}", modelItems[i].listItemId);
                        break;
    
                    case '{{Yt_Video_Title}}':
                        htmlString = htmlString.replace("{{Yt_Video_Title}}", modelItems[i].title);
                        break;
    
                    case '{{Yt_Video_Description}}':
                        htmlString = htmlString.replace("{{Yt_Video_Description}}", modelItems[i].videoDescription);
                        break;
    
                    case '{{Yt_Date_Published}}':
                        htmlString = htmlString.replace("{{Yt_Date_Published}}", modelItems[i].datePublished);
                        break;
    
                    case '{{Yt_Short_Video_Url}}':
                        htmlString = htmlString.replace("{{Yt_Short_Video_Url}}", modelItems[i].shortVideoUrl);
                        break;
    
                    case '{{Yt_Video_Url}}':
                        htmlString = htmlString.replace("{{Yt_Video_Url}}", modelItems[i].videoUrl);
                        break;
    
                    case '{{Yt_Short_Video_Url}}':
                        htmlString = htmlString.replace("{{Yt_Short_Video_Url}}", modelItems[i].shortVideoUrl);
                        break;
    
                    case '{{Yt_Iframe_Url}}':
                        htmlString = htmlString.replace("{{Yt_Iframe_Url}}", modelItems[i].iFrameEmbedUrl);
                        break;
    
                    case '{{Yt_Medium_Thumbnail}}':
                        htmlString = htmlString.replace("{{Yt_Medium_Thumbnail}}", modelItems[i].mediumResolutionthumbnailUrl);
                        break;
    
                    case '{{Yt_Medium_Thumbnail}}':
                        htmlString = htmlString.replace("{{Yt_High_Thumbnail}}", modelItems[i].highResolutionthumbnailUrl);
                        break;
    
                    case '{{Popup_Id}}':
                        htmlString = htmlString.replace("{{Popup_Id}}", i);
                        break;
                }
            }
    
            finalHtmlString += htmlString;
        }
    
        console.log("End of GenerateHtmlContent() Initiation!");
    
        return finalHtmlString;
    }