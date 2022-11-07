let textMessage=""
let productFileName=""

const onLinkClick=(event)=> {
  document.getElementById("linkWhatsapp").style.display="none";
  document.getElementById("linkUrl").style.display="";
  document.getElementById('whatsappTab').classList.remove("active");
  document.getElementById("linkTab").className="active";
  document.getElementById("errorMsg").innerHTML="";
  document.getElementById("errorMsg").style.color="white";
  document.getElementById("attachQRCode").setAttribute("disabled","true")
}

const onWhatsappClick=(event)=> {
  document.getElementById("linkUrl").style.display="none";
  document.getElementById("errorMsg").innerHTML="";
  document.getElementById("errorMsg").style.color="white";
  document.getElementById("linkWhatsapp").style.display="";
  document.querySelector('li').classList.remove("active");
  document.getElementById("whatsappTab").className="active";
  document.getElementById("attachQRCode").setAttribute("disabled","true")
}

const handleCountryCodeChange=(event)=>{

  const countryCode = document.getElementById("countryCode").value;
  if(countryCode==="+65"){
    document.getElementById("whatsappNumber").setAttribute("maxlength","8");
  }
  else{
    document.getElementById("whatsappNumber").setAttribute("maxlength","10");
  }
  document.getElementById("whatsappNumber").value='';


}

const onClickGenerateQR= async(event)=>{

  const activeTab=document.getElementsByClassName("active")[0].innerText.trim()

  // let generated=false;
  let text=""
  const errorField=document.getElementById("errorMsg");
  if(activeTab==="link"){
    text=document.getElementById("linkAddress").value;
    var linkRegex='^https?:\\/\\/((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$';
    linkRegex = new RegExp(linkRegex,"i");
    if(!linkRegex.test(text)){
      errorField.innerHTML="Invalid URL"
      errorField.style.color="red"
      return;
    }
    else{
      errorField.innerHTML=""
      errorField.style.color="white"
    }

  }
  else{
    const countryCode = document.getElementById("countryCode").value;
    const whatsappNumber=document.getElementById("whatsappNumber").value+"";
    const whatsappMessage=document.getElementById("whatsappMsg").value+"";

    if(whatsappNumber.length>=1){
      var regmm='^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
      var regmob = new RegExp(regmm);
      if(!regmob.test(whatsappNumber)){
        event.preventDefault();
        errorField.innerHTML="Invalid phone number"
        errorField.style.color="red"
      }
      else{
        if(whatsappMessage.length===0){
          errorField.innerHTML="Message required"
          errorField.style.color="red"
          return;
        }
        else{
          errorField.innerHTML=""
          errorField.style.color="white"
          if(countryCode && whatsappNumber && whatsappMessage ){
           text="https://wa.me/"+countryCode+whatsappNumber+"?text="+whatsappMessage;
          }
        }
        
        
      }

    }
    else{
      errorField.innerHTML="Phone number required"
      errorField.style.color="red"
    }

  }

  if(text){
    textMessage=text;
    document.getElementById("qrCodeDiv").innerHTML='';
    document.getElementById("qrCodeDivBlank").classList.remove("d-block")
    document.getElementById("qrCodeDivBlank").classList.add("d-none")
    var qrcode = await new QRCode(document.getElementById("qrCodeDiv"), {
      text: text,
      width: 300,
      height: 300,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H,
    });
    if(qrcode){
      document.getElementById("attachQRCode").removeAttribute("disabled")
      document.getElementsByClassName("downloadBtn")[0].removeAttribute("disabled")
      document.getElementsByClassName("downloadBtn")[1].removeAttribute("disabled")
    }
    document.getElementById("qrCodeDiv").children[1].classList.add("mx-auto")
    document.getElementById("qrCodeDiv").children[1].classList.add("d-block")
    document.getElementById("qrCodeDiv").children[1].setAttribute("draggable","false")
    document.getElementById("qrCodeDiv").children[1].setAttribute("id","qrCode")
    document.getElementById("qrCodeDiv").children[1].setAttribute("height","300")
    document.getElementById("qrCodeDiv").children[1].setAttribute("width","300")
  }

}

const handleAttachQRCodeClick=(event)=>{
    const qrCodeSrc=document.getElementById("qrCode").getAttribute("src");
    const qrCodeDivTitle=document.getElementById("qrCodeDiv").getAttribute("title");
    document.getElementById("addQrOnProduct").style="";
    document.getElementById("addQrOnProduct").classList.remove("d-none");
    document.getElementById("createQrCode").classList.add("d-none");
    document.getElementById("draggableQrCode").setAttribute("src",qrCodeSrc)
    document.getElementById("draggableContainer").setAttribute("title",qrCodeDivTitle)

}

