function readFile() {

    if (this.files && this.files[0]) {

        var FR = new FileReader();

        FR.addEventListener("load", function (e) {
            document.getElementById("img").src = e.target.result;
        });

        FR.readAsDataURL(this.files[0]);
        document.querySelector('.inp-img').classList.add('display-none');
    }
}
document.getElementById("upload").addEventListener("change", readFile);


