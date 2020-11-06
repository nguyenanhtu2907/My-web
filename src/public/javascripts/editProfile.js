$(document).ready(function () {
    var loader = function (evt){
        let file = evt.target.files;
        let output = document.getElementById("selector");
        if(file[0].type.match("image")) { 
            let reader = new FileReader();
            reader.addEventListener("load", function(e) {
                let data = e.target.result;
                let image = document.createElement("img");
                image.src = data;
                document.querySelector('#avatar_text').value=data;
                output.innerHTML = "";
                output.insertBefore(image,null);

            });
            reader.readAsDataURL(file[0]);
        }
    }
    let fileInput = document.getElementById("avatar");
    fileInput.addEventListener("change", loader);



    var info = document.getElementsByClassName("change_info");
    var pass = document.getElementsByClassName("change_pass");
    $(pass).click(function () { 
        if(info[0].classList.contains('active')){
            info[0].classList.remove('active');
            pass[0].classList.add('active');
            $("#upload_info").addClass("no_display");
            $("#upload_password").removeClass("no_display");
        }
        history.pushState({edit: 1}, '', '?type=password')
    });
    $(info).click(function () { 
        if(pass[0].classList.contains('active')){
            pass[0].classList.remove('active');
            info[0].classList.add('active');
            $("#upload_info").removeClass("no_display");
            $("#upload_password").addClass("no_display");
        }
        history.pushState({edit: 1}, '', '?type=information')
    });     
});
