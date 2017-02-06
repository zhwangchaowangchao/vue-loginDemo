let tid;

let refreshSize = () => {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 640) deviceWidth = 640;
    document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
};

window.addEventListener('resize', () => {
    clearTimeout(tid);
    tid = setTimeout(refreshSize, 200);
}, false);

window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshSize, 200);
    }
}, false);
refreshSize();

document.write('<style type="text/css">*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:rgba(255,255,255,0)}img{vertical-align:bottom}li{list-style:none}html{height:100%;font-size:90px;font-size:26.66667vw;font-family:STHeiti,Microsoft YaHei,SimHei,arial,verdana}title{display:block}a,i{text-decoration:none;font-style:normal}h1,h2,h3,h4,h5,h6{font-weight:400}ul{-webkit-margin-before:0!important;-webkit-margin-after:0!important;-webkit-padding-start:0!important}input{outline:0}.ios_cursor{cursor:pointer}.mian-top{padding-top:.1rem;padding-left:.1rem;text-decoration:none}.mian-top span.user-icon{display:block;width:.36rem;height:.36rem;border-radius:.45rem;background-color:#fff;box-shadow:0 0 10px 0 #e3e3e3}.mian-top span.user-icon img{width:100%;height:100%;border-radius:1rem}.bottom{position:absolute;bottom:.75rem;left:50%;display:none;margin-top:.675rem;margin-left:-1.875rem;width:3.75rem}.bottom .logos{display:block;margin:0 auto;width:1.07rem;height:.22rem}.bottom .btns{display:block;margin:.15rem auto 0;width:1.35rem;height:.26rem}.bottom img{margin:0 auto}.clear-fenge{position:relative;z-index:20;width:100%;height:.1rem;background-color:#fafafa}.msgbox{top:0;z-index:100;width:100%;height:100%;background:#000;opacity:.5}.msgbox,.tipbox{position:fixed;display:none}.tipbox{top:40%;left:24%;z-index:200;overflow:hidden;padding:3% 2%;width:50%;height:auto;border-radius:.05rem;background:#313131;color:#adadad;opacity:.8}.tipbox .icon{display:none;padding-bottom:15%;width:100%}.tipbox p{text-align:center;font-size:.12rem;line-height:.2rem}.tipbox .tit{padding:4% 0;color:#fff;font-size:.15rem}.prompt-bg{position:fixed;top:0;right:0;bottom:0;left:0;z-index:300;display:block;background-color:rgba(0,0,0,.5)}.sys-mask{z-index:100;display:none;background:rgba(0,0,0,.5)}.managers,.sys-mask{position:fixed;top:0;width:100%;height:100%}.managers{z-index:20;display:block;margin:0;background-color:rgba(0,0,0,.5)}.prompt-bg .msag{position:fixed;top:30%;left:50%;z-index:301;margin-left:-1.5rem;width:3rem;border-radius:.04rem;background-color:#fff}.prompt-bg .msag .titels{margin:10% auto;padding:0 5%;color:#545454;text-align:center;font-size:.16rem;line-height:1.5}.prompt-bg .msag .titels span{display:block}.prompt-bg .msag .titels span.tit{font-size:.17rem}.prompt-bg .msag .titels span.mes{margin:.2rem auto .1rem;font-size:.14rem}.prompt-bg .msag .titels span.tbtn{font-size:.16rem}.prompt-bg .msag .basetitels{margin:8.5% auto;padding:0 5%;color:#545454;text-align:center;font-size:.14rem}.prompt-bg .msag .btn{width:100%;height:.5rem}.prompt-bg .msag .btn span.cancel,.prompt-bg .msag .btn span.sure{float:left;display:block;box-sizing:border-box;margin-left:.25rem;width:1.15rem;height:.36rem;border:1px solid #f0f2f0;border-right:1px solid #eee;border-radius:6px;color:#4d4d4d;text-align:center;font-size:.17rem;line-height:.36rem}.prompt-bg .msag .btn span.cancel{float:right;margin-right:.25rem;margin-left:0;border-right:0 solid #eee;background-color:#00c02e;color:#fff}.prompt-bg .msag .btn span.mesgOut{display:block;margin:0 auto;width:100%;height:.49rem;border-top:1px solid #eee;color:#4285f5;text-align:center;font-size:.17rem;line-height:.49rem}</style>');