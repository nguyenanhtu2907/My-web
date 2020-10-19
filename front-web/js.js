var material = document.getElementsByClassName('material_list')[0];

$(document).ready(function(){

    $(".add_material").click(function(){
      $("ul.material_list").append(material.firstElementChild.innerHTML);
    });

    $(this).on("click", ".material_delete_icon", function(){
      var target = $(this).parent();
        target.remove();
    });
});




 var step = document.getElementsByClassName('step_list')[0];
 $(document).ready(function(){
    
  $(".add_step").click(function(){
    $("ul.step_list").append(step.firstElementChild.innerHTML);
  });

  $(this).on("click", ".step_delete_icon", function(){
    var target2 = $(this).parent().parent();
      target2.remove();
  });

  });






  