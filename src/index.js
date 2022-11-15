let textMessage=""
let productFileName=""
let firstDrop=false;
let pageX=0;
let pageY=0;
let qrCodeDim=100;


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
    document.getElementById("draggedQRCode").style.display="none";
    document.getElementById("addQrOnProduct").classList.remove("d-none");
    document.getElementById("createQrCode").classList.add("d-none");
    document.getElementById("draggableQrCode").setAttribute("src",qrCodeSrc)
    document.getElementById("draggableContainer").setAttribute("title",qrCodeDivTitle)

}

const handleCreateNewQRClick=(event)=>{
    const previewDiv=document.getElementById("preview");
    if(previewDiv.children.length>=2){
      previewDiv.children[0].remove()
    }
    document.getElementById("qrCodeDiv").innerHTML=''
    firstDrop=false;
    textMessage=""
    productFileName=""
    qrCodeDim=100;
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
    if(!firstDrop){
      document.getElementById("draggableQrCode").setAttribute("draggable",true);
    }
    document.getElementById("downloadMergeImagePng").removeAttribute("disabled")
    document.getElementById("downloadMergeImageSvg").removeAttribute("disabled")
    if(preview.children.length>=2){
      preview.children[0].remove()
      preview.height="auto"
      document.getElementById("draggedQRCode").removeAttribute("top")
      document.getElementById("draggedQRCode").removeAttribute("right")
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
}

const onDragOver=(event)=> {
  event.preventDefault();
}

const onDrop=(event)=> {
    document.getElementById("draggedQRCode").style.display="inline";
    const draggableElementImgSrc = document.getElementById("draggableQrCode").src;
    const draggableElement= document.getElementById("draggedQRCode")
    const qrTitle=document.getElementById("draggableContainer").title;
    let productImage=document.getElementById("productImage");
    const scaleX=productImage.offsetWidth/productImage.naturalWidth
    const scaleY=productImage.offsetHeight/productImage.naturalHeight
    if(firstDrop===true){
      const offsetHeight=draggableElement.offsetHeight
      const offsetWidth=draggableElement.offsetWidth
      qrCodeDim=(offsetHeight+offsetWidth)/2
      document.getElementById("draggableQrCode").setAttribute("draggable","false")
    }

    draggableElement.style.height=qrCodeDim+"px"
    draggableElement.style.width=qrCodeDim+"px"
    draggableElement.style.position="absolute"
    draggableElement.children[0].src=draggableElementImgSrc;
    draggableElement.setAttribute("title",qrTitle);
    const dropzone = document.getElementById("preview");
    pageX=event.pageX
    pageY=event.pageY
    setQRPosition(draggableElement)
    dropzone.appendChild(draggableElement);
    document.getElementById("draggableQrCode").setAttribute("draggable",false);

    firstDrop=true;
    event
    .dataTransfer
    .clearData();
    
}

const setQRPosition=(draggableElement, isMergedImage,aspectRatio)=>{
  let padding=0;
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
    if(pageX && pageY){
      draggedQR.style.top=pageY-(qrCodeDim/2)+"px";
      draggedQR.style.left=pageX-(qrCodeDim/2)+"px";
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
    mergedImage= document.getElementById("preview")

    let productImage=document.getElementById("productImage");
    let draggedQRCode=document.getElementById("draggedQRCode");
    var parentPos = productImage.getBoundingClientRect();
    var childPos = draggedQRCode.getBoundingClientRect();
    const relativePos = {};
    relativePos.top = childPos.top - parentPos.top;
    relativePos.right = childPos.right - parentPos.right;
    relativePos.bottom = childPos.bottom - parentPos.bottom;
    relativePos.left = childPos.left - parentPos.left;
    relativePos.x = childPos.x - parentPos.x;
    relativePos.y = childPos.y - parentPos.y;



    // create original size image
    let productNaturalImage=document.getElementById("productNaturalImage");
    let hiddenNaturalDiv=document.getElementById("hiddenNaturalDiv");
    let naturalPreviewImage=document.getElementById("naturalPreviewImage");
    productNaturalImage.setAttribute("src",productImage.getAttribute("src"));
    productNaturalImage.setAttribute("height",productImage.naturalHeight)
    productNaturalImage.setAttribute("width",productImage.naturalWidth)
    naturalPreviewImage.setAttribute("style",`height:${productImage.naturalHeight}px; width:${productImage.naturalWidth}px; position:absolute`)
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
      const qrCodeDimension=((draggedQRCode.offsetHeight/scaleY)+(draggedQRCode.offsetWidth/scaleX))/2;
      draggedNaturalQRCode.height=qrCodeDimension
      draggedNaturalQRCode.width=qrCodeDimension
      draggedNaturalQRCode.src=draggedQRCode.children[0].src
      draggedNaturalQRCode.setAttribute("style",`position:absolute; bottom: ${-1*(relativePos.bottom)/scaleY}px; left:${(relativePos.left)/scaleX}px`)
      naturalPreviewImage.appendChild(draggedNaturalQRCode);
      const parentImgWidth=productNaturalImage.width;
      const parentImgHeight=productNaturalImage.height;
      console.log("SCALES ", scaleX, scaleY);


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