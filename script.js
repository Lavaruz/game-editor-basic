const c = document.getElementById("my-canvas")
const ctx = c.getContext("2d")
let img = new Image()
let imgSrc = ''

$("input[name=canvas-width]").val(c.width)
$("input[name=canvas-height]").val(c.height)

$("#button-change-canvas-size").click(function(){
    if(+$("input[name=canvas-width]").val() < 100 || +$("input[name=canvas-height]").val() < 100){
        $("#error").text('ERROR: Minimum canvas size 100x100 !!').removeClass("invisible")
    }else{
        $("#error").addClass("invisible")
        c.width = $("input[name=canvas-width]").val()
        c.height = $("input[name=canvas-height]").val()
    }
})

$("#button-file-upload").click(function(){
    $("#file-upload").click()
})
$("#button-image-property").click(function(){
    reDrawImage()
})
$("#file-upload").change(function(){
    const selectedFile = this.files[0]

    if (!selectedFile.type.startsWith('image/')) {
        $("#error").text('ERROR: Please upload an image file type !!').removeClass("invisible")
        $(this).val('')
    } else {
        $("#image-prop").removeClass("invisible")
        $("#error").addClass("invisible")
        const reader = new FileReader()
        reader.onload = function(event) {
            img = new Image()
            img.onload = function() {
                $("input[name=offset-x]").val(0)
                $("input[name=offset-y]").val(0)
                drawImage()
                $("#button-change-canvas-size").prop("disabled", true)
            }
            img.src = event.target.result
            imgSrc = img.src
        }
        reader.readAsDataURL(selectedFile)
    }
})

function drawImage() {
    const offsetX = $("input[name=offset-x]").val()
    const offsetY = $("input[name=offset-y]").val()
    let drawHeight, drawWidth

    ctx.clearRect(0, 0, c.width, c.height)

    if(img.width > c.width){
        drawWidth = c.width
        drawHeight = c.height
    }else{
        drawWidth = img.width
        drawHeight = img.height
    }
    
    $("input[name=image-width]").val(drawWidth)
    $("input[name=image-height]").val(drawHeight)
    
    
    
    if(+$("input[name=image-width]").val() !== drawWidth || +$("input[name=image-height]").val() !== drawHeight){
        drawWidth = $("input[name=image-width]").val()
        drawHeight = $("input[name=image-height]").val()
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}

function reDrawImage() {
    const offsetX = $("input[name=offset-x]").val()
    const offsetY = $("input[name=offset-y]").val()
    let drawHeight, drawWidth

    ctx.clearRect(0, 0, c.width, c.height)
    drawWidth = $("input[name=image-width]").val()
    drawHeight = $("input[name=image-height]").val()
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}