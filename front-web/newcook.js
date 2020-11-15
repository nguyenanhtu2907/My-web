$(document).ready(function(){
    //append
    $(".add_material").click(function(){
      var material = document.getElementsByClassName('material_item');
      console.log(material.length);
      var material_html = '<div><li class="material_item"><input type="text" class="material_input" placeholder="250g bột" name = "nguyen_lieu' + material.length.toString() + '"><button class="material_delete_icon" ><i class="fas fa-times delete_icon" ></i></button>      </li>  </div>'
      $("ul.material_list").append(material_html);
    });
      //xóa
    $(this).on("click", ".material_delete_icon", function(){
      var target = $(this).parent().parent();
        target.remove();
    });
});




 // append và xóa các bước nấu ăn
 $(document).ready(function(){
    //append
  $(".add_step").click(function(){
    var step = document.getElementsByClassName('step_item');
    var step_html = '<li class="step_item">                       <div class="step_item-in">    <input type="text" id = "step_input' + step.length.toString() + '" class="step_item-input" placeholder="trộn bột và nước đến khi đặc lại" name="step">  <button class="step_delete_icon"><i class="fas fa-times delete_icon"></i></button>    </div> <div class="step_upload_image"> <input type="file" id ="step_image'+step.length.toString()+'" accept="image/*" name="image" onchange="preImg(this)">        <label for="step_image'+step.length.toString()+'" class="label_upload_image">        <img src="" alt="" class="step_image nodisplay">        <div>                 <i class="fas fa-camera step_cam_icon"></i>             </div>      </label>  </div></li>'
    $("ul.step_list").append(step_html);
  });
    //xóa
  $(this).on("click", ".step_delete_icon", function(){
    var target2 = $(this).parent().parent();
      target2.remove();
  });

  });


  //preview main cook image
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
let fileInput = document.getElementById("file_1");
fileInput.addEventListener("change", loader);


//preview step images

function preImg(e){
  
  
  var img = e.nextSibling.nextSibling.childNodes[1];
  var icon = img.nextSibling.nextSibling;
  console.log(img);
let file = e.files[0];		
    
  let reader = new FileReader();
  // console.log(reader);

    
reader.onload = function () {
// Hiển thị ảnh gốc
  var url = reader.result;
  img.src = url;	
  img.classList.remove("nodisplay");
  icon.innerHTML= "";

}
reader.readAsDataURL(file);
}












  