const uploadField = document.getElementById("file-inputfield");

uploadField.onchange = function() {
    if(this.files[0].size > 1000){
       alert("Your File is above 1000b/1Kb and is too large!");
       this.value = "";
    };
};

