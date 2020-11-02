$(document).ready(function(){
  
    $(".add_material").click(function(){
      var material = document.getElementsByClassName('material_item');
      console.log(material.length);
      var material_html = '<div><li class="material_item"><input type="text" class="material_input" placeholder="250g bột" name = "nguyen_lieu' + material.length.toString() + '"><button class="material_delete_icon" ><i class="fas fa-times delete_icon" ></i></button>      </li>  </div>'
      $("ul.material_list").append(material_html);
    });

    $(this).on("click", ".material_delete_icon", function(){
      var target = $(this).parent().parent();
        target.remove();
    });
});




 
 $(document).ready(function(){
    
  $(".add_step").click(function(){
    var step = document.getElementsByClassName('step_list');
    var step_html = '<div>    <li class="step_item"><div class="step_item-in"><input type="text" class="step_item-input" placeholder="trộn bột và nước đến khi đặc lại" name="step"> <button class="step_delete_icon"><i class="fas fa-times delete_icon" ></i></button>            </div>                                <div class="step_upload_image">                <input type="file" id="step_image" accept="image/*" name="image">                <label for="step_image" class="label_upload_image">                       <div class="step_label_item">                        <i class="fas fa-camera step_cam_icon"></i>                    </div>                                                                    </label>            </div>     </li></div>'
    $("ul.step_list").append(step_html);
  });

  $(this).on("click", ".step_delete_icon", function(){
    var target2 = $(this).parent().parent();
      target2.remove();
  });

  });









  