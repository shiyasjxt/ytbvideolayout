// Allowed Short Codes

// Video Item ID - {{Yt_Listitem_Id}}
// Video title - {{Yt_Video_Title}}
// Video Description - {{Yt_Video_Description}}
// Date Published - {{Yt_Date_Published}}
// Short Video URL - {{Yt_Short_Video_Url}}
// Video URL - {{Yt_Video_Url}}
// IFrame embed URL - {{Yt_Iframe_Url}}
// Medium Res Thumbnail - {{Yt_Medium_Thumbnail}}
// High Res Thumbnail - {{Yt_High_Thumbnail}}
// popup-id - {{Popup_Id}}

$(document).ready(function () {
    
    var playlistId = "PLm2XPIPBBfwl44EVg1uZ4J3U6ezeMq2P5";
    var section = 'featured';

    CreateYoutubeAPIAjaxRequest(playlistId, section);
    var playlistId = "PLm2XPIPBBfwl44EVg1uZ4J3U6ezeMq2P5&maxResults=50";
    section = 'fulllist';
    
    CreateYoutubeAPIAjaxRequest(playlistId, section);

        console.log("inside api call");
    
    });
    
    // This Method creates an AJAX request to Youtube Integration Service
    // if it is successful, API response (JSON) will be parsed and passed into populateContainer() Method
    function CreateYoutubeAPIAjaxRequest(playlistId, section) {
    
        console.log("CreateYoutubeAPIAjaxRequest() Initiated!");
    
        var formData = new FormData();
    
        // var playlistId = "PLm2XPIPBBfwkDeYsnP-8qBX_IpoTuxp3m";
        
        // var videosId = "Mntn0Hhbys8,r2ZRFJ-t3H4,V5EqSQVwj,YBHQbu5rbdQ,5XR7naZ_zZA,JGwWNGJdvx8,xFutjZEBTXs,2nBJ_FFQuLI,ZbZSe6N_BXs";
    
        var domain = "/YoutubeIntegration.asmx/GetPlaylistItems";
        // var domainVideos = "/YoutubeIntegration.asmx/GetVideos";
    
        formData.append("playlist_id", playlistId);
        // formData.append("videos_id", videosId);
    
        $.ajax({
            type: "POST",
            url: domain,
            data: formData,
            contentType: false,
            processData: false,
            success: function (msg) {
    
                console.log("Response Message: " + msg);
    
                if (msg != null) {
                    var result = $.parseJSON(msg);
                    populateContainer(result,section );
                } 
                else {
                    console.log("Error Occured! Check site Google API settings!");
                }
            }
        });
    
        console.log("End of CreateYoutubeAPIAjaxRequest() Initiation!");
    }
    
    // This Method allows developer to create a template HTML markup structure
    // Once the markup template is complete, it can be passed to GenerateHtmlContent() method for further processing
    function populateContainer(result, section) {
    
        console.log("populateContainer() Initiated!");
        var section;
        console.log(section);
        console.log(result);
        console.log(result.responseModelItems);
        
        
    
        var modelItems = result.responseModelItems;
        console.log(modelItems[0].listItemId);
            
        var populatedContent = "";

        var template ="";
        var template1 ="";
        
        if (section === 'featured'){

                template = `
                
                <div class="col-xs-6  yt-thumbnail-container">
                <a href="#popup-{{Popup_Id}}">
                <img src="{{Yt_Medium_Thumbnail}}" alt="{{Yt_Video_Title}}"/>                            
                </a>
            </div>
            <div id="popup-{{Popup_Id}}" class='hidden'>
                    <iframe width="560" height="315" src="{{Yt_Iframe_Url}}" allowfullscreen></iframe>
            </div>
            <div class="col-xs-6  yt-thumbnail-container">`;

            template1 = `
            <div class="col-xs-6  yt-thumbnail-container">
            <a href="#popup-{{Popup_Id}}">
            <img src="{{Yt_Medium_Thumbnail}}" alt="{{Yt_Video_Title}}"/>                            
            </a>
        </div>
        <div id="popup-{{Popup_Id}}" class='overlay item'>
            <div class="popup">
                <a class="close" href="#">&times;</a>
                <iframe width="560" height="315" src="{{Yt_Iframe_Url}}" allowfullscreen></iframe>
            </div>
        </div>`;
         
 

        } else 
        {
            template = `<div class="col-xs-4  yt-thumbnail-container">
            <a href="#popup-{{Popup_Id}}">
            <img src="{{Yt_Medium_Thumbnail}}" alt="{{Yt_Video_Title}}"/>                            
            </a>
        </div>
        <div id="popup-{{Popup_Id}}" class='overlay item'>
            <div class="popup">
                <a class="close" href="#">&times;</a>
                <iframe width="560" height="315" src="{{Yt_Iframe_Url}}" allowfullscreen></iframe>
            </div>
        </div>`;

        template1 = `<div class="col-xs-4  yt-thumbnail-container">
        <a href="#popup-{{Popup_Id}}">
        <img src="{{Yt_Medium_Thumbnail}}" alt="{{Yt_Video_Title}}"/>                            
        </a>
    </div>
    <div id="popup-{{Popup_Id}}" class='overlay item'>
        <div class="popup">
            <a class="close" href="#">&times;</a>
            <iframe width="560" height="315" src="{{Yt_Iframe_Url}}" allowfullscreen></iframe>
        </div>
    </div>`;
        }
    

    
        if (template != null) {
    
            populatedContent = GenerateHtmlContent(template.trim(), modelItems, template1.trim());
    
            if (populatedContent != null) {
                if (section === 'featured'){
                    $('#youtubeFeatured').append(populatedContent);
                    $('#youtubeFeatured').append('</div>');
                    
                } else 
                {
                    $('#youtubeContainer').append(populatedContent);                    
                }
                section =1;
            } 
            else {
                console.log("Populating Container Failed!");
            }
        } 
        else {
            console.log("Template variable is null");
        }
    
        console.log("End of populateContainer() Initiation!");
    }
    