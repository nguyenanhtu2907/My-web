

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }//lấy giá trị page
};
var pagePT = getUrlParameter('page');

$(document).ready(function () {
    

    //disabled các nút trước sau
    if(pagePT.toString() == "1") {
        $(".pre").addClass("disabled");
    }
    else if(pagePT.toString() == "3"){
        $(".next").addClass("disabled");
    }
       //khi bấm nút next 
    var next_page = Number(pagePT) + 1;
    $(".next .page-link").attr("href","information.html?page=" + next_page.toString());

    var pre_page = Number(pagePT) - 1;
    $(".pre .page-link").attr("href", "information.html?page=" + pre_page.toString());
});


//preview image
var loader = function (evt){
    let file = evt.target.files;
    let output = document.getElementById("selector");
    if(file[0].type.match("image")) { 
        let reader = new FileReader();
        reader.addEventListener("load", function(e) {
            let data = e.target.result;
            let image = document.createElement("img");
            image.src = data;
            output.innerHTML = "";
            output.insertBefore(image,null);
            output.classList.add("image")
        });
        reader.readAsDataURL(file[0]);
    }
}
let fileInput = document.getElementById("avatar");
fileInput.addEventListener("change", loader);