const handleCreateNewQRClick=(event)=>{
    document.getElementById("preview").innerHTML=''
    document.getElementById("qrCodeDiv").innerHTML=''
    document.getElementById("qrCodePosition").selectedIndex=0;
    document.getElementById("preview").style="";
    document.getElementById("uploadFile").value=''
    document.getElementById("productNaturalImage").setAttribute("src","")
    document.getElementById("draggableQrCode").setAttribute("src","")
    document.getElementById("qrCodeDivBlank").classList.remove("d-none")
    document.getElementById("qrCodeDivBlank").classList.add("d-block")
    document.getElementsByClassName("downloadBtn")[0].setAttribute("disabled","true")
    document.getElementsByClassName("downloadBtn")[1].setAttribute("disabled","true")
    document.getElementById("downloadMergeImagePng").setAttribute("disabled","true")
    document.getElementById("downloadMergeImageSvg").setAttribute("disabled","true")
    document.getElementById("attachQRCode").setAttribute("disabled","true")
    document.getElementsByClassName("dragBox")[0].classList.remove("packImgUploaded")
    document.getElementById("addQrOnProduct").classList.add("d-none");
    document.getElementById("createQrCode").classList.remove("d-none")
}

const dragNdrop=(event)=> {
    var fileName = URL.createObjectURL(event.target.files[0]);
    productFileName=event.target.files[0].name.split(".")[0];
    var preview = document.getElementById("preview");
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    previewImg.setAttribute("z-index","-100")
    previewImg.setAttribute("id","productImage")
    previewImg.style.width="100%"
    document.getElementsByClassName("dragBox")[0].classList.add("packImgUploaded")
    document.getElementById("draggableQrCode").setAttribute("draggable",true);
    document.getElementById("downloadMergeImagePng").removeAttribute("disabled")
    document.getElementById("downloadMergeImageSvg").removeAttribute("disabled")
    if(preview.children.length>1){
      preview.children[0].remove()
      preview.height="auto"
      document.getElementById("draggableQrCode").setAttribute("draggable",false);
      document.getElementById("draggedQRCode").removeAttribute("top")
      document.getElementById("draggedQRCode").removeAttribute("right")
    }
    else{
      preview.innerHTML = "";
    }
    preview.insertBefore(previewImg, preview.firstChild);

    setTimeout(() => {
      setQRPosition();
    }, 100);

}

const drag=()=> {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}

const drop=()=> {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
    setQRPosition();

}

const onDragStart=(event)=> {
  event
    .dataTransfer
    .setData('qrCodeDrag', event.target.id);
}

const onDragOver=(event)=> {
  event.preventDefault();
}

const onDrop=(event)=> {
  const id = event
    .dataTransfer
    .getData('qrCodeDrag');
    const qrCodeDim=100;
    const draggableElement = document.getElementById(id);
    const qrTitle=document.getElementById("draggableContainer").title;
    draggableElement.height=qrCodeDim;
    draggableElement.width=qrCodeDim;
    draggableElement.style.position="relative"
    draggableElement.setAttribute("id","draggedQRCode")
    draggableElement.setAttribute("title",qrTitle);
    const dropzone = document.getElementById("preview");
    const parentImgHeight=dropzone.children[0].height;
    setQRPosition(draggableElement)
    dropzone.appendChild(draggableElement);
    var previewImg = document.createElement("img");
    previewImg.setAttribute("src", draggableElement.src);
    previewImg.setAttribute("height", "300");
    previewImg.setAttribute("width", "300");
    previewImg.setAttribute("draggable", false);
    previewImg.setAttribute("id", "draggableQrCode");
    previewImg.setAttribute("ondragstart", "onDragStart(event);");
    previewImg.classList.add("mx-auto")
    previewImg.classList.add("d-block")
    document.getElementById("draggableContainer").appendChild(previewImg)
    event
    .dataTransfer
    .clearData();
    dropzone.style.marginBottom="-"+qrCodeDim+"px"
    
}

