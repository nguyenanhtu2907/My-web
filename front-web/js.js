var material = document.getElementsByClassName('material_list')[0];

$(document).ready(function(){
    $(".add_material").click(function(){
      $("ul.material_list").append(material.innerHTML);
    });
  });

var step = document.getElementsByClassName('step_list')[0];

$(document).ready(function(){
    $(".add_step").click(function(){
      $("ul.step_list").append(step.innerHTML);
    });
  });

var step_item = step.getElementsByClassName('step_item');
function deleteN(this){
  this.parentNode.parentNode.();
}


  