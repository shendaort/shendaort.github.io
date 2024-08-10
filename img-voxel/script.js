var voxelcode = []
var istcode = ''

function getSelect() {
    var radios = document.getElementsByName('sdim');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
}

document.getElementById('imageInput').addEventListener('change', function(event) {
    voxelcode = []
    const file = event.target.files[0];
    if (!file.type.startsWith('image/')) {
        alert('仅支持图片文件！');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

           
            const newWidth = img.width / document.getElementById('pxcl').value
            const newHeight = img.height / document.getElementById('pxcl').value;
            canvas.width = newWidth;
            canvas.height = newHeight;


            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const pixelData = [];
            if(getSelect()=='x'){
                for (let y = 0; y < newHeight; y++) {
                    pixelData[y] = [];
                    for (let x = 0; x < newWidth; x++) {
                        const pixel = ctx.getImageData(x, y, 1, 1).data;
    
                        pixelData[y][x] = {
                            position:(newWidth-x)+','+(newHeight-y),
                            rgba: findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList),
                            num:voxellist[colorList.indexOf(findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList))]
                        
                        };
                    
                        voxelcode.push(`[${Math.floor(newWidth-x)-1},${Math.floor(newWidth-y)-1},0,${voxellist[colorList.indexOf(findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList))]}]`)
                    }
                }
                istcode = `var sx = { x: 0, y: 0, z: 0 }; const ts = [`+voxelcode+']; for (let i = 0; i < ts.length; i++) { voxels.setVoxel(sx.x + ts[i][0], sx.y + ts[i][1], sx.z + ts[i][2], ts[i][3]) }'

                document.getElementById('daima').textContent=istcode
            }else if(getSelect()=='z'){
                for (let y = 0; y < newHeight; y++) {
                    pixelData[y] = [];
                    for (let x = 0; x < newWidth; x++) {
                        const pixel = ctx.getImageData(x, y, 1, 1).data;
    
                        pixelData[y][x] = {
                            position:(newWidth-x)+','+(newHeight-y),
                            rgba: findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList),
                            num:voxellist[colorList.indexOf(findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList))]
                        
                        };
                    
                        voxelcode.push(`[0,${Math.floor(newWidth-y)-1},${Math.floor(newWidth-x)-1},${voxellist[colorList.indexOf(findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList))]}]`)
                    }
                }
                istcode = `var sx = { x: 0, y: 0, z: 0 }; const ts = [`+voxelcode+']; for (let i = 0; i < ts.length; i++) { voxels.setVoxel(sx.x + ts[i][0], sx.y + ts[i][1], sx.z + ts[i][2], ts[i][3]) }'

                document.getElementById('daima').textContent=istcode
            }else if(getSelect()=='y'){
                for (let y = 0; y < newHeight; y++) {
                    pixelData[y] = [];
                    for (let x = 0; x < newWidth; x++) {
                        const pixel = ctx.getImageData(x, y, 1, 1).data;
    
                        pixelData[y][x] = {
                            position:(newWidth-x)+','+(newHeight-y),
                            rgba: findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList),
                            num:voxellist[colorList.indexOf(findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList))]
                        
                        };
                    
                        voxelcode.push(`[${Math.floor(newWidth-y)-1},0,${Math.floor(newWidth-x)-1},${voxellist[colorList.indexOf(findClosestColor(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3], colorList))]}]`)
                    }
                }
                istcode = `var sx = { x: 0, y: 0, z: 0 }; const ts = [`+voxelcode+']; for (let i = 0; i < ts.length; i++) { voxels.setVoxel(sx.x + ts[i][0], sx.y + ts[i][1], sx.z + ts[i][2], ts[i][3]) }'

                document.getElementById('daima').textContent=istcode
            }else{
                alert(`选择一种排列方式`)
            }
        }
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

function findClosestColor(rgb, colorList) {
    let closestColor = null;
    let minDistance = Infinity;


    const [r, g, b, a] = rgb.match(/\d+/g).map(Number);
    const targetColor = [r, g, b];

    colorList.forEach(color => {

        const [cr, cg, cb, ca] = color.match(/\d+/g).map(Number);
        const currentColor = [cr, cg, cb];

        const distance = Math.sqrt(
            Math.pow(targetColor[0] - currentColor[0], 2) +
            Math.pow(targetColor[1] - currentColor[1], 2) +
            Math.pow(targetColor[2] - currentColor[2], 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color;
        }
    });

    return closestColor;
}

function copycode(){
    navigator.clipboard.writeText(istcode)
    alert('已复制')
}
var voxellist = [749,737,727,715,711,707,703,699,695,687,691,683,679,675,671,667,663,659,397,395,393,391,389,387,385,383,381,379,377,375,373,367,369,371,363,177,175,121,119,117,115,113,111,109,107,105,103,101,99,97,95,93,91,89]
const colorList = [
    'rgba(199,211,27,1)',
    'rgba(189,167,132,1)',
    'rgba(205,179,137,1)',
    'rgba(209,199,163,1)',
    'rgba(117,203,220,1)',
    'rgba(185,203,42,1)',
    'rgba(159,151,218,1)',
    'rgba(141,128,213,1)',
    'rgba(36,179,220,1)',
    'rgba(207,142,153,1)',
    'rgba(201,188,141,1)',
    'rgba(172,159,220,1)',
    'rgba(99,202,218,1)',
    'rgba(209,165,195,1)',
    'rgba(121,212,218,1)',
    'rgba(204,166,220,1)',
    'rgba(209,199,163,1)',
    'rgba(185,190,163,1)',
    'rgba(96,215,207,1)',
    'rgba(191,215,198,1)',
    'rgba(168,162,91,1)',
    'rgba(15,174,13,1)',
    'rgba(209,206,130,1)',
    'rgba(204,139,0,1)',
    'rgba(209,209,195,1)',
    'rgba(201,192,164,1)',
    'rgba(192,169,137,1)',
    'rgba(162,143,138,1)',
    'rgba(168,97,0,1)',
    'rgba(202,101,189,1)',
    'rgba(172,181,214,1)',
    'rgba(124,205,214,1)',
    'rgba(163,63,197,1)',
    'rgba(192,159,209,1)',
    'rgba(0,0,220,1)',
    'rgba(209,215,220,1)',
    'rgba(0,0,0,1)',
    'rgba(209,214,143,1)',
    'rgba(209,185,29,1)',
    'rgba(209,201,215,1)',
    'rgba(209,173,195,1)',
    'rgba(72,103,175,1)',
    'rgba(156,166,174,1)',
    'rgba(202,131,141,1)',
    'rgba(181,50,10,1)',
    'rgba(207,26,29,1)',
    'rgba(199,209,187,1)',
    'rgba(189,204,143,1)',
    'rgba(159,183,117,1)',
    'rgba(188,195,202,1)',
    'rgba(111,122,131,1)',
    'rgba(194,211,218,1)',
    'rgba(136,194,215,1)',
    'rgba(96,155,195,1)',


];

