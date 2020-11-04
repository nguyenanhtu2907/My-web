$(document).ready(function () {
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

    //active action
    var info = document.getElementsByClassName("change_info");
    var pass = document.getElementsByClassName("change_pass");
    $(pass).click(function () { 
        if(info[0].classList.contains('active')){
            info[0].classList.remove('active');
            pass[0].classList.add('active');
            $("#upload_info").addClass("no_display");
            $("#upload_password").removeClass("no_display");
        }
      
    });
    $(info).click(function () { 
        if(pass[0].classList.contains('active')){
            pass[0].classList.remove('active');
            info[0].classList.add('active');
            $("#upload_info").removeClass("no_display");
            $("#upload_password").addClass("no_display");
        }
        
    });     
});
