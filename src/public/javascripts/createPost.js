var material = document.getElementsByClassName('material_list')[0];
$(document).ready(function () {
  $(".add_material").click(function (e) {
    e.preventDefault();
    $("ul.material_list").append(material.firstElementChild.innerHTML);
  });
  $(this).on("click", ".material_delete_icon", function (e) {
    e.preventDefault();
    var target = $(this).parent();
    target.remove();
  });
});

var step = document.getElementsByClassName('step_list')[0];
var index = 1;
$(document).ready(function () {
  $(".add_step").click(function (e) {
    e.preventDefault();
    var stepAppended = `
    <li class="step_item">
        <div class="step_item-in">
            <button class="step_delete_icon"><i class="fas fa-times delete_icon"></i></button>
            <input type="text" class="step_item-input" placeholder="trộn bột và nước đến khi đặc lại"
                name="steps">
        </div>
        <div class="step_upload_image">
            <input class="stepimgs" type="file" id="stepimg${index}" accept="image/*" name="stepimgs">
            <label for="stepimg${index}" class="label_upload_image">
                <div class="step_label_item">
                    <i class="fas fa-camera step_cam_icon"></i>
                </div>
            </label>
            <input type="text" class="steptext" name="steps" style="display: none;">
            
        </div>
    </li>
    `;
    $("ul.step_list").append(stepAppended);
    document.querySelector(`#stepimg${index}`).addEventListener('change', handleFileSelect, false);
    index++;
  });
  $(this).on("click", ".step_delete_icon", function (e) {
    e.preventDefault();
    if (document.getElementsByClassName('step_list')[1]) {
      var target2 = $(this).parent().parent();
      target2.remove();
    }
  });
});
$('btn-submit').click(function () {
  const formElement = document.forms[0];
  formElement.onsubmit = function (e) {
    formElement.submit();
  }
})


document.querySelector('#stepimg').addEventListener('change', handleFileSelect, false);
function handleFileSelect(evt) {
  var f = evt.target.files[0]; 
  console.log(evt.target) 
  var reader = new FileReader();

  reader.onload = (function() {
    return function(e) {
      evt.target.parentNode.querySelector('.steptext').value = e.target.result;
    };
  })(f);

  reader.readAsDataURL(f);
}




document.querySelector('#thumbnailimg').addEventListener('change', function(evt){
  var f = evt.target.files[0];
  
  var reader = new FileReader();

  reader.onload = (function() {
    return function(e) {
      evt.target.parentNode.querySelector('.thumbnail').value = e.target.result;
    };
  })(f);

  reader.readAsDataURL(f);
}, false);