const setQRPosition=(draggableElement, isMergedImage,qrCodeDim=100,aspectRatio)=>{

  var e = document.getElementById("qrCodePosition");
  var value = e.value;
  let padding=10;
  if(isMergedImage){
    padding=padding/aspectRatio
  }
  let dropzone = document.getElementById("preview");
  if(isMergedImage){
    dropzone=document.getElementById("naturalPreviewImage");
  }
  const parentImgWidth=dropzone.children[0].width;
  const parentImgHeight=dropzone.children[0].height;
  let draggedQR= document.getElementById("draggedQRCode");
  if(draggableElement){
    draggedQR=draggableElement
  }
  if(isMergedImage){
    draggedQR=document.getElementById("draggedNaturalQRCode");
  }

  if(draggedQR){
    draggedQR.setAttribute("style","position:relative")
    switch (value) {
      case "topLeft":
        draggedQR.style.top=-(parentImgHeight)+padding +"px";
        draggedQR.style.right=(parentImgWidth/2)-(qrCodeDim/2)-padding+"px";
        return;
      case "bottomLeft":
        draggedQR.style.top=-(qrCodeDim+padding) +"px";
      draggedQR.style.right=(parentImgWidth/2)-(qrCodeDim/2)-padding+"px";
        return;
      case "bottomRight":
          draggedQR.style.top=-(qrCodeDim+padding) +"px";
          draggedQR.style.right=-((parentImgWidth/2)-(qrCodeDim/2))+padding+"px";
        return;
      case "topRight":
        draggedQR.style.top=-(parentImgHeight)+padding +"px";
        draggedQR.style.right=-((parentImgWidth/2)-(qrCodeDim/2))+padding+"px";
        return;
    }
  }
  
}

const handleQRCodePositionChange=(event)=>{
  setQRPosition();
}

const handleMergedImageDownload=(event,fileType)=>{

      const isQRDraggavble=document.getElementById("draggableQrCode").getAttribute("draggable")
      if(isQRDraggavble==="true"){
        const confirmation=confirm("QR code not added on Product image. Are you sure want to continue")

        if(confirmation){
          downloadMergedImage(fileType)
        }
      }
      else{
          downloadMergedImage(fileType)
      }


     
}

const downloadMergedImage=(fileType)=>{
  var mergedImage= document.getElementById("preview")
    // mergedImage.setAttribute("style",`height:${mergedImage.children[0].height}px`)
    mergedImage= document.getElementById("preview")

    let productImage=document.getElementById("productImage");
    let draggedQRCode=document.getElementById("draggedQRCode");

    // create original size image
    let productNaturalImage=document.getElementById("productNaturalImage");
    let naturalPreviewImage=document.getElementById("naturalPreviewImage");
    productNaturalImage.setAttribute("src",productImage.getAttribute("src"));
    productNaturalImage.setAttribute("height",productImage.naturalHeight)
    productNaturalImage.setAttribute("width",productImage.naturalWidth)
    naturalPreviewImage.setAttribute("style",`height:${productImage.naturalHeight}px; width:${productImage.naturalWidth}px`)
    const scaleX=productImage.offsetWidth/productImage.naturalWidth
    const scaleY=productImage.offsetHeight/productImage.naturalHeight

    if(draggedQRCode){
      let draggedNaturalQRCode=document.getElementById("draggedNaturalQRCode");

      if(draggedNaturalQRCode){
        draggedNaturalQRCode.remove();
      }
      draggedNaturalQRCode=document.createElement("img")
      draggedNaturalQRCode.setAttribute("class","mx-auto d-block")
      draggedNaturalQRCode.setAttribute("id","draggedNaturalQRCode")
      draggedNaturalQRCode.height=draggedQRCode.height/scaleY
      draggedNaturalQRCode.width=draggedQRCode.width/scaleX
      draggedNaturalQRCode.src=draggedQRCode.src
      naturalPreviewImage.appendChild(draggedNaturalQRCode);
        setQRPosition(undefined,true,draggedNaturalQRCode.height,scaleX);
    }
    
    mergedImage=document.getElementById("naturalPreviewImage");
    if(fileType==="svg"){
        domtoimage.toSvg(mergedImage).then((data)=>{
                var link=document.createElement("a");
                link.download=productFileName+".svg";
                link.href=data;
                link.click()
        })
    }
    else if(fileType==="png"){
        domtoimage.toPng(mergedImage).then((data)=>{
                var link=document.createElement("a");
                link.download=productFileName+".png";
                link.href=data;
                link.click()
        })
      }
}

const handleDownloadQR= async (event,fileType, containerId)=>{
  let qrCodeImage= document.getElementById(containerId)

  if(fileType==="png"){
    domtoimage.toPng(qrCodeImage).then((data)=>{
                var link=document.createElement("a");
                link.download="qrcode.png";
                link.href=data;
                link.click()
    })
  }
  else if(fileType==="svg"){
    domtoimage.toSvg(qrCodeImage).then((data)=>{
                var link=document.createElement("a");
                link.download="qrcode.svg";
                link.href=data;
                link.click()
    })
  }

}