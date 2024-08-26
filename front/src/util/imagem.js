
function serializarImagem(e,percentualReducaoScale){
    return new Promise((resolve, reject) => {
        try {
            
            
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                reject("Sem Imagem")
            }
            var file = files[0]
    
            // Faço a leitura do arquivo
            var reader = new FileReader()
            
            reader.onloadend = () => {
    
                var imagem = new Image()
                imagem.src = reader.result
                // this.imgSrc = await reader.result
                imagem.onload = function() {  
                        
                        let canvas = document.createElement("canvas");
                        canvas.width  = this.width * percentualReducaoScale
                        canvas.height = this.height * percentualReducaoScale
    
                        let contextoDoCanvas = canvas.getContext("2d");
                                           
                        contextoDoCanvas.scale(percentualReducaoScale, percentualReducaoScale);
                        contextoDoCanvas.drawImage(this, 0, 0)
    
                        var imagemescalada = canvas.toDataURL(file.type, percentualReducaoScale);
                        // console.log("imagemescalada")
                        // console.log(imagemescalada)
                        
                        let tipoImagem = imagemescalada.split(",")[0]
                        tipoImagem = tipoImagem.split(";")[0]
                        tipoImagem = tipoImagem.split(":")[1]

                        let dados = imagemescalada.split(",")[1]
                        resolve({tipo:tipoImagem,dados:dados})
    
                } 
    
    
    
    
            }
    
    
            reader.readAsDataURL(file);
            
    
        } catch (error) {
            console.log(error)   
            reject(error)
        }

    })
    
}


export  {serializarImagem}